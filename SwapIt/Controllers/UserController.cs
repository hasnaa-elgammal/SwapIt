using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwapIt.Models;
using SwapIt.ModelViews;
using SwapIt.Repository.Admin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(Roles ="User")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDB _db;
        private readonly UserManager<User> _usermanager;
        private readonly IAdminRepository _repo;

        public UserController(IAdminRepository repo, UserManager<User> usermanager, ApplicationDB db)
        {
            _db = db;
            _usermanager = usermanager;
            _repo = repo;
        }

        [Route("GetAllProducts")]
        [HttpGet]
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var products = await _repo.GetProducts();
            if (products == null)
            {
                return null;
            }
            return products;

        }

        [Route("AddProduct")]
        [HttpPost]
        public async Task<IActionResult> AddProduct()
        {
            var image = HttpContext.Request.Form.Files["image"];
            var productName = HttpContext.Request.Form["productName"].FirstOrDefault();
            var productPrice = short.Parse(HttpContext.Request.Form["productPrice"].FirstOrDefault());
            var departmentId = int.Parse(HttpContext.Request.Form["departmentId"].FirstOrDefault());
            var userEmail = HttpContext.Request.Form["email"].FirstOrDefault();
            var productQuantity = short.Parse(HttpContext.Request.Form["productQuantity"].FirstOrDefault());
            var productDescription = HttpContext.Request.Form["productDescription"].FirstOrDefault();
            var forsell = bool.Parse(HttpContext.Request.Form["forsell"].FirstOrDefault());
            var forswap = bool.Parse(HttpContext.Request.Form["forswap"].FirstOrDefault());
          //  var categoryId = int.Parse(HttpContext.Request.Form["categoryId"].FirstOrDefault());

            if (userEmail != null)
            {
                Product p = new Product();
                var user = await _usermanager.FindByEmailAsync(userEmail);


                if (user != null)
                {
                    if (image != null && image.Length > 0)
                    {
                        var newfilename = DateTime.Now.ToString("yyMMddhhmmss") + image.FileName;
                        var filepath = Path.Combine(@"C:\Users\EL-MAGD\Desktop\SwapIt_last\SwapIt\ClientSwapIt\src\assets\images\products", newfilename);
                        using (FileStream f = new FileStream(filepath, FileMode.Create))
                        {
                            await image.CopyToAsync(f);
                        }


                        p.ProductSize = newfilename;
                    }


                    p.ProductName = productName;
                    p.ProductPrice = productPrice;
                    p.UserId = user.Id;
                    p.ProductQuantity = productQuantity;
                    p.ProductDescription = productDescription;
                    p.DepartmentId = departmentId;
                    p.Forsell = forsell;
                    p.Forswap = forswap;
                    p.SInCart = "false";
                    p.SInFav = "false";
                    p.OwnerFirstName = user.FirstName;
                    p.OwnerLastName = user.LastName;
                    p.Email = user.Email;
                    p.SIsOwner = "true";
                    p.ProductImage = p.ProductSize;
                    p.CategoryId =await _db.CategoryDepartments.Where(x=>x.DepartmentId==departmentId).Select(x=>x.CategoryId).FirstOrDefaultAsync();


                    var result = await _db.Products.AddAsync(p);
                    _db.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest();
        }

        [Route("GetAllDepartments")]
        [HttpGet]
        public async Task<IEnumerable<CategoryDepartment>> GetAllDepartments()
        {
            return await _db.CategoryDepartments.ToListAsync();
        }

        // Added



        [Route("AddContact")]
        [HttpPost]
        public async Task<IActionResult> AddContact()
        {

            var name = HttpContext.Request.Form["contactName"].FirstOrDefault();
            var email = HttpContext.Request.Form["contactEmail"].FirstOrDefault();
            var productDescription = HttpContext.Request.Form["contactMsg"].FirstOrDefault();

            if (email != null)
            {
                Chat c = new Chat();

                c.name = name;
                c.email = email;
                c.MessageText = productDescription;
                var result = await _db.Chats.AddAsync(c);
                _db.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }



    }
}
