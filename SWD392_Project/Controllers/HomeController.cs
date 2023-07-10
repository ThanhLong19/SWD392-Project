using Microsoft.AspNetCore.Mvc;

namespace SWD392_Project.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
