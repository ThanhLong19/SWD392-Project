namespace SWD392_Project.DTO;

public class PostDTO
{
    public int? postId { get; set; } = null!;
    public string? category { get; set; }
    public string? content { get; set; }
    public string? title { get; set; }
    public int? status { get; set; } = null!;
    public string? date { get; set; }
    public int? userId { get; set; } = null!;
}