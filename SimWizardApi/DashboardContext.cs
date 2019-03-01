using SimWizardApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SimWizardApi
{
    public class DashboardContext: DbContext
    {
        public DbSet<Service> Service { get; set; }
        public DbSet<Task> Task { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=CEN_KGOTHATSOD1\SQLEXPRESS;Initial Catalog=Dashboard;Integrated Security=True;MultipleActiveResultSets=True");
        }
    }
}