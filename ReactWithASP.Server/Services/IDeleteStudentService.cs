namespace ReactWithASP.Server.Services
{
    public interface IDeleteStudentService
    {
        Task<bool> Delete(int id);
    }
}
