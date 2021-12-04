using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class UserFollowing
    {
        public string UserId { get; set; }
        public string FollowingId { get; set; }

        public virtual User Following { get; set; }
        public virtual User User { get; set; }
    }
}
