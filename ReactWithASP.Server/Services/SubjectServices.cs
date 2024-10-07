using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services
{
    public class SubjectServices(AppDbContext context): ISubjectServices
    {

        private SubjectDto MapDto(Subject subject)
   => new SubjectDto(subject.Id, subject.SubjName);
        public async Task<List<SubjectDto>> GetAll()
        {
            var subjects = await context.Subjects.ToListAsync();
            List<SubjectDto> results = [];

            foreach (var subject in subjects)
            {
                results.Add(MapDto(subject));
            }
            return results;
        }
        public async Task<SubjectDto> Get(int id)
        {
            var subject = await context.Subjects.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(subject);
        }
        public async Task Store(SubjectDto dto)
        {
            var subject = new Subject(dto.SubjName);
            context.Subjects.Add(subject);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, SubjectDto dto)
        {
            var subject = await context.Subjects.FirstOrDefaultAsync(i => i.Id == id);
            if (subject != null)
            {
                subject.SetValues(dto.SubjName);
                context.Subjects.Update(subject);
                await context.SaveChangesAsync();
            }
        }
        public async Task<Subject> Post(SubjectDto dto)
        {
            var subject = new Subject(dto.SubjName);
            context.Subjects.Add(subject);
            await context.SaveChangesAsync();
            return subject;
        }
        public async Task<bool> Delete(int id)
        {

            var subject = await context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return false;
            }
            context.Subjects.Remove(subject);
            await context.SaveChangesAsync();
            return true;
        }
    }
}
