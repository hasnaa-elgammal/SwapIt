using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class UserOrder
    {
        public UserOrder()
        {
            OrderInformations = new HashSet<OrderInformation>();
        }

        public int OrderId { get; set; }
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public TimeSpan OrderTime { get; set; }
        public string OrderType { get; set; }
        public string OrderStatus { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<OrderInformation> OrderInformations { get; set; }
    }
}
