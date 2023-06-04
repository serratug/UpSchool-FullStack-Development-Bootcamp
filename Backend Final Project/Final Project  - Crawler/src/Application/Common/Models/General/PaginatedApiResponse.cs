namespace Application.Common.Models.General;

public class PaginatedApiResponse<T>
{
    public List<T> Items { get; set; }
    public int PageNumber { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }

    public PaginatedList<T> ToPaginatedList(int pageSize)
    {
        return new PaginatedList<T>(Items, TotalCount, PageNumber, pageSize)
        {
            HasPreviousPage = HasPreviousPage,
            HasNextPage = HasNextPage
        };
    }
}