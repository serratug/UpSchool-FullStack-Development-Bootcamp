using System.ComponentModel.DataAnnotations;

namespace Domain.Enums;

public enum ProductAmountChoice
{
    [Display(Name = "All Products")]
    All = 1,
    
    [Display(Name = "Specific Amount")]
    SpecificAmount = 2
}