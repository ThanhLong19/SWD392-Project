using System;
using System.Collections.Generic;

namespace SWD392_Project.Models
{
    public partial class Slider
    {
        public int SliderId { get; set; }
        public string Title { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string BackList { get; set; } = null!;
        public int Status { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
