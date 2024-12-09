using Medical_Information.API.Models.DTO;

namespace Medical_Information.API.Repositories.Interfaces
{
    public interface IAnalyteReportRepository
    {
        Task<List<AnalyteReportDTO>> GetAnalyteReportsAsync();
        Task<List<AnalyteReportDTO>> GetAnalyteReportsByAnalyteNameAsync(string analyteName);

    }
}
