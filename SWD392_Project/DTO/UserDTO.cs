namespace SWD392_Project.DTO;

public class UserDTO
{
    public string? address { get; set; }
    public string? email { get; set; }
    public string? fullName { get; set; }
    public int? gender { get; set; }
    public string password { get; set; }
    public string? phone { get; set; }
    public int? roleId { get; set; }
    public int? status { get; set; }
    public int? userId { get; set; } = null!;
    public string userName { get; set; }
}