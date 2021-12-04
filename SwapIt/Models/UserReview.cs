using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class UserReview
    {
        public int ReviewId { get; set; }
        public string FromId { get; set; }
        public string ToId { get; set; }
        public string ReviewText { get; set; }
        public DateTime ReviewDate { get; set; }
        public TimeSpan ReviewTime { get; set; }

        public virtual User From { get; set; }
        public virtual User To { get; set; }
    }
}
