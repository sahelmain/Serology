using Medical_Information.API.Models.DTO;
using Medical_Information.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medical_Information.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyteReportController : ControllerBase
    {
        private readonly IAnalyteReportRepository _analyteReportRepository;

        public AnalyteReportController(IAnalyteReportRepository analyteReportRepository)
        {
            _analyteReportRepository = analyteReportRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<AnalyteReportDTO>>> GetAllAnalyteReports()
        {
            var reports = await _analyteReportRepository.GetAnalyteReportsAsync();
            return Ok(reports);
        }

        [HttpGet("{analyteName}")]
        public async Task<ActionResult<List<AnalyteReportDTO>>> GetAnalyteReportsByAnalyteName(string analyteName)
        {
            var reports = await _analyteReportRepository.GetAnalyteReportsByAnalyteNameAsync(analyteName);
            if (reports == null || reports.Count == 0)
            {
                return NotFound();
            }
            return Ok(reports);
        }
    }
}

