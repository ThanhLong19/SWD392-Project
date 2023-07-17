using SWD392_Project.DAO;
using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository.Implementation;

public class PostRepository : IPostRepository
{
    public IEnumerable<Post> GetAllPosts() => PostDAO.Instance.GetAllPosts();

    public Post? GetPostByID(int id) => PostDAO.Instance.GetPostByID(id);
    public Post? UpdatePost(PostDTO post) => PostDAO.Instance.UpdatePost(post);

    public Post? AddPost(PostDTO? post) => PostDAO.Instance.AddPost(post);
    public bool DeletePost(int? id) => PostDAO.Instance.DeletePost(id);
}