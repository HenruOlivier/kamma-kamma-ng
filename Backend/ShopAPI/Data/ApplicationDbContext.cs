using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;
using System;

namespace ShopAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariation> ProductVariations { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ShippingOption> ShippingOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ProductVariation>()
                .Property(pv => pv.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ShippingOption>()
                .Property(so => so.Rate)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Products);

            base.OnModelCreating(modelBuilder);

            // Seed Products with string Id
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = "PRD001", Name = "Sample Product 1", SKU = "PR01", Description = "Sample description", Price = 10.99m, StockQuantity = 100, IsHireable = true, IsForSale = false },
                new Product { Id = "PRD002", Name = "Sample Product 2", SKU = "PR014", Description = "Another sample description", Price = 20.50m, StockQuantity = 200, IsHireable = false, IsForSale = true }
            );

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics", Description = "Electronic gadgets and devices" },
                new Category { Id = 2, Name = "Clothing", Description = "Apparels and fashion wear" }
            );

            // Seed Product-Category relationships
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Products)
                .UsingEntity(j => j.HasData(
                    new { ProductsId = "PRD001", CategoriesId = 1 },
                    new { ProductsId = "PRD002", CategoriesId = 2 }
                ));
        }
    }
}
