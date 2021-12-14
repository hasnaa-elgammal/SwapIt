using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SwapIt.Models;
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
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _rolemanager;

        public AdminRepo(ApplicationDB db,UserManager<User> userManager,RoleManager<Role> rolemanager)
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

        public async Task<User> AddUserAsync(AddUsersModel model)
        {
            if (model == null)
            {
                return null;
            }

            var user = new User
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

        public async Task<User> EditUserAsync(EditUserModel model)
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

        public async Task<User> GetUserAsync(string id)
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

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }


    }
}
