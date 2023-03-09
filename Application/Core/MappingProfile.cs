using Application.Activities;
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
            
            CreateMap<ActivityAttendee, Profiles.Profile>()
            .ForMember(x => x.DisplayName, y => y.MapFrom(x => x.AppUser.DisplayName))
            .ForMember(x => x.Bio, y => y.MapFrom(x => x.AppUser.Bio))
            .ForMember(x => x.Username, y => y.MapFrom(x => x.AppUser.UserName));
        }
    }
}