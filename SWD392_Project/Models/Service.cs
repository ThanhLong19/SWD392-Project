using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SWD392_Project.Models
{
    public partial class Service
    {
        public Service()
        {
            ReservationDetails = new HashSet<ReservationDetail>();
        }

        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;
        public string Detail { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string Image { get; set; } = null!;
        public double Price { get; set; }
        public int Discount { get; set; }
        public double Rate { get; set; }
        public int Status { get; set; }

        [JsonIgnore] public virtual ICollection<ReservationDetail> ReservationDetails { get; set; }
    }
}