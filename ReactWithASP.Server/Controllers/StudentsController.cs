using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;
using ReactWithASP.Server.Services;

namespace ReactWithASP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]


public class StudentsController(IGetStudentService getStudentService, ISaveStudentService saveStudentService, IDeleteStudentService deleteStudentService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getStudentService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Put(int id, StudentDto dto)
    {
        await saveStudentService.Update(id, dto);
        return Ok();
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Post(StudentDto dto)
    {
        await saveStudentService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        bool success = await deleteStudentService.Delete(id);
        if (!success)
        {
            return NotFound($"Student with ID {id} not found.");
        }
        return NoContent(); 
    }
}


