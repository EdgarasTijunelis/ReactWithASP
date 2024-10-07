using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;
using ReactWithASP.Server.Services;

namespace ReactWithASP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SubjectsController(ISubjectServices SubjectServices):ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await SubjectServices.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, SubjectDto dto)
    {
        await SubjectServices.Update(id, dto);
        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> Post(SubjectDto dto)
    {
        await SubjectServices.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool success = await SubjectServices.Delete(id);
        if (!success)
        {
            return NotFound($"Subject with ID {id} not found.");
        }
        return NoContent();
    }
}

