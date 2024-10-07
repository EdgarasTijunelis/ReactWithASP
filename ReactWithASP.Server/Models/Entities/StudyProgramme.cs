using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Models.Entities
{
    public class StudyProgramme(string progName):Entity<int>
    {
        [MaxLength(50)] public string ProgName { get; private set; } = progName;
        public void SetValues(string progName) => (ProgName) = (progName);
    }
}
