using Microsoft.EntityFrameworkCore.Migrations;

namespace SwapIt.Migrations
{
    public partial class EditProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerFirstName",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerLastName",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductImage",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SInCart",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SInFav",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SIsOwner",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "OwnerFirstName",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "OwnerLastName",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ProductImage",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SInCart",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SInFav",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SIsOwner",
                table: "Product");
        }
    }
}
