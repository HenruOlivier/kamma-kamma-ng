using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

namespace ShopAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for all entities
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariation> ProductVariations { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ShippingOption> ShippingOptions { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Decimal precision for Product.Price
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2); // 18 digits in total, 2 digits after the decimal

            // Decimal precision for ProductVariation.Price
            modelBuilder.Entity<ProductVariation>()
                .Property(pv => pv.Price)
                .HasPrecision(18, 2);

            // Decimal precision for ShippingOption.Rate
            modelBuilder.Entity<ShippingOption>()
                .Property(so => so.Rate)
                .HasPrecision(18, 2);

            // Define many-to-many relationship for Product and Category
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Products);

            base.OnModelCreating(modelBuilder);
        }
    }
}
