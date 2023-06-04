using Application.Common.Interfaces;
using Domain.Enums;
using FluentValidation;

namespace Application.Features.Orders.Commands.Add;

public class OrderAddCommandValidator:AbstractValidator<OrderAddCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public OrderAddCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;

        RuleFor(x => x.ProductAmountChoice)
            .NotEmpty()
            .IsInEnum()
            .WithMessage("Please choose one of the amount options.");
        
        RuleFor(x => x.ProductCrawlType)
            .NotEmpty()
            .IsInEnum()
            .WithMessage("Product type is not valid.");

        RuleFor(x => x.RequestedAmount)
            .NotEmpty()
            .GreaterThan(0)
            .When(x => x.ProductAmountChoice == ProductAmountChoice.SpecificAmount);
        
    }

}