using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement: IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContext;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
            _dbContext = dbContext;
            
        }

        protected override  Task HandleRequirementAsync(AuthorizationHandlerContext context,
         IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId is null) return Task.CompletedTask;

            var activityId = Guid.Parse( _httpContext.HttpContext?.Request.RouteValues
                .SingleOrDefault(a => a.Key == "id").Value.ToString());


            var attendee = _dbContext.ActivityAttendees.AsNoTracking()
                .FirstOrDefaultAsync(x => x.ActivityId == activityId && x.AppUserId == userId).Result;

            if(attendee == null) return Task.CompletedTask;

            if(attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}