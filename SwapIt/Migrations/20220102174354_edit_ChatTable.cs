using Microsoft.EntityFrameworkCore.Migrations;

namespace SwapIt.Migrations
{
    public partial class edit_ChatTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Chat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Chat",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "name",
                table: "Chat");
        }
    }
}
