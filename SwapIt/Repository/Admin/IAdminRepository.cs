
using SwapIt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SwapIt.ModelViews.users;

namespace SwapIt.Repository.Admin
{
    public interface IAdminRepository
    {
        Task<IEnumerable<SwapIt.Models.User>> GetUsers();
        Task<SwapIt.Models.User> AddUserAsync(AddUsersModel model);
        Task<SwapIt.Models.User> GetUserAsync(string id);
        Task<SwapIt.Models.User> EditUserAsync(EditUserModel model);
        Task<bool> DeleteUserAsync(List<string> ids);
        Task <IEnumerable<UserRoleModel>> GetUserRoleAsync();
        Task<IEnumerable<Role>> GetRolesAsync();
        Task<bool> EditUserRoleAsync(EditUserRoleModel model);
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task<Category> AddCategoryAsync(Category model);
        Task<Category> EditCategoryAsync(Category model);
        Task<bool> DeleteCategoriesAsync(List<string> ids);

        Task<IEnumerable<Product>> GetProducts();
        Task<Product> AddProduct(Product product);
    }
}
