using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository;

public interface IAccountRepository
{
    IEnumerable<User> GetAllUser();
    User? GetUserByID(int id);
    User UpdateUser(UserDTO user);
    User AddUser(UserDTO user);
    User? GetUserAuthentication(string username, string password);
    bool DeleteUser(int? id);
}