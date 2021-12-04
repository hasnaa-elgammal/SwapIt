using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class UserRating
    {
        public int RatingId { get; set; }
        public string FromId { get; set; }
        public string ToId { get; set; }
        public byte Rating { get; set; }

        public virtual User From { get; set; }
        public virtual User To { get; set; }
    }
}
