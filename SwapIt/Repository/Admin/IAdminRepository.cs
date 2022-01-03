
using SwapIt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SwapIt.ModelViews.users;
using SwapIt.ModelViews;

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
        Task<IEnumerable<CategoryDepartment>> GetSubCategoriesAsync();
        Task<CategoryDepartment> AddSubCategoryAsync(CategoryDepartment categoryDepartment);
        Task<CategoryDepartment> EditSubCategoryAsync(CategoryDepartment categoryDepartment);
        Task<bool> DeleteSubCategoryAsync(List<String> ids);
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<IEnumerable<Chat>> GetAllContactsAsync();
        Task<bool> AddProductAsync(String departmentId, String productName, String productDescription, String productPrice, String productQuantity);

        Task<bool> DeleteProductsAsync(List<string> ids);
        Task<bool> EditProductAsync(Product product);
        Task<Product> GetProductAsync(long id);
        Task<IEnumerable<Product>> SearchProductsAsync(string search);

        // Added

        public Task<IEnumerable<Product>> GetHomeProducts();
        Task<IEnumerable<Product>> GetProfileProductsByEmailAsync(string email);
        Task<IEnumerable<Product>> GetFavProductsByEmailAsync(string email);
        Task<IEnumerable<Product>> GetCartProductsByEmailAsync(string email);
        Task<IEnumerable<Category>> GetCategoriesHomeAsync();
        Task<bool> AddToCartAsync(Product product);
        Task<bool> AddToFavAsync(Product product);
        Task<Product> RemoveFromCartAsync(int id);
        Task<Product> RemoveFromFavAsync(int id);
        Task<Product> RemoveProductFromAllFilesAsync(string productName);

        Task<IEnumerable<CategoryDepartment>> GetDepartmentsByIdAsync(int id);
        Task<IEnumerable<Product>> GetHomeProductsByDepartmentIdAsync(int id);
        Task<IEnumerable<Product>> GetProfileProductsByEmailAsync(int idEncrypted);








    }
}
