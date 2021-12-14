using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwapIt.Models;
using SwapIt.ModelViews;

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

        public AccountsController(
            ApplicationDB db,
            UserManager<User> usermanager,
            SignInManager<User> signinmanager,
            RoleManager<Role> rolemanager)
        {
            _db = db;
            _manager = usermanager;
            _signinmanager = signinmanager;
            _rolemanager = rolemanager;
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

            return StatusCode(StatusCodes.Status204NoContent);
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
        public async Task<ActionResult<User>> Profile(string email)
        {
            var user = _manager.FindByEmailAsync(email);
            if(user != null)
            {
                return await user;
            }
            return null;
        }

        [HttpPost]
        [Route("EditProfile")]
        public async Task<IActionResult> EditProfile(EditModel model)
        {
            var user =await  _manager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.County = model.Country;
                user.City = model.City;
                user.Zipcode = model.Zipcode;
                user.PhoneNumber = model.PhoneNumber;

                var result = await _manager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
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
