using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagemenetAPI.Migrations
{
    /// <inheritdoc />
    public partial class taskkkk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskAssignedTo",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "TaskAssignedTo",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
