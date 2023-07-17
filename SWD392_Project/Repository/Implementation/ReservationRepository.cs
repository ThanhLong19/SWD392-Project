using SWD392_Project.DAO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class ReservationRepository : IReservationRepository
{
    public IEnumerable<Reservation> GetAllReservation() => ReservationDAO.Instance.GetAllReservation();
}