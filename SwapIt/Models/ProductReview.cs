using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class ProductReview
    {
        public int ReviewId { get; set; }
        public int ProductId { get; set; }
        public string FromId { get; set; }
        public string ReviewText { get; set; }
        public DateTime ReviewDate { get; set; }
        public TimeSpan ReviewTime { get; set; }

        public virtual User From { get; set; }
        public virtual Product Product { get; set; }
    }
}
