namespace Medical_Information.API.Models.DTO
{
    public class AnalyteReportDTO
    {
        public string LotNumber { get; set; }
        public DateTime RunDateTime { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string AnalyteName { get; set; }
        public float MinLevel { get; set; }
        public float MaxLevel { get; set; }
        public float Mean { get; set; }
        public float StdDevi { get; set; }
        public string? ExpectedRange { get; set; }
        public string? TiterMin { get; set; }
        public string? TiterMax { get; set; }
        public string AnalyteValue { get; set; }
        public string Comment { get; set; }
        public string Initials { get; set; }
    }
}
