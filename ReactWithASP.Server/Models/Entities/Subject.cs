using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Models.Entities
{
    public class Subject(string subjName): Entity<int>
    {
        [MaxLength(30)] public string SubjName { get; private set; } = subjName;
        public void SetValues (string subjName) => (SubjName) = (subjName); 
    }
}
