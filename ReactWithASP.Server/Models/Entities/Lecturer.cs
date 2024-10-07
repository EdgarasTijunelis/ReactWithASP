using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Models.Entities;

public class Lecturer(string fullName, string email): Entity<int>
{
    [MaxLength(30)] public string FullName { get; private set; } = fullName;
    [MaxLength(40)] public string Email { get; private set; } = email;
    public void SetValues(string fullName, string email) => (FullName, Email) = (fullName, email);

}
