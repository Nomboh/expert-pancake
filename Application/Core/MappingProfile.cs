using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
            .ForMember(ato => ato.HostUsername, x => x
                .MapFrom(x => x.Attendees.FirstOrDefault(a => a.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(x => x.DisplayName, y => y.MapFrom(x => x.AppUser.DisplayName))
            .ForMember(x => x.Bio, y => y.MapFrom(x => x.AppUser.Bio))
            .ForMember(x => x.Username, y => y.MapFrom(x => x.AppUser.UserName))
            .ForMember(x => x.Image, y => y.MapFrom(x => x.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(x => x.FollowerCount, x => x.MapFrom(x => x.AppUser.Followers.Count))
            .ForMember(x => x.FollowingCount, x => x.MapFrom(x => x.AppUser.Followings.Count))
            .ForMember(x => x.Following, x => x.MapFrom(x => x.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<ActivityAttendee, Profiles.UserActivityDto>()
            .ForMember(x => x.HostUsername, x => x.MapFrom(x => x.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName))
            .ForMember(x => x.Category, x => x.MapFrom(x => x.Activity.Category))
            .ForMember(x => x.Title, x => x.MapFrom(x => x.Activity.Title))
            .ForMember(x => x.Id, x => x.MapFrom(x => x.Activity.Id))
            .ForMember(x => x.Date, x => x.MapFrom(x => x.Activity.Date));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(x => x.Image, o => o.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(x => x.FollowerCount, x => x.MapFrom(x => x.Followers.Count))
            .ForMember(x => x.FollowingCount, x => x.MapFrom(x => x.Followings.Count))
            .ForMember(x => x.Following, x => x.MapFrom(x => x.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>()
            .ForMember(x => x.DisplayName, y => y.MapFrom(x => x.Author.DisplayName))
            .ForMember(x => x.Username, y => y.MapFrom(x => x.Author.UserName))
            .ForMember(x => x.Image, y => y.MapFrom(x => x.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}