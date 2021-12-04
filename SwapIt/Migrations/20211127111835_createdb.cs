using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SwapIt.Migrations
{
    public partial class createdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    first_name = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: false),
                    last_name = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: false),
                    user_image = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    county = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    city = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    street = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    category_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category_name = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    category_image = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.category_id);
                });

            migrationBuilder.CreateTable(
                name: "Creditcard",
                columns: table => new
                {
                    credit_card_number = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    credit_card_name = table.Column<string>(type: "varchar(60)", unicode: false, maxLength: 60, nullable: false),
                    credit_card_expireddate = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    credit_card_password = table.Column<string>(type: "char(3)", unicode: false, fixedLength: true, maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Creditca__252A27B11EDAB5BE", x => x.credit_card_number);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Chat",
                columns: table => new
                {
                    message_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    from_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    to_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    message_text = table.Column<string>(type: "text", nullable: false),
                    message_date = table.Column<DateTime>(type: "date", nullable: false),
                    message_time = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Chat__0BBF6EE60384159D", x => x.message_id);
                    table.ForeignKey(
                        name: "FK__Chat__from_id__693CA210",
                        column: x => x.from_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Chat__to_id__6A30C649",
                        column: x => x.to_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserFollowing",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    following_id = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserFoll__3731838785EAFA86", x => new { x.user_id, x.following_id });
                    table.ForeignKey(
                        name: "FK__UserFollo__follo__75A278F5",
                        column: x => x.following_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__UserFollo__user___74AE54BC",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserOrder",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    order_date = table.Column<DateTime>(type: "date", nullable: false),
                    order_time = table.Column<TimeSpan>(type: "time", nullable: false),
                    order_type = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    order_status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserOrde__465962292573C486", x => x.order_id);
                    table.ForeignKey(
                        name: "FK__UserOrder__user___787EE5A0",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRating",
                columns: table => new
                {
                    rating_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    from_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    to_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    rating = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserRati__D35B278B961C59B2", x => x.rating_id);
                    table.ForeignKey(
                        name: "FK__UserRatin__from___656C112C",
                        column: x => x.from_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__UserRatin__to_id__66603565",
                        column: x => x.to_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserReview",
                columns: table => new
                {
                    review_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    from_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    to_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    review_text = table.Column<string>(type: "text", nullable: false),
                    review_date = table.Column<DateTime>(type: "date", nullable: false),
                    review_time = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserRevi__60883D90B322FA52", x => x.review_id);
                    table.ForeignKey(
                        name: "FK__UserRevie__from___619B8048",
                        column: x => x.from_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__UserRevie__to_id__628FA481",
                        column: x => x.to_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CategoryDepartment",
                columns: table => new
                {
                    department_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category_id = table.Column<int>(type: "int", nullable: false),
                    department_name = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__C22324221289DFF8", x => x.department_id);
                    table.ForeignKey(
                        name: "FK__CategoryD__categ__5441852A",
                        column: x => x.category_id,
                        principalTable: "Category",
                        principalColumn: "category_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UsersAndCards",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    credit_card_number = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UsersAnd__BBEC957436E08C0A", x => new { x.user_id, x.credit_card_number });
                    table.ForeignKey(
                        name: "FK__UsersAndC__credi__4F7CD00D",
                        column: x => x.credit_card_number,
                        principalTable: "Creditcard",
                        principalColumn: "credit_card_number",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__UsersAndC__user___4E88ABD4",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    department_id = table.Column<int>(type: "int", nullable: false),
                    product_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    product_price = table.Column<short>(type: "smallint", nullable: false),
                    product_quantity = table.Column<short>(type: "smallint", nullable: false),
                    product_size = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    product_description = table.Column<string>(type: "text", nullable: true),
                    forswap = table.Column<bool>(type: "bit", nullable: true),
                    forsell = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.product_id);
                    table.ForeignKey(
                        name: "FK__Product__departm__5812160E",
                        column: x => x.department_id,
                        principalTable: "CategoryDepartment",
                        principalColumn: "department_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Product__user_id__571DF1D5",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Cart__FDCE10D04066243B", x => new { x.user_id, x.product_id });
                    table.ForeignKey(
                        name: "FK__Cart__product_id__6E01572D",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Cart__user_id__6D0D32F4",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Favourite",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Favourit__FDCE10D0A0C99F24", x => new { x.user_id, x.product_id });
                    table.ForeignKey(
                        name: "FK__Favourite__produ__71D1E811",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Favourite__user___70DDC3D8",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderInformation",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderInf__022945F6A4F3950A", x => new { x.order_id, x.product_id });
                    table.ForeignKey(
                        name: "FK__OrderInfo__order__7B5B524B",
                        column: x => x.order_id,
                        principalTable: "UserOrder",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__OrderInfo__produ__7C4F7684",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductImage",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false),
                    product_image = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ProductI__2B90AE2090A7DA7C", x => new { x.product_id, x.product_image });
                    table.ForeignKey(
                        name: "FK__ProductIm__produ__5AEE82B9",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductReview",
                columns: table => new
                {
                    review_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    from_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    review_text = table.Column<string>(type: "text", nullable: false),
                    review_date = table.Column<DateTime>(type: "date", nullable: false),
                    review_time = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ProductR__60883D90CDCD92DD", x => x.review_id);
                    table.ForeignKey(
                        name: "FK__ProductRe__from___5DCAEF64",
                        column: x => x.from_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__ProductRe__produ__5EBF139D",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_product_id",
                table: "Cart",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryDepartment_category_id",
                table: "CategoryDepartment",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_from_id",
                table: "Chat",
                column: "from_id");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_to_id",
                table: "Chat",
                column: "to_id");

            migrationBuilder.CreateIndex(
                name: "IX_Favourite_product_id",
                table: "Favourite",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderInformation_product_id",
                table: "OrderInformation",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_department_id",
                table: "Product",
                column: "department_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_user_id",
                table: "Product",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReview_from_id",
                table: "ProductReview",
                column: "from_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReview_product_id",
                table: "ProductReview",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserFollowing_following_id",
                table: "UserFollowing",
                column: "following_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserOrder_user_id",
                table: "UserOrder",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_from_id",
                table: "UserRating",
                column: "from_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_to_id",
                table: "UserRating",
                column: "to_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_from_id",
                table: "UserReview",
                column: "from_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_to_id",
                table: "UserReview",
                column: "to_id");

            migrationBuilder.CreateIndex(
                name: "IX_UsersAndCards_credit_card_number",
                table: "UsersAndCards",
                column: "credit_card_number");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Chat");

            migrationBuilder.DropTable(
                name: "Favourite");

            migrationBuilder.DropTable(
                name: "OrderInformation");

            migrationBuilder.DropTable(
                name: "ProductImage");

            migrationBuilder.DropTable(
                name: "ProductReview");

            migrationBuilder.DropTable(
                name: "UserFollowing");

            migrationBuilder.DropTable(
                name: "UserRating");

            migrationBuilder.DropTable(
                name: "UserReview");

            migrationBuilder.DropTable(
                name: "UsersAndCards");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "UserOrder");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Creditcard");

            migrationBuilder.DropTable(
                name: "CategoryDepartment");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
