using Microsoft.AspNetCore.Mvc;
using SWD392_Project.DTO;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("/api/settings")]
public class SettingController : Controller
{
    private readonly ISettingRepository _settingRepository = new SettingRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Setting>> GetAllSetting()
    {
        List<Setting> settings;
        try
        {
            settings = _settingRepository.GetAllSetting().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return settings;
    }

    [HttpGet]
    [Route("getSettingById")]
    public ActionResult<Setting?> GetSettingById(int id)
    {
        Setting? setting;
        try
        {
            setting = _settingRepository.GetSettingByID(id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return setting;
    }

    [HttpPatch]
    [Route("update")]
    public IActionResult UpdateSetting(SettingDTO? setting = null)
    {
        if (setting == null)
        {
            return BadRequest();
        }

        _settingRepository.UpdateSetting(setting);
        return Ok();
    }

    [HttpPost]
    [Route("add")]
    public IActionResult AddSetting(SettingDTO? setting = null)
    {
        if (setting == null)
        {
            return BadRequest();
        }

        _settingRepository.AddSetting(setting);
        return Ok();
    }

    [HttpDelete]
    [Route("delete")]
    public IActionResult DeleteSetting(int? id = null)
    {
        if (id == null)
        {
            return BadRequest();
        }

        if (!_settingRepository.DeleteSetting(id))
        {
            return BadRequest();
        }

        return Ok();
    }
}