using SimWizardApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace SimWizardApi
{
    public class DashboardContext: DbContext
    {
        public DbSet<Service> Service { get; set; }
        public DbSet<Task> Task { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder().AddJsonFile(Directory.GetCurrentDirectory() + "\\appsettings.json");
            IConfigurationRoot config = builder.Build();

            optionsBuilder.UseSqlServer(config["ConnectionString"]);
        }
    }
}