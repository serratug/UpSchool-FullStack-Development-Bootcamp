using System.ComponentModel.DataAnnotations;

namespace Domain.Enums;

public enum ProductCrawlType
{
    [Display(Name = "All Products")]
    All = 1,
    
    [Display(Name = "On Discount")]
    OnDiscount = 2,
    
    [Display(Name = "Non Discount")]
    NonDiscount = 3
}