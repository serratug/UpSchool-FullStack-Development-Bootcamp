using System.Collections.ObjectModel;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Application.Common.Models.Order;
using Application.Common.Models.Product;
using Application.Common.Extensions;
using Application.Common.Models.CrawlerService;
using Application.Common.Models.Log;
using Domain.Enums;
using Domain.Utilities;
using Microsoft.AspNetCore.SignalR.Client;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SeleniumWorker;

public class Crawler
{
    private readonly IWebDriver _driver;

    private readonly List<ProductDto> Products;

    private HubConnection _logHubConnection;

    private HubConnection _orderHubConnection;

    private HttpClient _httpClient;

    private const string BASE_URL = "http://localhost:5108/";

    private string access_token;
    

    public Crawler()
    {
        _driver = new ChromeDriver();
        
        Products = new List<ProductDto>();
        
        _orderHubConnection = new HubConnectionBuilder()
            .WithUrl($"{BASE_URL}Hubs/OrderHub")
            .WithAutomaticReconnect()
            .Build();
        
        _logHubConnection = new HubConnectionBuilder()
            .WithUrl($"{BASE_URL}Hubs/LogHub")
            .WithAutomaticReconnect()
            .Build();

        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri($"{BASE_URL}api/");
        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        if (cancellationToken.IsCancellationRequested) await DisposeAsync();
        
        try
        {
            await _orderHubConnection.StartAsync();
            
            await _logHubConnection.StartAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error starting SignalR connection: {ex.Message}");
        }
        
        _orderHubConnection.On<WorkerServiceSendTokenDto>(SignalRMethodKeys.Log.SendToken, (tokenDto) =>
        {
            access_token = tokenDto.AccessToken;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access_token);
        });

        // Waiting for the signal that indicates a POST request has been sent to Add an Order.
        _orderHubConnection.On<OrderDto>(SignalRMethodKeys.Order.Added, async (orderDto) =>
        {
            // Clear the list before starting
            Products.Clear();
            
            await CrawlProductsAsync(orderDto);
            
            await UpdateOrderAsync(orderDto.Id); // Updates the TotalFoundAmount after crawling process
            
        });

    }

    public async Task CrawlProductsAsync(OrderDto orderDto)
    {
        try
        {
            await AddOrderEvent(OrderStatus.BotStarted, orderDto.Id);
            
            _driver.Navigate().GoToUrl("https://4teker.net/");

            Thread.Sleep(1000); // Wait for fun
            
            await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync,
                CreateLog("Navigated to 4teker.net"), access_token);

            var totalPages = _driver.FindElements(By.ClassName("page-number")).Last().Text;

            Thread.Sleep(1000); // Wait for fun
            
            await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync,
                CreateLog($"{totalPages} pages of products are found."));

            var pageCount = 1;

            bool lastPage = false;

            Thread.Sleep(1000); // Wait for fun
            
            await AddOrderEvent(OrderStatus.CrawlingStarted, orderDto.Id);

            while (!lastPage)
            {
                try
                {
                    var elements = _driver.FindElements(By.ClassName("product-name"));
                    var orderCompleted = await AddProductsInAPageAsync(elements, orderDto);

                    await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync,
                        CreateLog($"{pageCount}. page is crawled. Total {Products.Count} products added."));

                    if (orderCompleted || 
                        (orderDto.ProductAmountChoice == ProductAmountChoice.SpecificAmount 
                         && Products.Count == orderDto.RequestedAmount))
                    {
                        await CrawlingCompletedAsync(orderDto);
                        break;
                    }
                    
                    // This variable is the reason why try-catch block is used.
                    // No element will be found if it is last page and throws exception.
                    var nextPage = _driver.FindElement(By.ClassName("next-page"));

                    pageCount++;
                    string url = nextPage.GetAttribute("href");
                    _driver.Navigate().GoToUrl(url);
                }
                catch (Exception exception)
                {
                    lastPage = true;
                    
                    await CrawlingCompletedAsync(orderDto);
                }
            }
        }
        catch (Exception e)
        {
            // Unexpected error
            Console.WriteLine(e.Message);
            await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync,
                CreateLog($"The order with ID '{orderDto.Id}' has failed due to an unexpected error."));

            await AddOrderEvent(OrderStatus.CrawlingFailed, orderDto.Id);

        }
    }
    
    async Task<bool> AddProductsInAPageAsync(ReadOnlyCollection<IWebElement> elements, OrderDto orderDto)
    {
        // Add each product in the page one by one
        for (int i = 1; i <= elements.Count; i++)
        {
            // Check if the number of products crawled equals number of products requested by the order.
            if (orderDto.ProductAmountChoice == ProductAmountChoice.SpecificAmount 
                && Products.Count == orderDto.RequestedAmount) return true;
            
            ProductDto productDto = new ProductDto();
            
            var div = _driver.FindElement(By.XPath("/html/body/section/div/div/div[" + i + "]/div"));
            
            try
            {
                productDto.SalePrice = Convert.ToDecimal(div.FindElement(By.ClassName("sale-price")).Text.Remove(0,1));
                productDto.IsOnSale = true;
            }
            catch (Exception exception)
            {
                // The product does not have a sale price, meaning it is not on sale.
                productDto.SalePrice = 0;
                productDto.IsOnSale = false;
            }
            
            // Pass if the product does not fit the order
            if ((productDto.IsOnSale && orderDto.ProductCrawlType == ProductCrawlType.NonDiscount) 
                || (!productDto.IsOnSale && orderDto.ProductCrawlType == ProductCrawlType.OnDiscount)) continue;
            
            productDto.Picture = div.FindElement(By.ClassName("card-img-top")).GetAttribute("src");
            productDto.Name = div.FindElement(By.ClassName("product-name")).Text;
            productDto.Price = Convert.ToDecimal(div.FindElement(By.ClassName("price")).Text.Remove(0,1));
            productDto.OrderId = orderDto.Id;
            

            // Send a POST request to Add a Product
            var response = await _httpClient.PostAsJsonAsync("Products/Add", productDto);
            
            await HandleResponseFailure(response);

            Products.Add(productDto);
        }

        return false;
    }
    
    private async Task CrawlingCompletedAsync(OrderDto orderDto)
    {
        
        Thread.Sleep(1000); // Wait for fun
        
        await AddOrderEvent(OrderStatus.CrawlingCompleted, orderDto.Id);

        Thread.Sleep(1000); // Wait for fun
        
        if (Products.Count == orderDto.RequestedAmount)
            await AddOrderEvent(OrderStatus.OrderCompleted, orderDto.Id);

        string requestedAmount = (orderDto.ProductAmountChoice == ProductAmountChoice.SpecificAmount)
            ? $"/{orderDto.RequestedAmount}"
            : "";
        
        await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync,
            CreateLog($"{Products.Count}{requestedAmount} products added."));

    }
    
    private async Task UpdateOrderAsync(Guid orderId)
    {
        OrderDto orderDto = new OrderDto()
        {
            Id = orderId,
            TotalFoundAmount = Products.Count
        };
    
        // Send a POST request to Update the Order
        var response = await _httpClient.PostAsJsonAsync("Orders/Update", orderDto);
        
        await HandleResponseFailure(response);
    }
    

    private async Task AddOrderEvent(OrderStatus status, Guid orderId)
    {
        var statusMessage = EnumExtensions.GetDisplayName(status);
        
        await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync, CreateLog(statusMessage));
        
        var orderEvent = new OrderEventDto()
        {
            OrderId = orderId,
            Status = status
        };
        
        // Send a POST request to Add the OrderEvent
        var response = await _httpClient.PostAsJsonAsync("OrderEvents/Add", orderEvent);
        
        await HandleResponseFailure(response);
    }

    private async Task HandleResponseFailure(HttpResponseMessage response)
    {
        // Check if the request was successful
        if (!response.IsSuccessStatusCode)
        {
            await _logHubConnection.InvokeAsync(SignalRMethodKeys.Log.SendLogNotificationAsync, 
                CreateLog($"HTTP request failed with status code: {response.StatusCode}"));
        }
    }

    private async Task DisposeAsync()
    {
        _driver.Quit();
        await _logHubConnection.DisposeAsync();
        await _orderHubConnection.DisposeAsync();
    }

    private LogDto CreateLog(string message) => new LogDto(message);
}