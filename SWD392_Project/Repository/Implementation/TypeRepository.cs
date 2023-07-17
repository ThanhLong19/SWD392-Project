using SWD392_Project.DAO;
using Type = SWD392_Project.Models.Type;

namespace SWD392_Project.Repository.Implementation;

public class TypeRepository : ITypeRepository
{
    public IEnumerable<Type> GetAllType() => TypeDAO.Instance.GetAllType();
}