using HelloApp.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace HelloApp.Web.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Greeting> Greetings => Set<Greeting>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Greeting>(entity =>
        {
            entity.HasKey(g => g.Id);
            entity.Property(g => g.Message).HasMaxLength(256).IsRequired();
            entity.HasData(new Greeting
            {
                Id = 1,
                Message = "Hello from PostgreSQL",
                CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.Id);
            entity.Property(o => o.ProductName).HasMaxLength(128).IsRequired();
            entity.Property(o => o.Status).HasMaxLength(32).IsRequired();
            entity.HasIndex(o => o.CreatedAt);
        });
    }
}
