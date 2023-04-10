using Domain.Common;
using MediatR;

namespace Application.Features.Addresses.Commands.HardDelete;

public class AddressHardDeleteCommand:IRequest<Response<Guid>>
{
    public Guid Id { get; set; }
}