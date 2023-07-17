using Microsoft.AspNetCore.Mvc;
using SWD392_Project.DTO;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("api/services")]
public class ServiceController : Controller
{
    private readonly IServiceRepository _serviceRepository = new ServiceRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Service>> GetAllService()
    {
        List<Service> services;
        try
        {
            services = _serviceRepository.GetAllService().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return services;
    }

    [HttpGet]
    [Route("getServiceById")]
    public ActionResult<Service?> GetServiceById(int id)
    {
        Service? service;
        try
        {
            service = _serviceRepository.GetServiceByID(id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return service;
    }

    [HttpPatch]
    [Route("update")]
    public IActionResult UpdateSetting(ServiceDTO? service = null)
    {
        if (service == null)
        {
            return BadRequest();
        }

        _serviceRepository.UpdateService(service);
        return Ok();
    }

    [HttpPost]
    [Route("add")]
    public IActionResult AddService(ServiceDTO? service = null)
    {
        if (service == null)
        {
            return BadRequest();
        }

        _serviceRepository.AddService(service);
        return Ok();
    }

    [HttpDelete]
    [Route("delete")]
    public IActionResult DeleteService(int? id = null)
    {
        if (id == null)
        {
            return BadRequest();
        }

        if (!_serviceRepository.DeleteService(id))
        {
            return BadRequest();
        }

        return Ok();
    }
}