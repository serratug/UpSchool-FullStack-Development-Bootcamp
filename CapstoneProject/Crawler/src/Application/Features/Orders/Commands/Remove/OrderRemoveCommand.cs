using Domain.Common;
using MediatR;

namespace Application.Features.Orders.Commands.Remove;

public class OrderRemoveCommand:IRequest<Response<Guid>>
{
    public Guid Id { get; set; }

    public OrderRemoveCommand(Guid id)
    {
        Id = id;
    }
}