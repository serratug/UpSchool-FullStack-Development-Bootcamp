using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Addresses.Queries.GetById
{
    public class AddressGetByIdQueryHandler:IRequestHandler<AddressGetByIdQuery,AddressGetByIdDto>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public AddressGetByIdQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<AddressGetByIdDto> Handle(AddressGetByIdQuery request, CancellationToken cancellationToken)
        {
            var address = await _applicationDbContext.Addresses
                .Where(x => x.Id == request.Id && (!request.IsDeleted.HasValue || x.IsDeleted == request.IsDeleted))
                .FirstOrDefaultAsync();

            if (address is null) throw new ArgumentNullException(nameof(request.Id));
            

            return new AddressGetByIdDto()
            {
                Id = address.Id,
                Name = address.Name,
                UserId = address.UserId,
                CountryId = address.CountryId,
                CityId = address.CityId,
                District = address.District,
                PostCode = address.PostCode,
                AddressLine1 = address.AddressLine1,
                AddressLine2 = address.AddressLine2,
                AddressType = address.AddressType
            };
        }
        
    }
}
