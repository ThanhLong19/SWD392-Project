using Microsoft.AspNetCore.Mvc;
using SWD392_Project.DTO;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("api/feedback")]
public class FeedbackController : Controller
{
    private readonly IFeedbackRepository _feedbackRepository = new FeedbackRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Feedback>> GetAllFeedback()
    {
        List<Feedback> feedbacks;
        try
        {
            feedbacks = _feedbackRepository.GetAllFeedback().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return feedbacks;
    }

    [HttpPatch]
    [Route("update")]
    public IActionResult UpdateUser(FeedbackDTO? feedback = null)
    {
        if (feedback == null)
        {
            return BadRequest();
        }

        _feedbackRepository.UpdateFeedback(feedback);
        return Ok();
    }

    [HttpPost]
    [Route("add")]
    public IActionResult AddFeedback(FeedbackDTO? feedback = null)
    {
        if (feedback == null)
        {
            return BadRequest();
        }

        _feedbackRepository.AddFeedback(feedback);
        return Ok();
    }

    [HttpDelete]
    [Route("delete")]
    public IActionResult DeleteFeedback(int? id = null)
    {
        if (id == null)
        {
            return BadRequest();
        }

        if (!_feedbackRepository.DeleteFeedback(id))
        {
            return BadRequest();
        }

        return Ok();
    }
}