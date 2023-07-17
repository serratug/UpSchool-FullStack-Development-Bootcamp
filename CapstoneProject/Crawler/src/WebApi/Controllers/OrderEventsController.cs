using Application.Features.OrderEvents.Commands.Add;
using Application.Features.OrderEvents.Queries.GetAll;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Authorize]
public class OrderEventsController : ApiControllerBase
{
    [HttpPost("Add")]
    public async Task<IActionResult> AddAsync(OrderEventAddCommand command)
    {
        return Ok(await Mediator.Send(command));
    }
    
    [HttpPost("GetAll")]
    public async Task<IActionResult> GetAllAsync(OrderEventGetAllQuery query)
    {
        return Ok(await Mediator.Send(query));
    }
}