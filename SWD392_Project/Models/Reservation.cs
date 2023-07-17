using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SWD392_Project.Models
{
    public partial class Reservation
    {
        public Reservation()
        {
            Feedbacks = new HashSet<Feedback>();
            ReservationDetails = new HashSet<ReservationDetail>();
        }

        public int ReservationId { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public DateTime BeginTime { get; set; }
        public double TotalCost { get; set; }

        [JsonIgnore] public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<ReservationDetail> ReservationDetails { get; set; }
    }
}