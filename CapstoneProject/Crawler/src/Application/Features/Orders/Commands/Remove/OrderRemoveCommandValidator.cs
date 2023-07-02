using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Commands.Remove;

public class OrderRemoveCommandValidator:AbstractValidator<OrderRemoveCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public OrderRemoveCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;

        RuleFor(x => x.Id)
            .NotEmpty()
            .MustAsync((id,cancellationToken) =>
            {
                return _applicationDbContext.Orders.AnyAsync(x => x.Id == id,
                    cancellationToken);
            })
            .WithMessage("The selected order does not exist.");
    }
    
}