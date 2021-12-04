using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class OrderInformation
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public short Quantity { get; set; }

        public virtual UserOrder Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
