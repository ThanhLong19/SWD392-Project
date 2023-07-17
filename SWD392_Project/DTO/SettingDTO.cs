namespace SWD392_Project.DTO;

public class SettingDTO
{
    public int? settingId { get; set; } = null!;
    public string? value { get; set; }
    public string? description { get; set; }
    public bool? status { get; set; }
    public string? href { get; set; } = "";
    public int? typeId { get; set; } = null!;
}