using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class FeedbackDAO
{
    private static FeedbackDAO? _instance;
    private static readonly object instancelock = new object();

    private FeedbackDAO()
    {
    }

    public static FeedbackDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new FeedbackDAO();
            }
        }
    }

    public IEnumerable<Feedback> GetAllFeedback()
    {
        List<Feedback> feedbacks;
        try
        {
            var dbContext = new Project_SWD392Context();
            feedbacks = dbContext
                .Feedbacks
                .Include(f => f.User)
                .Include(f => f.Reservation)
                .Include(f => f.Reservation.ReservationDetails)
                .ThenInclude(f => f.Service)
                .ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return feedbacks;
    }

    public Feedback? GetFeedbackByID(int id)
    {
        Feedback? feedback = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            feedback = dbContext.Feedbacks.FirstOrDefault(f => f.FeedbackId == id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return feedback;
    }

    public Feedback UpdateFeedback(FeedbackDTO? feedback)
    {
        try
        {
            var updateFeedback = GetFeedbackByID(feedback.feedbackId ?? -1);
            if (updateFeedback != null)
            {
                var context = new Project_SWD392Context();
                var map = new Mapper(new MapperConfiguration(cfg =>
                {
                    cfg
                        .CreateMap<FeedbackDTO, Feedback>()
                        .ForSourceMember(x => x.feedbackId, y => y.DoNotValidate());
                }));
                map.Map(feedback, updateFeedback);
                context.Entry(updateFeedback).State = EntityState.Modified;
                context.SaveChanges();
                return updateFeedback;
            }
            else
            {
                throw new Exception("Post not existed.");
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public Feedback AddFeedback(FeedbackDTO feedback)
    {
        try
        {
            var f = new Feedback
            {
                Detail = feedback.detail ?? "",
                DateFeedback = DateTime.Now,
                Star = feedback.star ?? 0,
                FeedbackStatus = feedback.feedbackStatus ?? 0,
                ReservationId = feedback.reservationId ?? -1,
                UserId = feedback.userId ?? -1
            };
            if (f.UserId == -1 || f.ReservationId == -1)
            {
                return null;
            }

            var dbContext = new Project_SWD392Context();
            dbContext.Feedbacks.Add(f);
            dbContext.SaveChanges();
            return f;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public bool DeleteFeedback(int? id)
    {
        try
        {
            var dbContext = new Project_SWD392Context();
            var f = dbContext.Feedbacks.FirstOrDefault(f => f.FeedbackId == (id ?? -1));
            if (f == null) return false;
            dbContext.Feedbacks.Remove(f);
            dbContext.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}