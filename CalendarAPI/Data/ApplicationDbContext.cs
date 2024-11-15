using CalendarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CalendarAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
    }
}
