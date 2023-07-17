namespace SeleniumWorker;

public class Worker : BackgroundService
{
    
    private readonly Crawler _crawler;

    private readonly HttpClient _httpClient;
    
    public Worker(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _crawler = new Crawler(_httpClient);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await _crawler.StartAsync(stoppingToken);
    }
}