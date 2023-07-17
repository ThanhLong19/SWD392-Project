using System;
using System.Collections.Generic;

namespace SWD392_Project.Models
{
    public partial class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public int UserId { get; set; }
        public string Image { get; set; } = null!;
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public string Category { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}
