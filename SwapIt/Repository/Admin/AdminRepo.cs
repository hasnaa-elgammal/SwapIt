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

        public AdminRepo(ApplicationDB db,UserManager<User> userManager)
            {
                _db = db;
                _userManager = userManager;
            }

        public async Task<User> AddUser(AddUsersModel model)
        {
            if (model == null)
            {
                return null;
            }

            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                County = model.Country,
                City = model.City,
                Zipcode = model.Zipcode,
                //PasswordHash = model.Password,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return user;
            }
            return null;
        }

        public async Task<IEnumerable<User>> GetUsers()
            {
                return await _db.Users.ToListAsync();
            }

        //Task<IEnumerable<User>> IAdminRepository.GetUsers()
        //{
        //    throw new NotImplementedException();
        //}
    }
}
