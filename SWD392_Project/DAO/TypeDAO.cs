using SWD392_Project.Models;
using Type = SWD392_Project.Models.Type;

namespace SWD392_Project.DAO;

public class TypeDAO
{
    private static TypeDAO? _instance;
    private static readonly object instancelock = new object();

    private TypeDAO()
    {
    }

    public static TypeDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new TypeDAO();
            }
        }
    }

    public IEnumerable<Type> GetAllType()
    {
        List<Type?> types;
        try
        {
            var dbContext = new Project_SWD392Context();
            types = dbContext.Types.ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return types;
    }
}