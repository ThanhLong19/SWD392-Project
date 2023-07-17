using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class UserDAO
{
    private static UserDAO? _instance;
    private static readonly object instancelock = new object();

    private UserDAO()
    {
    }

    public static UserDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new UserDAO();
            }
        }
    }

    public User? getAccountByUsernameAndPassword(string username, string password)
    {
        User? user = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            user = dbContext.Users.FirstOrDefault(a => a.UserName.Equals(username) && a.Password.Equals(password));
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return user;
    }

    public IEnumerable<User> GetAllAccount()
    {
        List<User?> users;
        try
        {
            var dbContext = new Project_SWD392Context();
            users = dbContext.Users.ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return users;
    }

    public User? GetUserByID(int id)
    {
        User? user = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            user = dbContext.Users.FirstOrDefault(u => u.UserId == id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return user;
    }

    public User? GetUserAuthentication(string username, string password)
    {
        User? user = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            user = dbContext.Users.Include(u => u.Role)
                .FirstOrDefault(u => u.UserName.Equals(username) && u.Password.Equals(password));
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return user;
    }

    public User UpdateUser(UserDTO user)
    {
        try
        {
            var updateUser = GetUserByID(user.userId ?? -1);
            if (updateUser != null)
            {
                var context = new Project_SWD392Context();
                var map = new Mapper(new MapperConfiguration(cfg =>
                {
                    cfg
                        .CreateMap<UserDTO, User>()
                        .ForSourceMember(x => x.userId, y => y.DoNotValidate());
                }));
                map.Map(user, updateUser);
                context.Entry(updateUser).State = EntityState.Modified;
                context.SaveChanges();
                return updateUser;
            }
            else
            {
                throw new Exception("User not existed.");
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public User AddUser(UserDTO user)
    {
        try
        {
            var u = new User
            {
                UserName = user.userName,
                Password = user.password,
                Phone = user.phone ?? "",
                Address = user.address ?? "",
                FullName = user.fullName ?? "",
                Email = user.email ?? "",
                Gender = user.gender ?? 1,
                RoleId = user.roleId ?? 4,
                Avatar = "",
                Date = DateTime.Now,
                Status = user.status ?? 0
            };
            var dbContext = new Project_SWD392Context();
            dbContext.Users.Add(u);
            dbContext.SaveChanges();
            return u;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public bool DeleteUser(int? id)
    {
        try
        {
            var dbContext = new Project_SWD392Context();
            var u = dbContext.Users.FirstOrDefault(s => s.UserId == (id ?? -1));
            if (u == null) return false;
            dbContext.Users.Remove(u);
            dbContext.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}