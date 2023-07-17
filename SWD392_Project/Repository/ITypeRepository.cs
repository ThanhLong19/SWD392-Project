using Type = SWD392_Project.Models.Type;

namespace SWD392_Project.Repository;

public interface ITypeRepository
{
    IEnumerable<Type> GetAllType();
}