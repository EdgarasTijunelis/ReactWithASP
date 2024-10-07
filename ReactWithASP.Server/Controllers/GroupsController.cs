using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Models.DTOs;
using ReactWithASP.Server.Models.Entities;
using ReactWithASP.Server.Services;

namespace ReactWithASP.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class GroupsController(IGroupServices GroupServices):ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await GroupServices.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, GroupDto dto)
    {
        await GroupServices.Update(id, dto);
        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> Post(GroupDto dto)
    {
        await GroupServices.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool success = await GroupServices.Delete(id);
        if (!success)
        {
            return NotFound($"Group with ID {id} not found.");
        }
        return NoContent();
    }
}

