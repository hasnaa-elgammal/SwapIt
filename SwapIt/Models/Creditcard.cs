using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class Creditcard
    {
        public Creditcard()
        {
            UsersAndCards = new HashSet<UsersAndCard>();
        }

        public string CreditCardNumber { get; set; }
        public string CreditCardName { get; set; }
        public string CreditCardExpireddate { get; set; }
        public string CreditCardPassword { get; set; }

        public virtual ICollection<UsersAndCard> UsersAndCards { get; set; }
    }
}
