using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services;

public interface ISaveStudentService
{
    Task Store(StudentDto dto);
    Task Update(int id, StudentDto dto);
    Task <Student> Post(StudentDto dto);
}
