using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SWD392_Project.Models
{
    public partial class User
    {
        public User()
        {
            Feedbacks = new HashSet<Feedback>();
            Posts = new HashSet<Post>();
            ReservationDetails = new HashSet<ReservationDetail>();
            Sliders = new HashSet<Slider>();
        }

        public int UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime Date { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Avatar { get; set; } = null!;
        public int Gender { get; set; }
        public int RoleId { get; set; }
        public int Status { get; set; }

        public virtual Role Role { get; set; } = null!;
        [JsonIgnore] public virtual ICollection<Feedback> Feedbacks { get; set; }
        [JsonIgnore] public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<ReservationDetail> ReservationDetails { get; set; }
        public virtual ICollection<Slider> Sliders { get; set; }
    }
}