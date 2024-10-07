using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Models.Entities
{
    public class Group(string groupName):Entity<int>
    {
        [MaxLength(30)] public string GroupName { get; private set; } = groupName;
        public void SetValues(string groupName) => (GroupName) = (groupName);

    }
}
