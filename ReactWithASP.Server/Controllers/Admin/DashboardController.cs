using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;
using ReactWithASP.Server.Data.Consts;
using ReactWithASP.Server.Services;

namespace ReactWithASP.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = UserRoles.Admin)]

public class DashboardController(IGetUserService getUserService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getUserService.GetAll();
        return Ok(results);
    }
    public IActionResult Show()
        => Ok(new { text = "You logged to dashboard!" });
}
