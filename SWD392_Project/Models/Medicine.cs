using System;
using System.Collections.Generic;

namespace SWD392_Project.Models
{
    public partial class Medicine
    {
        public Medicine()
        {
            Prescriptions = new HashSet<Prescription>();
        }

        public int MedicineId { get; set; }
        public string MedicineName { get; set; } = null!;
        public double Price { get; set; }
        public string Country { get; set; } = null!;
        public DateTime ExpiryDate { get; set; }
        public string Detail { get; set; } = null!;
        public string Image { get; set; } = null!;

        public virtual ICollection<Prescription> Prescriptions { get; set; }
    }
}
