namespace Crawler;

class Program
{
    static async Task Main()
    {
        Crawler crawler = new Crawler();
        
        await crawler.StartAsync();
    }
}

