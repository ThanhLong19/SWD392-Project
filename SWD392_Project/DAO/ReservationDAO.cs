using Microsoft.EntityFrameworkCore;
using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class ReservationDAO
{
    private static ReservationDAO? _instance;
    private static readonly object instancelock = new object();

    private ReservationDAO()
    {
    }

    public static ReservationDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new ReservationDAO();
            }
        }
    }

    public IEnumerable<Reservation> GetAllReservation()
    {
        List<Reservation> reservations;
        try
        {
            var dbContext = new Project_SWD392Context();
            reservations = dbContext.Reservations
                .Include(r => r.ReservationDetails)
                .ThenInclude(r => r.Service)
                .ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return reservations;
    }
}