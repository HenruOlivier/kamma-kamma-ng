using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public int? Quantity { get; set; }

        public bool IsHireable { get; set; }

        public int StockQuantity { get; set; }

        // Product categories (many-to-many relationship).
        public List<Category> Categories { get; set; } = new();

        // Product variations (e.g., sizes, colors).
        public List<ProductVariation> Variations { get; set; } = new();

        // Foreign key to Warehouse
        [Required] // Warehouse is mandatory
        public int WarehouseId { get; set; }

        public Warehouse Warehouse { get; set; }

        // List of product images
        public List<Image> Images { get; set; } = new();
    }
}

