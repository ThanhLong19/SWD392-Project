using Microsoft.AspNetCore.Mvc;
using SWD392_Project.DTO;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("/api/posts")]
public class PostController : Controller
{
    private readonly IPostRepository _postRepository = new PostRepository();

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Post>> GetAllPosts()
    {
        List<Post> posts;
        try
        {
            posts = _postRepository.GetAllPosts().ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return posts;
    }

    [HttpGet]
    [Route("getPostById")]
    public ActionResult<Post?> GetPostByID(int id)
    {
        Post? post;
        try
        {
            post = _postRepository.GetPostByID(id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return post;
    }

    [HttpPatch]
    [Route("update")]
    public IActionResult UpdatePost(PostDTO? post = null)
    {
        if (post == null)
        {
            return BadRequest();
        }

        _postRepository.UpdatePost(post);
        return Ok();
    }

    [HttpPost]
    [Route("add")]
    public IActionResult AddPost(PostDTO? post = null)
    {
        if (post == null)
        {
            return BadRequest();
        }

        _postRepository.AddPost(post);
        return Ok();
    }

    [HttpDelete]
    [Route("delete")]
    public IActionResult DeletePost(int? id = null)
    {
        if (id == null)
        {
            return BadRequest();
        }

        if (!_postRepository.DeletePost(id))
        {
            return BadRequest();
        }

        return Ok();
    }
}