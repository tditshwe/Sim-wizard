using SimWizardApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace SimWizardApi
{
    public class DashboardContext: DbContext
    {
        public DbSet<Service> Service { get; set; }
        public DbSet<Task> Task { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-JQQNVO0\SQLEXPRESS;Initial Catalog=SimWizard;Integrated Security=True;MultipleActiveResultSets=True");
        }
    }
}