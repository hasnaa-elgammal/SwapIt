using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class Cart
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public short Quantity { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
