using Application.Common.Interfaces;
using Application.Common.Models.Email;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.OrderEvents.Commands.Add;

public class OrderEventAddCommandHandler:IRequestHandler<OrderEventAddCommand,Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    private readonly IEmailService _emailService;

    private readonly INotificationHubService _notificationHubService;

    public OrderEventAddCommandHandler(IApplicationDbContext applicationDbContext, IEmailService emailService, INotificationHubService notificationHubService)
    {
        _applicationDbContext = applicationDbContext;
        _emailService = emailService;
        _notificationHubService = notificationHubService;
    }

    public async Task<Response<Guid>> Handle(OrderEventAddCommand request, CancellationToken cancellationToken)
    {
        var orderEvent = new OrderEvent()
        {
            OrderId = request.OrderId,
            Status = request.Status,
            CreatedOn = DateTimeOffset.Now,
        };

        await _applicationDbContext.OrderEvents.AddAsync(orderEvent, cancellationToken);

        await _applicationDbContext.SaveChangesAsync(cancellationToken);

        var settings = await _applicationDbContext.NotificationSettings.FirstOrDefaultAsync();

        if (settings is not null)
        {
            if (settings.EmailNotification && settings.EmailAddress is not null)
            {
                _emailService.SendEmailNotification(new SendEmailNotificationDto()
                {
                    EmailAddress = settings.EmailAddress,
                    OrderId = orderEvent.OrderId,
                    Status = orderEvent.Status
                });
            }

            if (settings.PushNotification && 
                (orderEvent.Status == OrderStatus.CrawlingCompleted || orderEvent.Status == OrderStatus.CrawlingFailed))
            {
                await _notificationHubService.NewNotificationAddedAsync(orderEvent.Status, cancellationToken);
            }
        }

        return new Response<Guid>("Order event successfully added.", orderEvent.Id);
    }
}