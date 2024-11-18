using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Meetings_API.Migrations
{
    /// <inheritdoc />
    public partial class updatemeeting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MeetingLink",
                table: "Meetings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Meetings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TimeZone",
                table: "Meetings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeetingLink",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "TimeZone",
                table: "Meetings");
        }
    }
}
