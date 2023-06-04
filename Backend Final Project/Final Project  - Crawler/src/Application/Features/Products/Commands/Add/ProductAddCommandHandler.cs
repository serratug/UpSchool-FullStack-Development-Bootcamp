using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.Commands.Add;

public class ProductAddCommandHandler:IRequestHandler<ProductAddCommand,Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public ProductAddCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<Guid>> Handle(ProductAddCommand request, CancellationToken cancellationToken)
    {
        // var existingProduct = await _applicationDbContext.Products.FirstOrDefaultAsync(p => p.Name == request.Name);
        //
        // if (existingProduct != null)
        // {
        //     // Product with the same name already exists
        //     return new Response<Guid>("Product already exists.", existingProduct.Id);
        // }
        
        var product = new Product()
        {
            OrderId = request.OrderId,
            Name = request.Name,
            Picture = request.Picture,
            IsOnSale = request.IsOnSale,
            Price = request.Price,
            SalePrice = request.SalePrice,
            CreatedOn = DateTimeOffset.Now,
            CreatedByUserId = null,
        };

        await _applicationDbContext.Products.AddAsync(product, cancellationToken);

        await _applicationDbContext.SaveChangesAsync(cancellationToken);

        return new Response<Guid>("Product successfully added.", product.Id);
    }
}