using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SWD392_Project.DTO;
using SWD392_Project.Models;
using SWD392_Project.Repository;
using SWD392_Project.Repository.Implementation;

namespace SWD392_Project.Controllers;

[ApiController]
[Route("/api")]
public class HomeController : Controller
{
    private readonly IConfiguration _configuration;
    private readonly IAccountRepository _accountRepository = new AccountRepository();

    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    [Route("login")]
    public ActionResult<Dictionary<string, string>> Login(UserDTO? user = null)
    {
        if (user == null)
        {
            return BadRequest();
        }

        var u = _accountRepository.GetUserAuthentication(user.userName, user.password);
        if (u == null)
        {
            return Unauthorized();
        }

        try
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWT:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString(CultureInfo.CurrentCulture)),
                new Claim(ClaimTypes.Role, u.Role.RoleName),
                new Claim("ID", u.UserId.ToString()),
                new Claim("Name", u.FullName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                claims,
                expires: DateTime.UtcNow.AddSeconds(
                    int.TryParse(_configuration["JWT:DurationInSeconds"], out var expiresTime) is false
                        ? expiresTime
                        : 3600),
                signingCredentials: signIn
            );
            Dictionary<string, string> data = new()
            {
                { "token", new JwtSecurityTokenHandler().WriteToken(token) },
                { "role", u.Role.RoleName }
            };
            return Ok(data);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}