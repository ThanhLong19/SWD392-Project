using SWD392_Project.DAO;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class SettingRepository : ISettingRepository
{
    public IEnumerable<Setting> GetAllSetting() => SettingDAO.Instance.GetAllSetting();

    public Setting? GetSettingByID(int id) => SettingDAO.Instance.GetSettingByID(id);

    public Setting UpdateSetting(SettingDTO setting) => SettingDAO.Instance.UpdateSetting(setting);
    public Setting AddSetting(SettingDTO setting) => SettingDAO.Instance.AddSetting(setting);
    public bool DeleteSetting(int? id) => SettingDAO.Instance.DeleteSetting(id);
}