using Microsoft.AspNetCore.Mvc;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("api/reservation")]
public class ReservationController : Controller
{
    private readonly IReservationRepository _reservationRepository = new ReservationRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Reservation>> GetAllReservation()
    {
        List<Reservation> reservations;
        try
        {
            reservations = _reservationRepository.GetAllReservation().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return reservations;
    }
}