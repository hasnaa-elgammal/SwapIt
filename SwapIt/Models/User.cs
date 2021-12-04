using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class User: IdentityUser
    {
        public User()
        {
            Carts = new HashSet<Cart>();
            ChatFroms = new HashSet<Chat>();
            ChatTos = new HashSet<Chat>();
            Favourites = new HashSet<Favourite>();
            ProductReviews = new HashSet<ProductReview>();
            Products = new HashSet<Product>();
            UserFollowingFollowings = new HashSet<UserFollowing>();
            UserFollowingUsers = new HashSet<UserFollowing>();
            UserOrders = new HashSet<UserOrder>();
            UserRatingFroms = new HashSet<UserRating>();
            UserRatingTos = new HashSet<UserRating>();
            UserReviewFroms = new HashSet<UserReview>();
            UserReviewTos = new HashSet<UserReview>();
            UsersAndCards = new HashSet<UsersAndCard>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserImage { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Zipcode { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Chat> ChatFroms { get; set; }
        public virtual ICollection<Chat> ChatTos { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<UserFollowing> UserFollowingFollowings { get; set; }
        public virtual ICollection<UserFollowing> UserFollowingUsers { get; set; }
        public virtual ICollection<UserOrder> UserOrders { get; set; }
        public virtual ICollection<UserRating> UserRatingFroms { get; set; }
        public virtual ICollection<UserRating> UserRatingTos { get; set; }
        public virtual ICollection<UserReview> UserReviewFroms { get; set; }
        public virtual ICollection<UserReview> UserReviewTos { get; set; }
        public virtual ICollection<UsersAndCard> UsersAndCards { get; set; }
    }
}
