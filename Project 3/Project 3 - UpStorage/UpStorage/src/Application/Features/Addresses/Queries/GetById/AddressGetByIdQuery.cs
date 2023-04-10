using MediatR;

namespace Application.Features.Addresses.Queries.GetById
{
    public class AddressGetByIdQuery:IRequest<AddressGetByIdDto>
    {
        // We are not likely to need all addresses, we probably need a users' all addresses
        public Guid Id { get; set; }
        public bool? IsDeleted { get; set; }

        public AddressGetByIdQuery(Guid id, bool? isDeleted)
        {
            Id = id;

            IsDeleted = isDeleted;
        }
    }
}
