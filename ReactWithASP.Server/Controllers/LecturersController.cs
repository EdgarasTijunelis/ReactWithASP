using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;
using ReactWithASP.Server.Services;

namespace ReactWithASP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class LecturersController(ILecturerServices LecturerServices) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await LecturerServices.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, LecturerDto dto)
    {
        await LecturerServices.Update(id, dto);
        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> Post(LecturerDto dto)
    {
        await LecturerServices.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool success = await LecturerServices.Delete(id);
        if (!success)
        {
            return NotFound($"Lecturer with ID {id} not found.");
        }
        return NoContent();
    }
}

