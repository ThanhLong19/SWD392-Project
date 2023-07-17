using Microsoft.AspNetCore.Mvc;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;
using Type = SWD392_Project.Models.Type;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("/api/types")]
public class TypeController : Controller
{
    private readonly ITypeRepository _typeRepository = new TypeRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Type>> GetAllTypes()
    {
        List<Type> types;
        try
        {
            types = _typeRepository.GetAllType().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return types;
    }
}