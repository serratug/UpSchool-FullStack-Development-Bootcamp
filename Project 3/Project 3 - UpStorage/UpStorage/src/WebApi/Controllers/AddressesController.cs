using Application.Features.Addresses.Commands.Add;
using Application.Features.Addresses.Commands.Delete;
using Application.Features.Addresses.Commands.HardDelete;
using Application.Features.Addresses.Commands.Update;
using Application.Features.Addresses.Queries.GetAll;
using Application.Features.Addresses.Queries.GetById;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

public class AddressesController : ApiControllerBase
{
    [HttpPost("GetAll")]
    public async Task<IActionResult> GetAllAsync(AddressGetAllQuery query)
    {
        return Ok(await Mediator.Send(query));
    }
    
    [HttpGet("GetById/{id}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        return Ok(await Mediator.Send(new AddressGetByIdQuery(id,null)));
    }
    
    [HttpPost("Add")]
    public async Task<IActionResult> AddAsync(AddressAddCommand command)
    {

        return Ok(await Mediator.Send(command));
    }
    
    [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateAsync(Guid id, AddressUpdateCommand command)
    {
        command.Id = id;
        return Ok(await Mediator.Send(command));
    }
    
    [HttpPut("Delete/{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id, AddressDeleteCommand command)
    {
        command.Id = id;
        return Ok(await Mediator.Send(command));
    }
    
    [HttpDelete("HardDelete/{id}")]
    public async Task<IActionResult> HardDeleteAsync(Guid id, AddressHardDeleteCommand command)
    {
        command.Id = id;
        return Ok(await Mediator.Send(command));
    }

}