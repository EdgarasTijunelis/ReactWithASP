using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;

namespace ReactWithASP.Server.Services
{
    public class GetUserService(AppDbContext context): IGetUserService
    {
        public async Task<List<IdentityUserDto>> GetAll()
        {
            var identityUsers = await context.Users.ToListAsync();
            List<IdentityUserDto> results = [];
            foreach (var identityUser in identityUsers)
            {
                results.Add(MapDto(identityUser));
            }
            return results;
        }
        private IdentityUserDto MapDto(IdentityUser identityUser) => new IdentityUserDto(identityUser.UserName, identityUser.Email);
    }
}
