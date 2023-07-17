using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SWD392_Project.Models
{
    public partial class ReservationDetail
    {
        public int PrescriptionId { get; set; }
        public int ReservationId { get; set; }
        public int ServiceId { get; set; }
        public int UserId { get; set; }
        public int StaffId { get; set; }
        public string NameSale { get; set; } = null!;
        public string ChildrenName { get; set; } = null!;
        public int Age { get; set; }

        [JsonIgnore] public virtual Reservation Reservation { get; set; } = null!;
        public virtual Service Service { get; set; } = null!;
        [JsonIgnore] public virtual User User { get; set; } = null!;
    }
}