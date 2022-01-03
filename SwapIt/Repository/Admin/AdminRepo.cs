using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwapIt.Models;
using SwapIt.ModelViews;
using SwapIt.ModelViews.users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.Repository.Admin
{
    public class AdminRepo:IAdminRepository
    {
        
        private readonly ApplicationDB _db;
        private readonly UserManager<SwapIt.Models.User> _userManager;
        private readonly RoleManager<Role> _rolemanager;

        public AdminRepo(ApplicationDB db,UserManager<SwapIt.Models.User> userManager,RoleManager<Role> rolemanager)
            {
                _db = db;
                _userManager = userManager;
                _rolemanager = rolemanager;
            }

        public async Task<Category> AddCategoryAsync(Category model)
        {
            var category = new Category
            {
                CategoryName = model.CategoryName,
                CategoryImage = model.CategoryImage
            };
            _db.Categories.Add(category);
            await _db.SaveChangesAsync();
            return category;
        }

        public async Task<SwapIt.Models.User> AddUserAsync(AddUsersModel model)
        {
            if (model == null)
            {
                return null;
            }

            var user = new SwapIt.Models.User
            {
                UserName=model.Email,
                FirstName=model.FirstName,
                LastName=model.LastName,
                Email = model.Email,
                County = model.Country,
                City = model.City,
                Zipcode = model.Zipcode,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (await _rolemanager.RoleExistsAsync("User"))
                {
                    if (!await _userManager.IsInRoleAsync(user, "User") && !await _userManager.IsInRoleAsync(user, "Admin"))
                    {
                        await _userManager.AddToRoleAsync(user, "User");
                    }

                }
                return user;
            }
            return null;
        }

        public async Task<bool> DeleteCategoriesAsync(List<string> ids)
        {
            if (ids.Count < 1)
            {
                return false;
            }
            var i = 0;
            foreach(var id in ids)
            {
                try
                {
                    var catId = int.Parse(id);
                    var category = await _db.Categories.FirstOrDefaultAsync(x => x.CategoryId == catId);
                    if (category != null)
                    {
                        _db.Categories.Remove(category);
                        i++;

                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            if (i > 0)
            {
                await _db.SaveChangesAsync();
            }
            return true;
        }

        public async Task<bool> DeleteUserAsync(List<string> ids)
        {
            if (ids.Count < 1)
            {
                return false;
            }
            var i = 0;
            foreach(string id in ids)
            {
                var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
                if (user == null)
                {
                    return false;
                }
                _db.Users.Remove(user);
                i++;
            }
            if (i > 0)
            {
                await _db.SaveChangesAsync();
            }
            return true;
        }

        public async Task<Category> EditCategoryAsync(Category model)
        {
            if (model == null || model.CategoryId < 1)
            {
                return null;
            }
            var category = await _db.Categories.FirstOrDefaultAsync(x => x.CategoryId == model.CategoryId);
            if (category == null)
            {
                return null;
            }
            _db.Categories.Attach(category);
            category.CategoryName = model.CategoryName;
            _db.Entry(category).Property(x => x.CategoryName).IsModified = true;
            await _db.SaveChangesAsync();
            return category;
        }

        public async Task<SwapIt.Models.User> EditUserAsync(EditUserModel model)
        {
            if (model.Id == null)
            {
                return null;
            }
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (user== null)
            {
                return null;
            }
            if (model.Password != user.PasswordHash)
            {
               var result= await _userManager.RemovePasswordAsync(user);
                if (result.Succeeded)
                {
                    await _userManager.AddPasswordAsync(user, model.Password);
                }
            }
            _db.Users.Attach(user);
            user.Email = model.Email;
            user.LastName = model.LastName;
            user.FirstName = model.FirstName;
            user.County = model.Country;
            user.City = model.City;
            user.Zipcode = model.Zipcode;

           
            _db.Entry(user).Property(x => x.Email).IsModified = true;
            _db.Entry(user).Property(x => x.FirstName).IsModified = true;
            _db.Entry(user).Property(x => x.LastName).IsModified = true;
            _db.Entry(user).Property(x => x.County).IsModified = true;
            _db.Entry(user).Property(x => x.City).IsModified = true;
            _db.Entry(user).Property(x => x.Zipcode).IsModified = true;
            await _db.SaveChangesAsync();
            return user;
        }

        public async Task<bool> EditUserRoleAsync(EditUserRoleModel model)
        {
            if (model.UserId == null||model.RoleId==null)
            {
                return false;
            }

            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == model.UserId);
            if (user==null)
            {
                return false;
            }

            var currentRoleId = await _db.UserRoles.Where(x => x.UserId == model.UserId).Select(x => x.RoleId).FirstOrDefaultAsync();
            var currentRoleName = await _db.Roles.Where(x => x.Id == currentRoleId).Select(x => x.Name).FirstOrDefaultAsync();
            var newRoleName = await _db.Roles.Where(x => x.Id == model.RoleId).Select(x => x.Name).FirstOrDefaultAsync();

            if (await _userManager.IsInRoleAsync(user, currentRoleName))
            {
               var x= await _userManager.RemoveFromRoleAsync(user, currentRoleName);
                if (x.Succeeded)
                {
                    var s = await _userManager.AddToRoleAsync(user, newRoleName);
                    if (s.Succeeded)
                    {
                        return true;
                    }

                }
            }
            return false;
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _db.Categories.ToListAsync();
        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _db.Roles.ToListAsync();
        }

        public async Task<IEnumerable<CategoryDepartment>> GetSubCategoriesAsync()
        {
            return await _db.CategoryDepartments.ToListAsync();//.Include(x => x.DepartmentId)
        }

        public async Task<CategoryDepartment> AddSubCategoryAsync(CategoryDepartment model)
        {
            var categoryDepartment = new CategoryDepartment
            {
                DepartmentName = model.DepartmentName,
                CategoryId = model.CategoryId
            };
            _db.CategoryDepartments.Add(categoryDepartment);
            await _db.SaveChangesAsync();
            return categoryDepartment;

        }
        public async Task<CategoryDepartment> EditSubCategoryAsync(CategoryDepartment model)
        {
            if (model == null || model.DepartmentId < 1)
            {
                return null;
            }
            var subCategory = await _db.CategoryDepartments.FirstOrDefaultAsync(x => x.DepartmentId == model.DepartmentId);
            if (subCategory == null)
            {
                return null;
            }
            _db.CategoryDepartments.Attach(subCategory);
            subCategory.DepartmentName = model.DepartmentName;
            subCategory.CategoryId = model.CategoryId;

            _db.Entry(subCategory).Property(x => x.DepartmentName).IsModified = true;
            _db.Entry(subCategory).Property(x => x.CategoryId).IsModified = true;

            await _db.SaveChangesAsync();
            return subCategory;

        }
        public async Task<SwapIt.Models.User> GetUserAsync(string id)
        {
            if (id == null)
            {
                return null;
            }
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<IEnumerable<UserRoleModel>> GetUserRoleAsync()
        {
            var query = await (
                from userRole in _db.UserRoles
                join users in _db.Users
                on userRole.UserId equals users.Id
                join roles in _db.Roles
                on userRole.RoleId equals roles.Id
                select new
                {
                    userRole.UserId,
                    users.UserName,
                    userRole.RoleId,
                    roles.Name
                }).ToListAsync();
            List<UserRoleModel> userRoleModels = new List<UserRoleModel>();
            if (query.Count > 0)
            {
               
                for(int i = 0; i < query.Count; i++)
                {
                    var model = new UserRoleModel
                    {
                        UserId = query[i].UserId,
                        UserName = query[i].UserName,
                        RoleId = query[i].RoleId,
                        RoleName = query[i].Name
                    };
                    userRoleModels.Add(model);
                }
            }
            return userRoleModels;
                
        }

        public async Task<IEnumerable<SwapIt.Models.User>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            //string parameterUserId;
            //return await _db.Products.Where(x => x.UserId == parameterUserId).Select(x => x.ProductName).FirstOrDefault();
            return await _db.Products.ToListAsync();
            // Where(x => x.Id == role.RoleId).Select(x => x.Name).FirstOrDefaultAsync();

        }

        public async Task<bool> DeleteSubCategoryAsync(List<string> ids)
        {
            if (ids.Count < 1)
            {
                return false;
            }
            var i = 0;
            foreach (var id in ids)
            {
                try
                {
                    var catId = int.Parse(id);
                    var subCategory = await _db.CategoryDepartments.FirstOrDefaultAsync(x => x.DepartmentId == catId);
                    if (subCategory != null)
                    {
                        _db.CategoryDepartments.Remove(subCategory);
                        i++;

                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            if (i > 0)
            {
                await _db.SaveChangesAsync();
            }
            return true;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _db.Products.OrderByDescending(x => x.ProductId).ToListAsync();//.Include(x => x.DepartmentId)

        }

        public async Task<bool> AddProductAsync(string departmentId, string productName, string productDescription, string productPrice, string productQuantity)
        {
            var product = new Product
            {
                DepartmentId = int.Parse(departmentId),
                ProductName = productName,
                ProductDescription = productDescription,
                ProductPrice = short.Parse(productPrice),
                ProductQuantity = short.Parse(productQuantity),
                ProductImage = "default_product.jpg",
            };
            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return true;
        }



        public async Task<bool> EditProductAsync(Product product)
        {
            var mov = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == product.ProductId);
            if (mov == null)
            {
                return false;
            }

            try
            {
                _db.Attach(mov);
                mov.ProductName = product.ProductName;
                mov.ProductDescription=product.ProductDescription;
                mov.ProductPrice=product.ProductPrice;
                mov.ProductQuantity = product.ProductQuantity;
                mov.DepartmentId = product.DepartmentId;

                _db.Entry(mov).Property(x => x.ProductName).IsModified = true;
                _db.Entry(mov).Property(x => x.ProductDescription).IsModified = true;
                _db.Entry(mov).Property(x => x.ProductPrice).IsModified = true;
                _db.Entry(mov).Property(x => x.ProductQuantity).IsModified = true;
                _db.Entry(mov).Property(x => x.DepartmentId).IsModified = true;

                

                await _db.SaveChangesAsync();

            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<Product> GetProductAsync(long id)
        {
            return await _db.Products.Include(x => x.DepartmentId).FirstOrDefaultAsync(x => x.ProductId == id);
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(string search)
        {
            return await _db.Products.OrderByDescending(x => x.ProductId)//.Include(x => x.DepartmentId)
                .Where(x => x.ProductName.ToLower().Contains(search.ToLower())).ToListAsync();
        }


        public async Task<bool> DeleteProductsAsync(List<string> ids)
        {
            if (ids.Count < 1)
            {
                return false;
            }

            int i = 0;
            foreach (var id in ids)
            {
                try
                {
                    var productId = int.Parse(id);
                    var product = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == productId);
                    if (product != null)
                    {
                        _db.Products.Remove(product);
                        i++;
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            if (i > 0)
            {
                await _db.SaveChangesAsync();
            }
            return true;
        }


        // Added

        public async Task<IEnumerable<Product>> GetHomeProducts()
        {
            var products = await _db.Products.Where(x => x.SIsOwner == "true" || x.SIsOwner == "True").ToListAsync();
            return products;

        }

        public async Task<IEnumerable<Product>> GetProfileProductsByEmailAsync(string email)
        {
            if (email == null)
            {
                return null;
            }

            var products = await _db.Products.Where(x => x.Email == email && (x.SIsOwner == "true" || x.SIsOwner == "True" )).ToListAsync();

            if (products == null)
            {
                return null;
            }
            return products;
        }

        public async Task<IEnumerable<Product>> GetFavProductsByEmailAsync(string email)
        {
            if (email == null)
            {
                return null;
            }
            var products = await _db.Products.Where(x => x.E == email && (x.SInFav == "True"  || x.SInFav == "true")).ToListAsync();
            if (products == null)
            {
                return null;
            }
            return products;
        }
        public async Task<IEnumerable<Product>> GetCartProductsByEmailAsync(string email)
        {
            if (email == null)
            {
                return null;
            }
            var products = await _db.Products.Where(x => x.E == email && (x.SInCart == "true" || x.SInCart == "True")).ToListAsync();
            if (products == null)
            {
                return null;
            }
            return products;
        }
        public async Task<IEnumerable<Category>> GetCategoriesHomeAsync()
        {
            return await _db.Categories.ToListAsync();
        }

        public async Task<bool> AddToCartAsync(Product product)
        {
            Product p = new Product();
            p.ProductName = product.ProductName;
            p.ProductDescription = product.ProductDescription;
            p.UserId = product.UserId;
            p.DepartmentId = product.DepartmentId;
            p.ProductPrice = product.ProductPrice;
            p.ProductQuantity = product.ProductQuantity;
            p.Email = product.Email;
            p.E = product.E;
            p.Forsell = product.Forsell;
            p.Forswap = product.Forswap;
            p.ProductSize = product.ProductSize;
            p.OwnerFirstName = product.OwnerFirstName;
            p.OwnerLastName = product.OwnerLastName;
            p.ProductImage = product.ProductImage;
            p.SIsOwner = "false";
            p.SInCart = "true";
            

            var result = await _db.Products.AddAsync(p);
            
            _db.SaveChanges();

            return true;

        }

        public async Task<bool> AddToFavAsync(Product product)
        {
            Product p = new Product();
            p.ProductName = product.ProductName;
            p.ProductDescription = product.ProductDescription;
            p.UserId = product.UserId;
            p.DepartmentId = product.DepartmentId;
            p.ProductPrice = product.ProductPrice;
            p.ProductQuantity = product.ProductQuantity;
            p.Email = product.Email;
            p.E = product.E;
            p.Forsell = product.Forsell;
            p.Forswap = product.Forswap;
            p.ProductSize = product.ProductSize;
            p.OwnerFirstName = product.OwnerFirstName;
            p.OwnerLastName = product.OwnerLastName;
            p.ProductImage = product.ProductImage;
            p.SIsOwner = "false";
            p.SInFav = "true";


            var result = await _db.Products.AddAsync(p);

            _db.SaveChanges();

            return true;

        }

        public async Task<Product> RemoveFromCartAsync(int id)
        {
            var toRemove = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            
            if (toRemove != null)
            {
                int idToRemove = toRemove.ProductId;
                _db.Products.Remove(toRemove);
                _db.SaveChanges();

            }
            return toRemove;
        }

        public async Task<Product> RemoveFromFavAsync(int id)
        {
            var toRemove = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == id);

            if (toRemove != null)
            {
                _db.Products.Remove(toRemove);
                _db.SaveChanges();

            }
            return toRemove;
        }
        public async Task<Product> RemoveProductFromAllFilesAsync(string productName)
        {
            var productsToRemove = await _db.Products.Where(x => x.ProductName == productName).ToListAsync();
            if (productsToRemove != null)
            {
                for (int i = 0; i < productsToRemove.Count; ++i)
                {
                    var p = await _db.Products.FirstOrDefaultAsync(x => x.ProductName == productName);
                    _db.Products.Remove(p);
                    _db.SaveChanges();
                }
            }

            return null;
        }

        public async Task<IEnumerable<Chat>> GetAllContactsAsync()
        {
            return await _db.Chats.OrderByDescending(x => x.MessageId).ToListAsync();//.Include(x => x.DepartmentId)
        }

        public async Task<IEnumerable<CategoryDepartment>> GetDepartmentsByIdAsync(int id)
        {

            var products = await _db.CategoryDepartments.Where(x => x.CategoryId == id).ToListAsync();

            if (products == null)
            {
                return null;
            }
            return products;
        }
        public async Task<IEnumerable<Product>> GetHomeProductsByDepartmentIdAsync(int id)
        {
            var products = await _db.Products.Where(x => x.DepartmentId == id && (x.SIsOwner == "ture" || x.SIsOwner == "True")).ToListAsync();

            if (products == null)
            {
                return null;
            }
            return products;
        }

        public async Task<IEnumerable<Product>> GetProfileProductsByEmailAsync(int idEncrypted)
        {
            int num = idEncrypted;

            int depId = num % 1000000;
            int catId = num / 1000000;

            var products = await _db.Products.Where(x => x.CategoryId == catId && (x.SIsOwner == "ture" || x.SIsOwner == "True") && x.DepartmentId == depId).ToListAsync();

            if (products == null)
            {
                return null;
            }
            return products;
        }
    }
}
