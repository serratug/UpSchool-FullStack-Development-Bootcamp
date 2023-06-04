using Application.Common.Interfaces;
using Application.Common.Models.Settings;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers;

public class NotificationSettingsController : ApiControllerBase
{
    private readonly IApplicationDbContext _applicationDbContext;

    public NotificationSettingsController(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    [HttpPost("Add")]
    public async Task<IActionResult> AddAsync(NotificationSettingsDto settingsDto, CancellationToken cancellationToken)
    {
        var settings = new NotificationSettings()
        {
            PushNotification = settingsDto.PushNotification,
            EmailNotification = settingsDto.EmailNotification,
            EmailAddress = settingsDto.EmailAddress
        };
        
        await _applicationDbContext.NotificationSettings.AddAsync(settings, cancellationToken);
        
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        
        return Ok(settings);
    }
    
    [HttpPut("Update")]
    public IActionResult Update(NotificationSettingsDto settingsDto)
    {
        var settings = _applicationDbContext.NotificationSettings.FirstOrDefaultAsync(x => x.Id == 1).Result;

        // Notification settings created for the first time
        if (settings is null)
        {
            settings = new NotificationSettings()
            {
                PushNotification = settingsDto.PushNotification,
                EmailNotification = settingsDto.EmailNotification,
                EmailAddress = settingsDto.EmailAddress
            };
            _applicationDbContext.NotificationSettings.Add(settings);
        }
        else
        {
            settings.PushNotification = settingsDto.PushNotification;
            settings.EmailNotification = settingsDto.EmailNotification;
            settings.EmailAddress = settingsDto.EmailAddress;

            _applicationDbContext.NotificationSettings.Update(settings);
        }

        _applicationDbContext.SaveChanges();
        
        return Ok(settings);
    }
    
    [HttpGet("GetFirst")]
    public async Task<IActionResult> GetFirst()
    {
        var settings = await _applicationDbContext.NotificationSettings.FirstOrDefaultAsync();

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