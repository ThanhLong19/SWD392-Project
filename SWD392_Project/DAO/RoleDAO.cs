using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class RoleDAO
{
    private static RoleDAO? _instance;
    private static readonly object instancelock = new object();

    private RoleDAO()
    {
    }

    public static RoleDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new RoleDAO();
            }
        }
    }
    public IEnumerable<Role> GetAllRole()
    {
        List<Role?> role;
        try
        {
            var dbContext = new Project_SWD392Context();
            role = dbContext.Roles.ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return role;
    }
}