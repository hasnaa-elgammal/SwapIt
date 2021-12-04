using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class Category
    {
        public Category()
        {
            CategoryDepartments = new HashSet<CategoryDepartment>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryImage { get; set; }

        public virtual ICollection<CategoryDepartment> CategoryDepartments { get; set; }
    }
}
