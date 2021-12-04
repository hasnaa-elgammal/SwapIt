using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class CategoryDepartment
    {
        public CategoryDepartment()
        {
            Products = new HashSet<Product>();
        }

        public int DepartmentId { get; set; }
        public int CategoryId { get; set; }
        public string DepartmentName { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
