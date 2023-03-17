using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profiles.Profile>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handle : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handle(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }

            async Task<Result<List<Profiles.Profile>>> IRequestHandler<Query, Result<List<Profiles.Profile>>>.Handle(Query request, CancellationToken cancellationToken)
            {
                var followers = new List<Profiles.Profile>();

                switch (request.Predicate)
                {
                    case "followers":
                        followers = await _context.UserFollowings
                            .Where(x => x.Target.UserName == request.Username)
                            .Select(x => x.Observer)
                            .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                            .ToListAsync(cancellationToken);
                        break;

                    case "following":
                        followers = await _context.UserFollowings
                            .Where(x => x.Observer.UserName == request.Username)
                            .Select(x => x.Target)
                            .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                            .ToListAsync(cancellationToken);
                        break;

                }

                return Result<List<Profiles.Profile>>.Success(followers);
            }
        }
    }
}