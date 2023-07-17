using SWD392_Project.DAO;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class FeedbackRepository : IFeedbackRepository
{
    public IEnumerable<Feedback> GetAllFeedback() => FeedbackDAO.Instance.GetAllFeedback();
    public Feedback? getFeedbackByID(int id) => FeedbackDAO.Instance.GetFeedbackByID(id);

    public Feedback? UpdateFeedback(FeedbackDTO? feedback) => FeedbackDAO.Instance.UpdateFeedback(feedback);

    public Feedback? AddFeedback(FeedbackDTO? feedback) => FeedbackDAO.Instance.AddFeedback(feedback);

    public bool DeleteFeedback(int? id) => FeedbackDAO.Instance.DeleteFeedback(id);
}