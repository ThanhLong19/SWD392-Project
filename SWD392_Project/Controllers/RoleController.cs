using Microsoft.AspNetCore.Mvc;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("/api/role")]
public class RoleController : Controller
{
    private readonly IRoleRepository _roleRepository = new RoleRepository();

    [HttpGet]
    [Route("getAll")]
    public ActionResult<List<Role>> GetAllRole()
    {
        List<Role> roles;
        try
        {
            roles = _roleRepository.GetAllRole().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return roles;
    }
}