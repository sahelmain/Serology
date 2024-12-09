using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medical_Information.API.Migrations
{
    /// <inheritdoc />
    public partial class MakeCommentNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "AnalyteInputs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "AdminQCLots",
                keyColumn: "AdminQCLotID",
                keyValue: new Guid("bbb59aca-6c27-424c-852f-21656a88f449"),
                columns: new[] { "FileDate", "OpenDate" },
                values: new object[] { new DateTime(2024, 12, 7, 22, 5, 41, 310, DateTimeKind.Local).AddTicks(1198), new DateTime(2024, 12, 7, 22, 5, 41, 310, DateTimeKind.Local).AddTicks(1219) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "AnalyteInputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AdminQCLots",
                keyColumn: "AdminQCLotID",
                keyValue: new Guid("bbb59aca-6c27-424c-852f-21656a88f449"),
                columns: new[] { "FileDate", "OpenDate" },
                values: new object[] { new DateTime(2024, 12, 7, 2, 21, 31, 761, DateTimeKind.Local).AddTicks(5685), new DateTime(2024, 12, 7, 2, 21, 31, 761, DateTimeKind.Local).AddTicks(5705) });
        }
    }
}
