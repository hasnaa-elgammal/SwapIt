using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using SwapIt.Models;
using SwapIt.ModelViews;
using SwapIt.Services;

namespace SwapIt.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDB _db;
        private readonly UserManager<User> _manager;
        private readonly SignInManager<User> _signinmanager;
        private readonly RoleManager<Role> _rolemanager;
        [Obsolete]
        private readonly IHostingEnvironment _host;

        [Obsolete]
        public AccountsController(
            ApplicationDB db,
            UserManager<User> usermanager,
            SignInManager<User> signinmanager,
            RoleManager<Role> rolemanager,
            IHostingEnvironment host)
        {
            _db = db;
            _manager = usermanager;
            _signinmanager = signinmanager;
            _rolemanager = rolemanager;
            _host = host;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(UserModel model)
        {
            if (model == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if (!EmailIsValid(model.Email))
                {
                    return BadRequest("Email is not valid");
                }

                if (EmailExists(model.Email))
                {
                    return BadRequest("Email is already registered");
                }

                var user = new User()
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    County = model.Country,
                    City = model.City,
                    Zipcode = model.Zipcode,
                };

                var result = await _manager.CreateAsync(user,model.Password);

                if (result.Succeeded)
                {
                    await _signinmanager.SignInAsync(user, isPersistent: false);
                    return StatusCode(StatusCodes.Status200OK);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }
        
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            await CreateRoles();
            await CreateAdmin();

            if (model == null)
            {
                return NotFound();
            }

            var user = await _manager.FindByEmailAsync(model.Email) ;
            if (user == null)
            {
                return NotFound();
            }

            var result = await _signinmanager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);
            if (result.Succeeded)
            {
                if (await _rolemanager.RoleExistsAsync("User"))
                {
                    if (!await _manager.IsInRoleAsync(user, "User") && !await _manager.IsInRoleAsync(user, "Admin"))
                    {
                        await _manager.AddToRoleAsync(user, "User");
                    }

                }

                var role = await GetRoleByUserId(user.Id);
                if (role != null)
                {
                    AddCookies(user.UserName, user.Email, role, user.Id, model.RememberMe);
                }
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [HttpGet]
        [Route("GetRoleName/{email}")]
        public async Task<string> GetRoleName(string email)
        {
            var user = await _manager.FindByEmailAsync(email);
            if(user != null)
            {
 
                var role = await _db.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (role != null)
                {
                    
                    return await _db.Roles.Where(x => x.Id == role.RoleId).Select(x => x.Name).FirstOrDefaultAsync();
                }
            }
            return null;
        }

        [HttpGet]
        [Route("CheckUserClaim/{email}&{role}")]
        public IActionResult CheckUserClaim(string email, string role)
        {
            var useremail = User.FindFirst(ClaimTypes.Email)?.Value;
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userrole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (useremail != null && userid != null && userrole !=null)
            {
                if (email == useremail && role == userrole)
                {
                    return StatusCode(StatusCodes.Status200OK);
                }
            }
            return StatusCode(StatusCodes.Status203NonAuthoritative);
        }

        private bool EmailExists(string email)
        {
            return _db.Users.Any(x => x.Email == email);
        }

        [HttpGet]
        [Route("IsEmailExists")]
        public async Task<IActionResult> IsEmailExists(string email)
        {
            var exists= await _db.Users.AnyAsync(x => x.Email == email);
            if (exists)
            {
                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        [HttpGet]
        [Route("Profile/{email}")]
        [Obsolete]
        public async Task<ActionResult<User>> Profile(string email)
        {
            var user = await _manager.FindByEmailAsync(email);
            if(user != null)
            {
                //real path
                //var newuser = new User
                //{
                //    Id = user.Id,
                //    Email = user.Email,
                //    FirstName = user.FirstName,
                //    LastName = user.LastName,
                //    County = user.County,
                //    City = user.City,
                //    Zipcode = user.Zipcode,
                //};
                //if(user.UserImage!= null)
                //{
                //    newuser.UserImage = $"{_host.WebRootPath}/images/users/{user.UserImage}";
                //}
                return user;
            }
            return null;
        }

        [HttpPost]
        [Route("EditProfile")]
        [Obsolete]
        public async Task<IActionResult> EditProfile()
        {
            var userimage = HttpContext.Request.Form.Files["image"];
            var useremail = HttpContext.Request.Form["email"].FirstOrDefault();
            var userfirstName = HttpContext.Request.Form["firstName"].FirstOrDefault();
            var userlastName = HttpContext.Request.Form["lastName"].FirstOrDefault();
            var usercountry = HttpContext.Request.Form["country"].FirstOrDefault();
            var usercity = HttpContext.Request.Form["city"].FirstOrDefault();
            var userzipcode = HttpContext.Request.Form["zipCode"].FirstOrDefault();
            var userphoneNumber = HttpContext.Request.Form["phoneNumber"].FirstOrDefault();
            
            if(useremail != null)
            {
                var user = await _manager.FindByEmailAsync(useremail);


                if (user != null)
                {
                    if(userimage != null && userimage.Length > 0)
                    {
                        //real path
                        //var filepath = Path.Combine(_host.WebRootPath + "/images/users", userimage.FileName);
                        var newfilename = useremail + DateTime.Now.ToString("yyyyMMddhhmmss") + userimage.FileName;
                        var filepath = Path.Combine(@"C:\Users\EL-MAGD\Desktop\SwapIt_last\SwapIt\ClientSwapIt\src\assets\images\users", newfilename);
                        using (FileStream f = new FileStream(filepath, FileMode.Create))
                        {
                            await userimage.CopyToAsync(f);
                        }


                        user.UserImage = newfilename;
                    }

                    
                    user.FirstName = userfirstName;
                    user.LastName = userlastName;
                    user.County = usercountry;
                    user.City = usercity;
                    user.Zipcode = userzipcode;
                    user.PhoneNumber = userphoneNumber;

                    var result = await _manager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return Ok();
                    }
                }
                else
                {
                    return BadRequest("no");
                }
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("DeleteProfile/{email}")]
        public async Task<IActionResult> DeleteProfile(string email)
        {
            var user = await _manager.FindByEmailAsync(email);

            if (user != null)
            {
                var products = _db.Products.Where(x => x.UserId == user.Id).ToList();
                foreach(var p in products)
                {
                    _db.Products.Remove(p);
                }
                var result = await _manager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var user = await _manager.FindByEmailAsync(model.Email);
                    

                    if (user != null)
                    {
                        var check = await _manager.CheckPasswordAsync(user, model.OldPassword);
                        if (check)
                        {
                            var token = await _manager.GeneratePasswordResetTokenAsync(user);
                            if (token != null)
                            {
                                var reset = await _manager.ResetPasswordAsync(user, token, model.NewPassword);
                                if (reset.Succeeded)
                                {
                                    return Ok();
                                }
                            }
                        }
                    }
                }

            }
            return BadRequest();

        }

        [HttpGet]
        [Route("ForgotPassword/{email}")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            if (email != null)
            {

                var user = await _manager.FindByEmailAsync(email);


                if (user != null)
                {
                    var token = await _manager.GeneratePasswordResetTokenAsync(user);
                    if (token != null)
                    {
                        var encodeToken = Encoding.UTF8.GetBytes(token);
                        var newToken = WebEncoders.Base64UrlEncode(encodeToken);

                        var confirmlink = $"http://localhost:4200/resetforgotpassword?ID={user.Id}&Token={newToken}";
                        var txt = "You can reset your password from here";
                        var link = "<a href=\"" + confirmlink +"\">Forgot Password</a>";
                        var title = "Reset Password";

                        if (await SendGridApi.Execute(user.Email, user.UserName, txt, link, title))
                        {
                            return new ObjectResult(new { token = newToken });
                        }
                    }
                }

            }
            return NotFound();

        }

        [HttpPost]
        [Route("ResetForgotPassword")]
        public async Task<IActionResult> ResetForgotPassword(ForgotModel model)
        {
            if (ModelState.IsValid)
            {
                if (model != null)
                {
                    var user = await _manager.FindByIdAsync(model.Id);


                    if (user != null)
                    {
                        var token = WebEncoders.Base64UrlDecode(model.Token);
                        var encodetoken = Encoding.UTF8.GetString(token);
                        if (token != null)
                        {
                            var reset = await _manager.ResetPasswordAsync(user, encodetoken, model.NewPassword);
                            if (reset.Succeeded)
                            {
                                return Ok();
                            }
                        }
                    }
                }

            }
            return BadRequest();

        }

        private bool EmailIsValid(string email)
        {
            Regex reg = new Regex(@"\w+\@\w+\.\w|\w +\@\w +\.\w");
            if (reg.IsMatch(email))
            {
                return true;
            }
            return false;
        }

        private async Task CreateRoles()
        {
            if (_rolemanager.Roles.Count() < 1)
            {
                var r = new Role
                {
                    Name = "Admin"
                };

                await _rolemanager.CreateAsync(r);

                r = new Role
                {
                    Name = "User"
                };
                await _rolemanager.CreateAsync(r);
            }

        }

        public async Task CreateAdmin()
        {
            var admin = await _manager.FindByNameAsync("Admin");

            if (admin == null) {
                var user = new User()
                {
                    UserName = "Admin",
                    Email = "hasnaaahamed2@gmail.com",
                    FirstName = "admin",
                    LastName = "Admin",
                    PhoneNumber="010209059884",
                    EmailConfirmed = true
                };

                var result = await _manager.CreateAsync(user, "Admin123");

                if (result.Succeeded)
                {
                    if (await _rolemanager.RoleExistsAsync("Admin"))
                    {
                        await _manager.AddToRoleAsync(user, "Admin");
                    }
                }

            }
        }

        private async Task<string> GetRoleByUserId(string userid)
        {
            var role = await _db.UserRoles.FirstOrDefaultAsync(x => x.UserId == userid);
            if (role != null)
            {
                return await _db.Roles.Where(x => x.Id == role.RoleId).Select(x => x.Name).FirstOrDefaultAsync();
            }
            return null;
        }

        private async void AddCookies(string username, string email, string rolename, string userId, bool remember)
        {
            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Role, rolename)
            };
            var claimidentity = new ClaimsIdentity(claim, CookieAuthenticationDefaults.AuthenticationScheme);
            if (remember)
            {
                var authproperties = new AuthenticationProperties
                {
                    AllowRefresh = true,
                    IsPersistent = remember,
                    ExpiresUtc = DateTime.UtcNow.AddDays(14)
                };
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimidentity),
                    authproperties
                );
            }
            else
            {
                var authproperties = new AuthenticationProperties
                {
                    AllowRefresh = true,
                    IsPersistent = remember,
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
                };
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimidentity),
                    authproperties
                );
            }
        }
    }
}
