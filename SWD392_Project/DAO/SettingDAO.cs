using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class SettingDAO
{
    private static SettingDAO? _instance;
    private static readonly object instancelock = new object();

    private SettingDAO()
    {
    }

    public static SettingDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new SettingDAO();
            }
        }
    }

    public IEnumerable<Setting> GetAllSetting()
    {
        List<Setting> settings;
        try
        {
            var dbContext = new Project_SWD392Context();
            settings = dbContext.Settings.Include(s => s.Type).ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return settings;
    }

    public Setting? GetSettingByID(int id)
    {
        Setting? setting = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            setting = dbContext.Settings.FirstOrDefault(s => s.SettingId == id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return setting;
    }

    public Setting UpdateSetting(SettingDTO setting)
    {
        try
        {
            var updateSetting = GetSettingByID(setting.settingId ?? -1);
            if (updateSetting != null)
            {
                var context = new Project_SWD392Context();
                var map = new Mapper(new MapperConfiguration(cfg =>
                {
                    cfg
                        .CreateMap<SettingDTO, Setting>()
                        .ForSourceMember(x => x.settingId, y => y.DoNotValidate());
                }));
                map.Map(setting, updateSetting);
                context.Entry(updateSetting).State = EntityState.Modified;
                context.SaveChanges();
                return updateSetting;
            }
            else
            {
                throw new Exception("Setting not existed.");
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public Setting AddSetting(SettingDTO setting)
    {
        try
        {
            var s = new Setting
            {
                Value = setting.value ?? "",
                Description = setting.description ?? "",
                Href = setting.href ?? "",
                Status = (setting.status ?? false) ? 1 : 0,
                TypeId = setting.typeId ?? 1
            };
            var dbContext = new Project_SWD392Context();
            dbContext.Settings.Add(s);
            dbContext.SaveChanges();
            return s;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public bool DeleteSetting(int? id)
    {
        try
        {
            var dbContext = new Project_SWD392Context();
            var s = dbContext.Settings.FirstOrDefault(s => s.SettingId == (id ?? -1));
            if (s == null) return false;
            dbContext.Settings.Remove(s);
            dbContext.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}