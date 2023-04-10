using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using Domain.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Addresses.Commands.Delete;

public class AddressDeleteCommandHandler:IRequestHandler<AddressDeleteCommand,Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public AddressDeleteCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<Guid>> Handle(AddressDeleteCommand request, CancellationToken cancellationToken)
    {

        var address = await _applicationDbContext.Addresses.Where(a => a.Id == request.Id).FirstOrDefaultAsync();

        if (address == null) throw new ArgumentNullException(nameof(request.Id));

        address.IsDeleted = true;
        address.DeletedOn = DateTimeOffset.Now;
        address.DeletedByUserId = request.UserId;
        
        _applicationDbContext.Addresses.Update(address);
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        return new Response<Guid>($"The address named \"{address.Name}\" was successfully deleted.",address.Id);
    }
}