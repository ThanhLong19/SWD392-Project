using System.Globalization;
using AutoMapper;
using AutoMapper.Configuration.Conventions;
using Microsoft.EntityFrameworkCore;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.DAO;

public class PostDAO
{
    private static PostDAO? _instance;
    private static readonly object instancelock = new object();

    private PostDAO()
    {
    }

    public static PostDAO Instance
    {
        get
        {
            lock (instancelock)
            {
                return _instance ??= new PostDAO();
            }
        }
    }

    public IEnumerable<Post> GetAllPosts()
    {
        List<Post> posts;
        try
        {
            var dbContext = new Project_SWD392Context();
            posts = dbContext.Posts.Include(p => p.User).ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return posts;
    }

    public Post? GetPostByID(int id)
    {
        Post? post = null;
        try
        {
            var dbContext = new Project_SWD392Context();
            post = dbContext.Posts.FirstOrDefault(p => p.PostId == id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return post;
    }

    public Post UpdatePost(PostDTO post)
    {
        try
        {
            var updatePost = GetPostByID(post.postId ?? -1);
            if (updatePost != null)
            {
                var context = new Project_SWD392Context();
                var map = new Mapper(new MapperConfiguration(cfg =>
                {
                    cfg
                        .CreateMap<PostDTO, Post>()
                        .ForSourceMember(x => x.postId, y => y.DoNotValidate());
                }));
                map.Map(post, updatePost);
                context.Entry(updatePost).State = EntityState.Modified;
                context.SaveChanges();
                return updatePost;
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

    public Post AddPost(PostDTO post)
    {
        try
        {
            var p = new Post
            {
                Title = post.title ?? "",
                Content = post.content ?? "",
                UserId = post.userId ?? -1,
                Category = post.category ?? "",
                Date = DateTime.Parse(post.date ?? DateTime.Now.ToString()),
                Status = post.status ?? 0,
                Image = ""
            };
            if (p.UserId == -1)
            {
                return null;
            }

            var dbContext = new Project_SWD392Context();
            dbContext.Posts.Add(p);
            dbContext.SaveChanges();
            return p;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public bool DeletePost(int? id)
    {
        try
        {
            var dbContext = new Project_SWD392Context();
            var p = dbContext.Posts.FirstOrDefault(s => s.PostId == (id ?? -1));
            if (p == null) return false;
            dbContext.Posts.Remove(p);
            dbContext.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}