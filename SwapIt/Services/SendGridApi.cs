using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwapIt.Services
{
    public static class SendGridApi
    {

        public static async Task<bool> Execute(string useremail, string username, string plainTextContent, string htmlContent, string subject)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("swapit14@gmail.com", "SwapIt");
            var to = new EmailAddress(useremail, username);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return await Task.FromResult(true);
        }
    }
}
