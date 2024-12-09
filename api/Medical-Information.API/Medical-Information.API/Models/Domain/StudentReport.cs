﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Medical_Information.API.Models.Domain
{
    public class StudentReport
    {
        [Key]
        public Guid ReportID { get; set; }
        [ForeignKey("StudentID")]
        public Guid StudentID { get; set; }
        //public Student Student { get; set; }
        [ForeignKey("AdminQCLotID")]
        public Guid AdminQCLotID { get; set; }
        //public AdminQCLot AdminQCLot { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public String QCName { get; set; }
        public ICollection<AnalyteInput> AnalyteInputs { get; set; } = [];
    }
}