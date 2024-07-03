using Microsoft.EntityFrameworkCore;
using WebAPICrud.Models;

namespace WebAPICrud.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Noticias> Noticias { get; set; }
        public DbSet<Pruebas> Pruebas { get; set; }
    }
}
