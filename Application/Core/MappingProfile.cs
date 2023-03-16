using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
            .ForMember(ato => ato.HostUsername, x => x
                .MapFrom(x => x.Attendees.FirstOrDefault(a => a.IsHost).AppUser.UserName));
            
            CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(x => x.DisplayName, y => y.MapFrom(x => x.AppUser.DisplayName))
            .ForMember(x => x.Bio, y => y.MapFrom(x => x.AppUser.Bio))
            .ForMember(x => x.Username, y => y.MapFrom(x => x.AppUser.UserName))
            .ForMember(x => x.Image, y => y.MapFrom(x => x.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));


            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(x => x.Image, o => o.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Comment, CommentDto>()
            .ForMember(x => x.DisplayName, y => y.MapFrom(x => x.Author.DisplayName))
            .ForMember(x => x.Username, y => y.MapFrom(x => x.Author.UserName))
            .ForMember(x => x.Image, y => y.MapFrom(x => x.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}