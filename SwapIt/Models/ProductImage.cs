using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class ProductImage
    {
        public int ProductId { get; set; }
        public string ProductImage1 { get; set; }

        public virtual Product Product { get; set; }
    }
}
