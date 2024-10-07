using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services
{
    public interface IProgrammeServices
    {
        Task<List<StudyProgrammeDto>> GetAll();
        Task<StudyProgrammeDto> Get(int id);
        Task<bool> Delete(int id);
        Task Store(StudyProgrammeDto dto);
        Task Update(int id, StudyProgrammeDto dto);
        Task<StudyProgramme> Post(StudyProgrammeDto dto);
    }
}
