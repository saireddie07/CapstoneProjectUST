using FeedbackAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FeedbackAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
