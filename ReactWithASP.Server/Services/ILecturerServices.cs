using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;


namespace ReactWithASP.Server.Services
{
        public interface ILecturerServices
        {
            Task<List<LecturerDto>> GetAll();
            Task<LecturerDto> Get(int id);
            Task<bool> Delete(int id);
            Task Store(LecturerDto dto);
            Task Update(int id, LecturerDto dto);
            Task<Lecturer> Post(LecturerDto dto);
        }
}
