using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services
{
    public interface IGroupServices
    {
        Task<List<GroupDto>> GetAll();
        Task<GroupDto> Get(int id);
        Task<bool> Delete(int id);
        Task Store(GroupDto dto);
        Task Update(int id, GroupDto dto);
        Task<Group> Post(GroupDto dto);
    }
}


