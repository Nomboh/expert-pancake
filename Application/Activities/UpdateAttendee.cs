using MediatR;
using Application.Core;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities
{
    public class UpdateAttendee
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                var activity = await _context.Activities
                    .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(activity == null) return null;


                var hostUsername = activity.Attendees.FirstOrDefault(x => 
                    x.IsHost == true)?.AppUser.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => 
                    x.AppUser.UserName == user.UserName);

                if(attendance != null && hostUsername == user.UserName){
                    activity.IsCancelled = !activity.IsCancelled;
                }

                if(attendance != null && hostUsername != user.UserName){
                    activity.Attendees.Remove(attendance);
                }
                
                if(attendance == null){
                    attendance = new ActivityAttendee{
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result 
                    ? Result<Unit>.Success(Unit.Value) 
                    : Result<Unit>.Failure("Sorry we could not update attendee");
        
            }
        }
    }
}