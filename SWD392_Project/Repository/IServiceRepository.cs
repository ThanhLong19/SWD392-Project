using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository;

public interface IServiceRepository
{
    IEnumerable<Service> GetAllService();
    Service? GetServiceByID(int id);
    Service UpdateService(ServiceDTO service);
    Service AddService(ServiceDTO service);
    bool DeleteService(int? id);
}