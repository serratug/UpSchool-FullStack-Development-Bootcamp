using System.ComponentModel.DataAnnotations;

namespace Domain.Enums;

public enum OrderStatus
{
    [Display(Name = "Bot Started.")]
    BotStarted = 1,

    [Display(Name = "Crawling Started.")]
    CrawlingStarted = 2,

    [Display(Name = "Crawling Completed.")]
    CrawlingCompleted = 3,

    [Display(Name = "Crawling Failed.")]
    CrawlingFailed = 4,

    [Display(Name = "Order Completed.")]
    OrderCompleted = 5,
}