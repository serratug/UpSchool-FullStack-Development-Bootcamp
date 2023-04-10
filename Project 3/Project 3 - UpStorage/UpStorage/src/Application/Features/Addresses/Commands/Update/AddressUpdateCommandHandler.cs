using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using Domain.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Addresses.Commands.Update;

public class AddressUpdateCommandHandler:IRequestHandler<AddressUpdateCommand,Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public AddressUpdateCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<Guid>> Handle(AddressUpdateCommand request, CancellationToken cancellationToken)
    {

        var address = await _applicationDbContext.Addresses.Where(a => a.Id == request.Id).FirstOrDefaultAsync();

        if (address == null) throw new ArgumentNullException(nameof(request.Id));

        address.Name = request.Name;
        address.UserId = request.UserId;
        address.CountryId = request.CountryId;
        address.CityId = request.CityId;
        address.District = request.District;
        address.PostCode = request.PostCode;
        address.AddressLine1 = request.AddressLine1;
        address.AddressLine2 = request.AddressLine2;
        address.ModifiedOn = DateTimeOffset.Now;
        address.ModifiedByUserId = request.UserId;

        _applicationDbContext.Addresses.Update(address);
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        return new Response<Guid>($"The address named \"{address.Name}\" was successfully updated.",address.Id);
    }
}