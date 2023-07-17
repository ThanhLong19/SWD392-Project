using Microsoft.AspNetCore.Mvc;
using SWD392_Project.DTO;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("/api/users")]
public class AccountController : Controller
{
    private readonly IAccountRepository _accountRepository = new AccountRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<IEnumerable<User>> GetAllUsers()
    {
        List<User> users;
        try
        {
            users = _accountRepository.GetAllUser().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return users;
    }

    [HttpGet]
    [Route("getUserById")]
    public ActionResult<User?> GetUserByID(int id)
    {
        User? user;
        try
        {
            user = _accountRepository.GetUserByID(id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return user;
    }

    [HttpPatch]
    [Route("update")]
    public IActionResult UpdateUser(UserDTO? user = null)
    {
        if (user == null)
        {
            return BadRequest();
        }

        _accountRepository.UpdateUser(user);
        return Ok();
    }

    [HttpPost]
    [Route("add")]
    public IActionResult AddUser(UserDTO? user = null)
    {
        if (user == null)
        {
            return BadRequest();
        }

        _accountRepository.AddUser(user);
        return Ok();
    }

    [HttpDelete]
    [Route("delete")]
    public IActionResult DeleteUser(int? id = null)
    {
        if (id == null)
        {
            return BadRequest();
        }

        if (!_accountRepository.DeleteUser(id))
        {
            return BadRequest();
        }

        return Ok();
    }
}