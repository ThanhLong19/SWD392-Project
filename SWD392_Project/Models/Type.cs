using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SWD392_Project.Models
{
    public partial class Type
    {
        public Type()
        {
            Settings = new HashSet<Setting>();
        }

        public int TypeId { get; set; }
        public string TypeName { get; set; } = null!;

        [JsonIgnore] public virtual ICollection<Setting> Settings { get; set; }
    }
}