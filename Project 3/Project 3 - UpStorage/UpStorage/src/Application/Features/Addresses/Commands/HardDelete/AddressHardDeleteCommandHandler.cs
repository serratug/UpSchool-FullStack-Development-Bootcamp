using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using Domain.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Addresses.Commands.HardDelete;

public class AddressHardDeleteCommandHandler:IRequestHandler<AddressHardDeleteCommand,Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public AddressHardDeleteCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<Guid>> Handle(AddressHardDeleteCommand request, CancellationToken cancellationToken)
    {

        var address = await _applicationDbContext.Addresses.Where(a => a.Id == request.Id).FirstOrDefaultAsync();

        if (address is null) throw new ArgumentNullException(nameof(request.Id));

        _applicationDbContext.Addresses.Remove(address);
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        return new Response<Guid>($"The address named \"{address.Name}\" was permanently deleted.",address.Id);
    }
}