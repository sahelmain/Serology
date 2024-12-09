using Medical_Information.API.Data;
using Medical_Information.API.Enums;
using Medical_Information.API.Models.Domain;
using Medical_Information.API.Models.DTO;
using Medical_Information.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medical_Information.API.Repositories.SQLImplementation
{
    public class SQLAnalyteReportRepository : IAnalyteReportRepository
    {
        private readonly MedicalInformationDbContext dbContext;
        private readonly MedicalInformationAuthDbContext authContext;

        public SQLAnalyteReportRepository(MedicalInformationDbContext dbContext, MedicalInformationAuthDbContext authContext)
        {
            this.dbContext = dbContext;
            this.authContext = authContext;
        }

        public async Task<List<AnalyteReportDTO>> GetAnalyteReportsAsync()
        {
            var query = from a in dbContext.AdminQCLots
                        join an in dbContext.Analytes on a.AdminQCLotID equals an.AdminQCLotID
                        join s in dbContext.StudentReports on a.QCName equals s.QCName
                        join ai in dbContext.AnalyteInputs on s.ReportID equals ai.ReportID
                        join st in dbContext.Students on s.StudentID equals st.StudentID
                        select new AnalyteReportDTO
                        {
                            LotNumber = a.LotNumber,
                            RunDateTime = ai.CreatedDate,
                            ClosedDate = a.ClosedDate,
                            AnalyteName = an.AnalyteName,
                            MinLevel = an.MinLevel,
                            MaxLevel = an.MaxLevel,
                            Mean = an.Mean,
                            StdDevi = an.StdDevi,
                            AnalyteValue = ai.AnalyteValue,
                            Comment = ai.Comment,
                            ExpectedRange = an.ExpectedRange,
                            TiterMin = an.TiterMin,
                            TiterMax = an.TiterMax,
                            Initials = st.Initials
                        };

            return await query.ToListAsync();
        }

        public async Task<List<AnalyteReportDTO>> GetAnalyteReportsByAnalyteNameAsync(string analyteName)
        {
            var query = from a in dbContext.AdminQCLots
                        join an in dbContext.Analytes on a.AdminQCLotID equals an.AdminQCLotID
                        join s in dbContext.StudentReports on a.QCName equals s.QCName
                        join ai in dbContext.AnalyteInputs on s.ReportID equals ai.ReportID
                        join st in dbContext.Students on s.StudentID equals st.StudentID
                        where an.AnalyteName.ToLower() == analyteName.ToLower()
                        select new AnalyteReportDTO
                        {
                            LotNumber = a.LotNumber,
                            RunDateTime = ai.CreatedDate,
                            ClosedDate = a.ClosedDate,
                            AnalyteName = an.AnalyteName,
                            MinLevel = an.MinLevel,
                            MaxLevel = an.MaxLevel,
                            Mean = an.Mean,
                            StdDevi = an.StdDevi,
                            AnalyteValue = ai.AnalyteValue,
                            Comment = ai.Comment,
                            ExpectedRange = an.ExpectedRange,
                            TiterMin = an.TiterMin,
                            TiterMax = an.TiterMax,
                            Initials = st.Initials
                        };

            return await query.ToListAsync();
        }
    }
}

