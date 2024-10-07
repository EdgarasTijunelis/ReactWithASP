using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;

namespace ReactWithASP.Server.Services;
    public class GroupServices(AppDbContext context) : IGroupServices
    {
        private GroupDto MapDto(Group group)
        => new GroupDto(group.Id, group.GroupName);
        public async Task<List<GroupDto>> GetAll()
        {
            var groups = await context.Groups.ToListAsync();
            List<GroupDto> results = [];

            foreach (var group in groups)
            {
                results.Add(MapDto(group));
            }
            return results;
        }
        public async Task<GroupDto> Get(int id)
        {
            var group = await context.Groups.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(group);
        }
        public async Task Store(GroupDto dto)
        {
            var group = new Group(dto.GroupName);
            context.Groups.Add(group);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, GroupDto dto)
        {
            var group = await context.Groups.FirstOrDefaultAsync(i => i.Id == id);
            if (group != null)
            {
                group.SetValues(dto.GroupName);
                context.Groups.Update(group);
                await context.SaveChangesAsync();
            }
        }
        public async Task<Group> Post(GroupDto dto)
        {
            var group = new Group(dto.GroupName);
            context.Groups.Add(group);
            await context.SaveChangesAsync();
            return group;
        }
        public async Task<bool> Delete(int id)
        {

            var group = await context.Groups.FindAsync(id);
            if (group == null)
            {
                return false;
            }
            context.Groups.Remove(group);
            await context.SaveChangesAsync();
            return true;
        }
    }

