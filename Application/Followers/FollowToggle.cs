using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Observer = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var Target = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == request.TargetUsername);

                if (Target == null) return null;

                var following = await _context.UserFollowings.FindAsync(Observer.Id, Target.Id);

                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Target = Target,
                        Observer = Observer

                    };

                    _context.UserFollowings.Add(following);

                }
                else
                {
                    _context.UserFollowings.Remove(following);
                }


                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Sorry an error occured during following");
            }
        }
    }
}