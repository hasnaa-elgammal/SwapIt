using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.ModelViews
{
    public class ProductModelView
    {
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public int DepartmentId { get; set; }
        public string ProductName { get; set; }
        public string ProductPrice { get; set; }
        public string ProductQuantity { get; set; }
        public string ProductSize { get; set; }
        public string ProductDescription { get; set; }
        public string Forswap { get; set; }

        public string Forsell { get; set; }
    }
}
