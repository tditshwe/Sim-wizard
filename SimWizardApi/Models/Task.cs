using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimWizardApi.Models
{
    public class Task
    {
        public int Id { set; get; }
        public string Status { get; set; }
        public string Owner { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime TargetDate { get; set; }
    }
}