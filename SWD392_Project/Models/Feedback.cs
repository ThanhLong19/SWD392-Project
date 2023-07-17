using System;
using System.Collections.Generic;

namespace SWD392_Project.Models
{
    public partial class Feedback
    {
        public int FeedbackId { get; set; }
        public int UserId { get; set; }
        public string Detail { get; set; } = null!;
        public int FeedbackStatus { get; set; }
        public int Star { get; set; }
        public DateTime DateFeedback { get; set; }
        public int ReservationId { get; set; }

        public virtual Reservation Reservation { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
