using System.Net;
using System.Net.Mail;
using Application.Common.Interfaces;
using Application.Common.Models.Email;
using Domain.Enums;

namespace Infrastructure.Services;

public class EmailManager:IEmailService
{
    public void SendEmailNotification(SendEmailNotificationDto sendEmailNotificationDto)
    {
        var htmlContent = $"<h4>Hello</h4></br><p>The order with the Id '{sendEmailNotificationDto.OrderId}'";

        if (sendEmailNotificationDto.Status == OrderStatus.CrawlingCompleted)
            htmlContent += " is completed crawling.";
        else if (sendEmailNotificationDto.Status == OrderStatus.CrawlingFailed)
            htmlContent += " is failed.";

        var subject = $"Your order status";

        Send(new SendEmailDto(sendEmailNotificationDto.EmailAddress,htmlContent,subject));
    }
    
    private void Send(SendEmailDto sendEmailDto)
    {
        MailMessage message = new MailMessage();

        sendEmailDto.EmailAddresses.ForEach(emailAddress=> message.To.Add(emailAddress));

        message.From = new MailAddress("noreply@entegraturk.com");

        message.Subject = sendEmailDto.Subject;

        message.IsBodyHtml = true;

        message.Body = sendEmailDto.Content;

        SmtpClient client = new SmtpClient();

        client.Port = 587;

        client.Host = "mail.entegraturk.com";

        client.EnableSsl = false;

        client.UseDefaultCredentials = false;

        client.Credentials = new NetworkCredential("noreply@entegraturk.com", "xzx2xg4Jttrbzm5nIJ2kj1pE4l");

        client.DeliveryMethod = SmtpDeliveryMethod.Network;

        client.Send(message);


    }
}