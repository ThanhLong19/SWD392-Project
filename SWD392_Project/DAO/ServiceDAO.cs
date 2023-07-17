using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class ServiceDAO
{
    private static ServiceDAO? _instance;
    private static readonly object instancelock = new object();

    private ServiceDAO()
    {
    }

    public static ServiceDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new ServiceDAO();
            }
        }
    }

    public IEnumerable<Service> GetAllService()
    {
        List<Service> services;
        try
        {
            var dbContext = new Project_SWD392Context();
            services = dbContext.Services.ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return services;
    }

    public Service? GetServiceByID(int id)
    {
        Service? service = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            service = dbContext.Services.FirstOrDefault(s => s.ServiceId == id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return service;
    }

    public Service UpdateService(ServiceDTO service)
    {
        try
        {
            var updateService = GetServiceByID(service.serviceId ?? -1);
            if (updateService != null)
            {
                var context = new Project_SWD392Context();
                var map = new Mapper(new MapperConfiguration(cfg =>
                {
                    cfg
                        .CreateMap<ServiceDTO, Service>()
                        .ForSourceMember(x => x.serviceId, y => y.DoNotValidate());
                }));
                map.Map(service, updateService);
                context.Entry(updateService).State = EntityState.Modified;
                context.SaveChanges();
                return updateService;
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

    public Service AddService(ServiceDTO service)
    {
        try
        {
            var s = new Service
            {
                ServiceName = service.serviceName ?? "",
                Price = service.price ?? 0,
                Status = service.status ?? 0,
                Detail = service.detail ?? "",
                Discount = 0,
                Image = "",
                Rate = 0,
                Type = service.type ?? ""
            };
            var dbContext = new Project_SWD392Context();
            dbContext.Services.Add(s);
            dbContext.SaveChanges();
            return s;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public bool DeleteService(int? id)
    {
        try
        {
            var dbContext = new Project_SWD392Context();
            var s = dbContext.Services.FirstOrDefault(s => s.ServiceId == (id ?? -1));
            if (s == null) return false;
            dbContext.Services.Remove(s);
            dbContext.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}