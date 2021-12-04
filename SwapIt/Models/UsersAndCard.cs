using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class UsersAndCard
    {
        public string UserId { get; set; }
        public string CreditCardNumber { get; set; }

        public virtual Creditcard CreditCardNumberNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
