using Application.Common.Interfaces;
using Application.Common.Models.Settings;
using Domain.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers;

[Authorize]
public class NotificationSettingsController : ApiControllerBase
{
    private readonly IApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;

    public NotificationSettingsController(IApplicationDbContext applicationDbContext, ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
    }

    [HttpPut("Update")]
    public IActionResult Update(NotificationSettingsDto settingsDto)
    {
        var settings = _applicationDbContext.NotificationSettings
            .FirstOrDefaultAsync(x => x.UserId ==  _currentUserService.UserId).Result;

        settings.PushNotification = settingsDto.PushNotification;
        settings.EmailNotification = settingsDto.EmailNotification;
        settings.EmailAddress = settingsDto.EmailAddress;

        _applicationDbContext.NotificationSettings.Update(settings);

        _applicationDbContext.SaveChanges();
        
        return Ok(settings);
    }
    
    [HttpGet("GetByUserId")]
    public async Task<IActionResult> GetByUserId()
    {
        var settings = _applicationDbContext.NotificationSettings
            .FirstOrDefaultAsync(x => x.UserId ==  _currentUserService.UserId).Result;

        if (settings is null) return BadRequest();

        var settingsDto = new NotificationSettingsDto()
        {
            PushNotification = settings.PushNotification,
            EmailNotification = settings.EmailNotification,
            EmailAddress = settings.EmailAddress
        };

        return Ok(settingsDto);
    }
}