using Domain.Common;
using Domain.Enums;
using MediatR;

namespace Application.Features.Orders.Commands.Update;

public class OrderUpdateCommand:IRequest<Response<Guid>>
{
    public Guid Id { get; set; }

    public int TotalFoundAmount { get; set; }
    
}