using Microsoft.EntityFrameworkCore.Migrations;

namespace SwapIt.Migrations
{
    public partial class updateuserinfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Zipcode",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Zipcode",
                table: "AspNetUsers");
        }
    }
}
