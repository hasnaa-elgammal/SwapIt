using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.ModelViews
{
    public class UserModel
    {
        [StringLength(256), Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [StringLength(25), Required]
        public string FirstName { get; set; }

        [StringLength(25), Required]
        public string LastName { get; set; }

        [StringLength(25), Required]
        public string Country { get; set; }

        [StringLength(25)]
        public string City { get; set; }

        [StringLength(10)]
        public string Zipcode { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
