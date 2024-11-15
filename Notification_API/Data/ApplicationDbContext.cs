using Microsoft.EntityFrameworkCore;
using Notification_API.Model;
using System.Collections.Generic;

namespace Notification_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Notification> Notifications { get; set; }
    }
}
