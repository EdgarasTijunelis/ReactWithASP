namespace ReactWithASP.Server.Models.DTOs
{
    public record AuthDto(bool isAuthenticated, string? Message, string? Username= "", string? Email= "", string? Role= "");
}
