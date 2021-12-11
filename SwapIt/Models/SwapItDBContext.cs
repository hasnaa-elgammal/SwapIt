using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SwapIt.Models
{
    public partial class ApplicationDB : IdentityDbContext<User, Role, string>
    {
        public ApplicationDB()
        {
        }

        public ApplicationDB(DbContextOptions<ApplicationDB> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoryDepartment> CategoryDepartments { get; set; }
        public virtual DbSet<Chat> Chats { get; set; }
        public virtual DbSet<Creditcard> Creditcards { get; set; }
        public virtual DbSet<Favourite> Favourites { get; set; }
        public virtual DbSet<OrderInformation> OrderInformations { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<ProductReview> ProductReviews { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserFollowing> UserFollowings { get; set; }
        public virtual DbSet<UserOrder> UserOrders { get; set; }
        public virtual DbSet<UserRating> UserRatings { get; set; }
        public virtual DbSet<UserReview> UserReviews { get; set; }
        public virtual DbSet<UsersAndCard> UsersAndCards { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=HASNAA\\SQLEXPRESS2017;Initial Catalog=SwapItDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "Arabic_CI_AS");

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ProductId })
                    .HasName("PK__Cart__FDCE10D04066243B");

                entity.ToTable("Cart");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cart__product_id__6E01572D");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cart__user_id__6D0D32F4");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CategoryImage)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("category_image");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("category_name");
            });

            modelBuilder.Entity<CategoryDepartment>(entity =>
            {
                entity.HasKey(e => e.DepartmentId)
                    .HasName("PK__Category__C22324221289DFF8");

                entity.ToTable("CategoryDepartment");

                entity.Property(e => e.DepartmentId).HasColumnName("department_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.DepartmentName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("department_name");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.CategoryDepartments)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CategoryD__categ__5441852A");
            });

            modelBuilder.Entity<Chat>(entity =>
            {
                entity.HasKey(e => e.MessageId)
                    .HasName("PK__Chat__0BBF6EE60384159D");

                entity.ToTable("Chat");

                entity.Property(e => e.MessageId).HasColumnName("message_id");

                entity.Property(e => e.FromId).HasColumnName("from_id");

                entity.Property(e => e.MessageDate)
                    .HasColumnType("date")
                    .HasColumnName("message_date");

                entity.Property(e => e.MessageText)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("message_text");

                entity.Property(e => e.MessageTime).HasColumnName("message_time");

                entity.Property(e => e.ToId).HasColumnName("to_id");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.ChatFroms)
                    .HasForeignKey(d => d.FromId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Chat__from_id__693CA210");

                entity.HasOne(d => d.To)
                    .WithMany(p => p.ChatTos)
                    .HasForeignKey(d => d.ToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Chat__to_id__6A30C649");
            });

            modelBuilder.Entity<Creditcard>(entity =>
            {
                entity.HasKey(e => e.CreditCardNumber)
                    .HasName("PK__Creditca__252A27B11EDAB5BE");

                entity.ToTable("Creditcard");

                entity.Property(e => e.CreditCardNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("credit_card_number");

                entity.Property(e => e.CreditCardExpireddate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("credit_card_expireddate");

                entity.Property(e => e.CreditCardName)
                    .IsRequired()
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("credit_card_name");

                entity.Property(e => e.CreditCardPassword)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("credit_card_password")
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Favourite>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ProductId })
                    .HasName("PK__Favourit__FDCE10D0A0C99F24");

                entity.ToTable("Favourite");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Favourite__produ__71D1E811");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Favourite__user___70DDC3D8");
            });

            modelBuilder.Entity<OrderInformation>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.ProductId })
                    .HasName("PK__OrderInf__022945F6A4F3950A");

                entity.ToTable("OrderInformation");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderInformations)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderInfo__order__7B5B524B");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderInformations)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderInfo__produ__7C4F7684");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.DepartmentId).HasColumnName("department_id");

                entity.Property(e => e.Forsell).HasColumnName("forsell");

                entity.Property(e => e.Forswap).HasColumnName("forswap");

                entity.Property(e => e.ProductDescription)
                    .HasColumnType("text")
                    .HasColumnName("product_description");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_name");

                entity.Property(e => e.ProductPrice).HasColumnName("product_price");

                entity.Property(e => e.ProductQuantity).HasColumnName("product_quantity");

                entity.Property(e => e.ProductSize)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("product_size");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Product__departm__5812160E");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Product__user_id__571DF1D5");
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.ProductImage1 })
                    .HasName("PK__ProductI__2B90AE2090A7DA7C");

                entity.ToTable("ProductImage");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ProductImage1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("product_image");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductImages)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductIm__produ__5AEE82B9");
            });

            modelBuilder.Entity<ProductReview>(entity =>
            {
                entity.HasKey(e => e.ReviewId)
                    .HasName("PK__ProductR__60883D90CDCD92DD");

                entity.ToTable("ProductReview");

                entity.Property(e => e.ReviewId).HasColumnName("review_id");

                entity.Property(e => e.FromId).HasColumnName("from_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ReviewDate)
                    .HasColumnType("date")
                    .HasColumnName("review_date");

                entity.Property(e => e.ReviewText)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("review_text");

                entity.Property(e => e.ReviewTime).HasColumnName("review_time");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.ProductReviews)
                    .HasForeignKey(d => d.FromId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductRe__from___5DCAEF64");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductReviews)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductRe__produ__5EBF139D");
            });

            modelBuilder.Entity<User>(entity =>
            {

                entity.Property(e => e.City)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("city");

                entity.Property(e => e.County)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("county");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("last_name");


                entity.Property(e => e.Street)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("street");

                entity.Property(e => e.UserImage)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("user_image");

            });

            modelBuilder.Entity<UserFollowing>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.FollowingId })
                    .HasName("PK__UserFoll__3731838785EAFA86");

                entity.ToTable("UserFollowing");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.FollowingId).HasColumnName("following_id");

                entity.HasOne(d => d.Following)
                    .WithMany(p => p.UserFollowingFollowings)
                    .HasForeignKey(d => d.FollowingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserFollo__follo__75A278F5");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserFollowingUsers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserFollo__user___74AE54BC");
            });

            modelBuilder.Entity<UserOrder>(entity =>
            {
                entity.HasKey(e => e.OrderId)
                    .HasName("PK__UserOrde__465962292573C486");

                entity.ToTable("UserOrder");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("date")
                    .HasColumnName("order_date");

                entity.Property(e => e.OrderStatus)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("order_status");

                entity.Property(e => e.OrderTime).HasColumnName("order_time");

                entity.Property(e => e.OrderType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("order_type");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserOrders)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserOrder__user___787EE5A0");
            });

            modelBuilder.Entity<UserRating>(entity =>
            {
                entity.HasKey(e => e.RatingId)
                    .HasName("PK__UserRati__D35B278B961C59B2");

                entity.ToTable("UserRating");

                entity.Property(e => e.RatingId).HasColumnName("rating_id");

                entity.Property(e => e.FromId).HasColumnName("from_id");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.ToId).HasColumnName("to_id");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.UserRatingFroms)
                    .HasForeignKey(d => d.FromId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserRatin__from___656C112C");

                entity.HasOne(d => d.To)
                    .WithMany(p => p.UserRatingTos)
                    .HasForeignKey(d => d.ToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserRatin__to_id__66603565");
            });

            modelBuilder.Entity<UserReview>(entity =>
            {
                entity.HasKey(e => e.ReviewId)
                    .HasName("PK__UserRevi__60883D90B322FA52");

                entity.ToTable("UserReview");

                entity.Property(e => e.ReviewId).HasColumnName("review_id");

                entity.Property(e => e.FromId).HasColumnName("from_id");

                entity.Property(e => e.ReviewDate)
                    .HasColumnType("date")
                    .HasColumnName("review_date");

                entity.Property(e => e.ReviewText)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("review_text");

                entity.Property(e => e.ReviewTime).HasColumnName("review_time");

                entity.Property(e => e.ToId).HasColumnName("to_id");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.UserReviewFroms)
                    .HasForeignKey(d => d.FromId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserRevie__from___619B8048");

                entity.HasOne(d => d.To)
                    .WithMany(p => p.UserReviewTos)
                    .HasForeignKey(d => d.ToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserRevie__to_id__628FA481");
            });

            modelBuilder.Entity<UsersAndCard>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CreditCardNumber })
                    .HasName("PK__UsersAnd__BBEC957436E08C0A");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.CreditCardNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("credit_card_number");

                entity.HasOne(d => d.CreditCardNumberNavigation)
                    .WithMany(p => p.UsersAndCards)
                    .HasForeignKey(d => d.CreditCardNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UsersAndC__credi__4F7CD00D");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersAndCards)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UsersAndC__user___4E88ABD4");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
