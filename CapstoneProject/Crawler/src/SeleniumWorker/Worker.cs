namespace SeleniumWorker;

public class Worker : BackgroundService
{
    
    private readonly Crawler _crawler;

    
    public Worker()
    {
        _crawler = new Crawler();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await _crawler.StartAsync(stoppingToken);
    }
}