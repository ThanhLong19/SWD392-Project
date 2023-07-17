using SWD392_Project.DAO;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class AccountRepository : IAccountRepository
{
    public IEnumerable<User> GetAllUser() => UserDAO.Instance.GetAllAccount();

    public User? GetUserByID(int id) => UserDAO.Instance.GetUserByID(id);

    public User UpdateUser(UserDTO user) => UserDAO.Instance.UpdateUser(user);

    public User AddUser(UserDTO user) => UserDAO.Instance.AddUser(user);
    public bool DeleteUser(int? id) => UserDAO.Instance.DeleteUser(id);

    public User? GetUserAuthentication(string username, string password) =>
        UserDAO.Instance.GetUserAuthentication(username, password);
}