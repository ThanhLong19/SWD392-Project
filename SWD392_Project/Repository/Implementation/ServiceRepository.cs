using SWD392_Project.DAO;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class ServiceRepository : IServiceRepository
{
    public IEnumerable<Service> GetAllService() => ServiceDAO.Instance.GetAllService();

    public Service? GetServiceByID(int id) => ServiceDAO.Instance.GetServiceByID(id);

    public Service UpdateService(ServiceDTO service) => ServiceDAO.Instance.UpdateService(service);

    public Service AddService(ServiceDTO service) => ServiceDAO.Instance.AddService(service);

    public bool DeleteService(int? id) => ServiceDAO.Instance.DeleteService(id);
}