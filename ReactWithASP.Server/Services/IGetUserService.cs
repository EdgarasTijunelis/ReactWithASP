using ReactWithASP.Server.Models.DTOs;

namespace ReactWithASP.Server.Services
{
    public interface IGetUserService
    {
        Task<List<IdentityUserDto>> GetAll();
    }
}
