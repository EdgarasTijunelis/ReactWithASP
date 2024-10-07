using ReactWithASP.Server.Data;

namespace ReactWithASP.Server.Services
{
    public class DeleteStudentService(AppDbContext context) : IDeleteStudentService
    {

        public async Task<bool> Delete(int id)
        {
            var student = await context.Students.FindAsync(id);
            if (student == null)
            {
                return false;  
            }
            context.Students.Remove(student);
            await context.SaveChangesAsync();
            return true; 
        }
    }
}
