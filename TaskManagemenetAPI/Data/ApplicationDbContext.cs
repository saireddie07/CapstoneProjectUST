using Microsoft.EntityFrameworkCore;
using TaskManagemenetAPI.Model;

namespace TaskManagemenetAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<TaskDetails> Tasks { get; set; }
    }

}
