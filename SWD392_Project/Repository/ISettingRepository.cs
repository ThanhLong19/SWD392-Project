using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository;

public interface ISettingRepository
{
    IEnumerable<Setting> GetAllSetting();
    Setting? GetSettingByID(int id);
    Setting UpdateSetting(SettingDTO setting);
    Setting AddSetting(SettingDTO setting);
    bool DeleteSetting(int? id);
}