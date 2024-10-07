using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;


namespace ReactWithASP.Server.Services;
    public class ProgrammeServices(AppDbContext context): IProgrammeServices
    {
        private StudyProgrammeDto MapDto(StudyProgramme studyProgramme)
      => new StudyProgrammeDto(studyProgramme.Id, studyProgramme.ProgName);
        public async Task<List<StudyProgrammeDto>> GetAll()
        {
            var studyProgrammes = await context.StudyProgrammes.ToListAsync();
            List<StudyProgrammeDto> results = [];

            foreach (var studyProgramme in studyProgrammes)
            {
                results.Add(MapDto(studyProgramme));
            }
            return results;
        }
        public async Task<StudyProgrammeDto> Get(int id)
        {
            var studyProgramme = await context.StudyProgrammes.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(studyProgramme);
        }
        public async Task Store(StudyProgrammeDto dto)
        {
            var studyProgramme = new StudyProgramme(dto.ProgName);
            context.StudyProgrammes.Add(studyProgramme);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, StudyProgrammeDto dto)
        {
            var studyProgramme = await context.StudyProgrammes.FirstOrDefaultAsync(i => i.Id == id);
            if (studyProgramme != null)
            {
                studyProgramme.SetValues(dto.ProgName);
                context.StudyProgrammes.Update(studyProgramme);
                await context.SaveChangesAsync();
            }
        }
        public async Task<StudyProgramme> Post(StudyProgrammeDto dto)
        {
            var studyProgramme = new StudyProgramme(dto.ProgName);
            context.StudyProgrammes.Add(studyProgramme);
            await context.SaveChangesAsync();
            return studyProgramme;
        }
        public async Task<bool> Delete(int id)
        {

            var studyProgramme = await context.StudyProgrammes.FindAsync(id);
            if (studyProgramme == null)
            {
                return false;
            }
            context.StudyProgrammes.Remove(studyProgramme);
            await context.SaveChangesAsync();
            return true;
        }
    }

