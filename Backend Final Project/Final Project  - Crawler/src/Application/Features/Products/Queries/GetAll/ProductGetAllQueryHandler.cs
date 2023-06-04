using Application.Common.Interfaces;
using Application.Common.Models.General;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Application.Features.Products.Queries.GetAll;

public class ProductGetAllQueryHandler:IRequestHandler<ProductGetAllQuery,PaginatedList<ProductGetAllDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    private readonly IMemoryCache _memoryCache;
    
    private readonly MemoryCacheEntryOptions _cacheOptions;
    
    private const string PRODUCTS_KEY = "ProductsList";

    public ProductGetAllQueryHandler(IApplicationDbContext applicationDbContext, IMemoryCache memoryCache)
    {
        _applicationDbContext = applicationDbContext;
        _memoryCache = memoryCache;
        _cacheOptions = new MemoryCacheEntryOptions()
        {
            Priority = CacheItemPriority.Normal,
            AbsoluteExpiration = DateTimeOffset.Now.AddHours(6)
        };
    }

    public async Task<PaginatedList<ProductGetAllDto>> Handle(ProductGetAllQuery request, CancellationToken cancellationToken)
    {
        if (_memoryCache.TryGetValue(PRODUCTS_KEY,out List<ProductGetAllDto> cachedProducts))
            return PaginatedList<ProductGetAllDto>.Create(cachedProducts, request.PageNumber, request.PageSize);
        
        var dbQuery = _applicationDbContext.Products.AsQueryable();
        
        Thread.Sleep(2000);

        dbQuery = dbQuery.Where(x => x.OrderId == request.OrderId);

        dbQuery = dbQuery.Include(x => x.Order);

        var products = await dbQuery
            .Select(x=>MapToGetAllDto(x))
            .AsNoTracking()
            .ToListAsync(cancellationToken);
        
        _memoryCache.Set(PRODUCTS_KEY, products, _cacheOptions);
        
        return PaginatedList<ProductGetAllDto>.Create(products, request.PageNumber, request.PageSize);
    }
    
    private static ProductGetAllDto MapToGetAllDto(Product product)
    {
        return new ProductGetAllDto()
        {
            Id = product.Id,
            OrderId = product.OrderId,
            Name = product.Name,
            Picture = product.Picture,
            IsOnSale = product.IsOnSale,
            Price = product.Price,
            SalePrice = product.SalePrice
        };
    }
}