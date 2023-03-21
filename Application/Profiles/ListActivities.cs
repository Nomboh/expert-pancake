using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activityAttendee = _context.ActivityAttendees
                    .Where(aa => aa.AppUser.UserName == request.Username)
                    .OrderBy(x => x.Activity.Date)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "past":
                        activityAttendee = activityAttendee
                            .Where(aa => aa.Date <= DateTime.UtcNow);
                        break;

                    case "hosting":
                        activityAttendee = activityAttendee
                            .Where(aa =>
                                aa.HostUsername == request.Username);
                        break;

                    default:
                        activityAttendee = activityAttendee
                            .Where(aa =>
                                aa.Date >= DateTime.UtcNow);
                        break;
                }

                var activities = await activityAttendee.ToListAsync();

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}