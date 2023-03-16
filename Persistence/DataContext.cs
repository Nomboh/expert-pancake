using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>()
            .HasKey(aa => new {aa.ActivityId, aa.AppUserId});

            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(aa => aa.Attendees)
            .HasForeignKey(a => a.ActivityId);

            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.AppUser)
            .WithMany(aa => aa.Activities)
            .HasForeignKey(a => a.AppUserId);

            builder.Entity<Comment>()
            .HasOne(c => c.Activity)
            .WithMany(a => a.Comments)
            .OnDelete(DeleteBehavior.Restrict);
            
            
        }
    }
}