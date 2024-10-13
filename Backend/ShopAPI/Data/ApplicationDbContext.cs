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

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Sample Product 1", Description = "Sample description", Price = 10.99m, StockQuantity = 100, IsHireable = true, IsForSale = false },
                new Product { Id = 2, Name = "Sample Product 2", Description = "Another sample description", Price = 20.50m, StockQuantity = 200, IsHireable = false, IsForSale = true }
            );

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics", Description = "Electronic gadgets and devices" },
                new Category { Id = 2, Name = "Clothing", Description = "Apparels and fashion wear" }
            );

            // Seed Product-Category relationships (many-to-many)
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Products)
                .UsingEntity(j => j.HasData(
                    new { ProductsId = 1, CategoriesId = 1 },
                    new { ProductsId = 2, CategoriesId = 2 }
                ));
        }
    }
}
