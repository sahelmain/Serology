using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medical_Information.API.Migrations
{
    /// <inheritdoc />
    public partial class AddQCNameToStudentReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QCName",
                table: "StudentReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AdminQCLots",
                keyColumn: "AdminQCLotID",
                keyValue: new Guid("bbb59aca-6c27-424c-852f-21656a88f449"),
                columns: new[] { "FileDate", "OpenDate" },
                values: new object[] { new DateTime(2024, 12, 5, 20, 10, 42, 147, DateTimeKind.Local).AddTicks(9221), new DateTime(2024, 12, 5, 20, 10, 42, 147, DateTimeKind.Local).AddTicks(9290) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QCName",
                table: "StudentReports");

            migrationBuilder.UpdateData(
                table: "AdminQCLots",
                keyColumn: "AdminQCLotID",
                keyValue: new Guid("bbb59aca-6c27-424c-852f-21656a88f449"),
                columns: new[] { "FileDate", "OpenDate" },
                values: new object[] { new DateTime(2024, 12, 1, 20, 25, 32, 905, DateTimeKind.Local).AddTicks(6737), new DateTime(2024, 12, 1, 20, 25, 32, 905, DateTimeKind.Local).AddTicks(6769) });
        }
    }
}
