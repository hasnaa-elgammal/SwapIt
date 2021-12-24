using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwapIt.Models;
using SwapIt.ModelViews;
using SwapIt.Repository.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(Roles ="User")]
    public class UserController : ControllerBase
    {
        private readonly IAdminRepository _repo;

        public UserController(IAdminRepository repo)
        {
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
        public async Task<IActionResult> AddProduct(Product product)
        {
            var pro = await _repo.AddProduct(product);
            if(pro != null)
            {
                return Ok();
            }

            return BadRequest();

        }
    }
}
