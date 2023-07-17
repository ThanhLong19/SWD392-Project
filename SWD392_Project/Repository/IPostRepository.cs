using SWD392_Project.DTO;
using SWD392_Project.Models;

namespace SWD392_Project.Repository;

public interface IPostRepository
{
    IEnumerable<Post> GetAllPosts();
    Post? GetPostByID(int id);
    Post? UpdatePost(PostDTO? post);
    Post? AddPost(PostDTO? post);
    bool DeletePost(int? id);
}