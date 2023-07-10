using Application.Features.Orders.Commands.Add;
using Application.Features.Orders.Commands.Remove;
using Application.Features.Orders.Commands.Update;
using Application.Features.Orders.Queries.GetAll;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers;

[Authorize]
public class OrdersController : ApiControllerBase
{
    [HttpPost("Add")]
    public async Task<IActionResult> AddAsync(OrderAddCommand command)
    {
        return Ok(await Mediator.Send(command));
    }
    
    [HttpPost("Update")]
    public async Task<IActionResult> UpdateAsync(OrderUpdateCommand command)
    {
        return Ok(await Mediator.Send(command));
    }
    
    [HttpPost("Remove")]
    public async Task<IActionResult> RemoveAsync(OrderRemoveCommand command)
    {
        return Ok(await Mediator.Send(command));
    }
    
    [HttpPost("GetAll")]
    public async Task<IActionResult> GetAllAsync([FromBody] OrderGetAllQuery query)
    {
        return Ok(await Mediator.Send(query));
    }
}