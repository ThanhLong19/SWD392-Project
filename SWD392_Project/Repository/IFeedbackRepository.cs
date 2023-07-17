using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository;

public interface IFeedbackRepository
{
    IEnumerable<Feedback> GetAllFeedback();
    Feedback? getFeedbackByID(int id);
    Feedback? UpdateFeedback(FeedbackDTO? feedback);
    Feedback? AddFeedback(FeedbackDTO? feedback);
    bool DeleteFeedback(int? id);
}