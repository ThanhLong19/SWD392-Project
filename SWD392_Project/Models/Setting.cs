using System;
using System.Collections.Generic;

namespace SWD392_Project.Models
{
    public partial class Setting
    {
        public int SettingId { get; set; }
        public string Value { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Status { get; set; }
        public string Href { get; set; } = null!;
        public int TypeId { get; set; }

        public virtual Type Type { get; set; } = null!;
    }
}
