
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
        Task<IEnumerable<User>> GetUsers();
        Task<User> AddUser(AddUsersModel model);
    }
}
