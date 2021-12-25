using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.ModelViews
{
    public class AddProductModel
    {
        public string UserEmail { get; set; }
        public int DepartmentId { get; set; }
        public string ProductName { get; set; }
        public short ProductPrice { get; set; }
        public short ProductQuantity { get; set; }
        public string ProductSize { get; set; }
        public string ProductDescription { get; set; }
        public bool Forswap { get; set; }
        public bool Forsell { get; set; }
    }
}
