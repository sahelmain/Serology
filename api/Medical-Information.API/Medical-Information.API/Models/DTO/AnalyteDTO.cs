using Medical_Information.API.Models.Domain;

namespace Medical_Information.API.Models.DTO
{
    public class AnalyteDTO
    {
        public Guid AnalyteID { get; set; }
        public string AnalyteName { get; set; }
        public string AnalyteAcronym { get; set; }
        public string UnitOfMeasure { get; set; }
        public float MinLevel { get; set; }
        public float MaxLevel { get; set; }
        public float Mean { get; set; }
        public float StdDevi { get; set; }
        public string Type { get; set; } // type of analyte
        public string ExpectedRange { get; set; } //for qualitative analytes
        public string? TiterMin { get; set; }
        public string? TiterMax { get; set;  }
        public Guid AdminQCLotID { get; set; }
    }

    public class AddAnalyteWithListDTO
    {
        public string AnalyteName { get; set; }
        public string AnalyteAcronym { get; set; }
        public string UnitOfMeasure { get; set; }
        public float MinLevel { get; set; }
        public float MaxLevel { get; set; }
        public float Mean { get; set; }
        public float StdDevi { get; set; }
        public string Type { get; set; } // type of analyte
        public string ExpectedRange { get; set; }
        public string TiterMin { get; set; }
        public string? TiterMax { get; set; }
    }

    public class AddAnalyteAloneDTO
    {
        public string AnalyteName { get; set; }
        public string AnalyteAcronym { get; set; }
        public string UnitOfMeasure { get; set; }
        public float MinLevel { get; set; }
        public float MaxLevel { get; set; }
        public float Mean { get; set; }
        public float StdDevi { get; set; }
        public string Type { get; set; } // type of analyte
        public string ExpectedRange { get; set; }
        public  string TiterMin { get; set; }
        public string TiterMax { get; set; }
        public Guid AdminQCLotID { get; set; }
    }
}
