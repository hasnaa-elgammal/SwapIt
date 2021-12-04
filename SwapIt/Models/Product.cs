using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class Product
    {
        public Product()
        {
            Carts = new HashSet<Cart>();
            Favourites = new HashSet<Favourite>();
            OrderInformations = new HashSet<OrderInformation>();
            ProductImages = new HashSet<ProductImage>();
            ProductReviews = new HashSet<ProductReview>();
        }

        public int ProductId { get; set; }
        public string UserId { get; set; }
        public int DepartmentId { get; set; }
        public string ProductName { get; set; }
        public short ProductPrice { get; set; }
        public short ProductQuantity { get; set; }
        public string ProductSize { get; set; }
        public string ProductDescription { get; set; }
        public bool? Forswap { get; set; }
        public bool? Forsell { get; set; }

        public virtual CategoryDepartment Department { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<OrderInformation> OrderInformations { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
    }
}
