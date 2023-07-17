using System;
using System.Collections.Generic;

namespace SWD392_Project.Models
{
    public partial class Prescription
    {
        public int PrescriptionId { get; set; }
        public int UserId { get; set; }
        public int MedicineId { get; set; }
        public int Amount { get; set; }
        public string Note { get; set; } = null!;

        public virtual Medicine Medicine { get; set; } = null!;
    }
}
