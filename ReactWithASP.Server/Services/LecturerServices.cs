using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services;


    public class LecturerServices(AppDbContext context) : ILecturerServices
    {
    private LecturerDto MapDto(Lecturer lecturer)
    => new LecturerDto(lecturer.Id, lecturer.FullName, lecturer.Email);
    public async Task<List<LecturerDto>> GetAll()
    {
        var lecturers = await context.Lecturers.ToListAsync();
        List<LecturerDto> results = [];

        foreach (var lecturer in lecturers)
        {
            results.Add(MapDto(lecturer));
        }
        return results;
    }
    public async Task<LecturerDto> Get(int id)
    {
        var lecturer = await context.Lecturers.FirstOrDefaultAsync(i => i.Id == id);
        return MapDto(lecturer);
    }
    public async Task Store(LecturerDto dto)
    {
        var lecturer = new Lecturer(dto.FullName,dto.Email);
        context.Lecturers.Add(lecturer);
        await context.SaveChangesAsync();
    }

    public async Task Update(int id, LecturerDto dto)
    {
        var lecturer = await context.Lecturers.FirstOrDefaultAsync(i => i.Id == id);
        if (lecturer != null)
        {
            lecturer.SetValues(dto.FullName, dto.Email);
            context.Lecturers.Update(lecturer);
            await context.SaveChangesAsync();
        }
    }
    public async Task<Lecturer> Post(LecturerDto dto)
    {
        var lecturer = new Lecturer(dto.FullName, dto.Email);
        context.Lecturers.Add(lecturer);
        await context.SaveChangesAsync();
        return lecturer;
    }
    public async Task<bool> Delete(int id)
        {

            var lecturer = await context.Lecturers.FindAsync(id);
            if (lecturer == null)
            {
                return false;
            }
            context.Lecturers.Remove(lecturer);
            await context.SaveChangesAsync();
            return true;
        }

    }


