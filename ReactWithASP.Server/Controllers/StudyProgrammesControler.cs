using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;
using ReactWithASP.Server.Services;

namespace ReactWithASP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class StudyProgrammesController(IProgrammeServices ProgrammeServices):ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await ProgrammeServices.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, StudyProgrammeDto dto)
    {
        await ProgrammeServices.Update(id, dto);
        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> Post(StudyProgrammeDto dto)
    {
        await ProgrammeServices.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool success = await ProgrammeServices.Delete(id);
        if (!success)
        {
            return NotFound($"Subject with ID {id} not found.");
        }
        return NoContent();
    }

}

