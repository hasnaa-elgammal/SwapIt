using System;
using System.Collections.Generic;

#nullable disable

namespace SwapIt.Models
{
    public partial class Chat
    {
        public int MessageId { get; set; }
        public string FromId { get; set; }
        public string ToId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string MessageText { get; set; }
        public DateTime MessageDate { get; set; }
        public TimeSpan MessageTime { get; set; }

        public virtual User From { get; set; }
        public virtual User To { get; set; }
    }
}
