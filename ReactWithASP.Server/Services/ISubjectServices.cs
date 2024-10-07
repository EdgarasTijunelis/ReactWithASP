using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services
{
    public interface ISubjectServices
    {
        Task<List<SubjectDto>> GetAll();
        Task<SubjectDto> Get(int id);
        Task<bool> Delete(int id);
        Task Store(SubjectDto dto);
        Task Update(int id, SubjectDto dto);
        Task<Subject> Post(SubjectDto dto);
    }
}
