using SWD392_Project.DAO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class RoleRepository : IRoleRepository
{
    public IEnumerable<Role> GetAllRole() => RoleDAO.Instance.GetAllRole();
}