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

        // Quantity is only relevant if the product is sold (and not hireable).
        public int? Quantity { get; set; }

        // Indicates if the product is available for hire (renting).
        public bool IsHireable { get; set; }

        // Images for this product.
        public List<string> Images { get; set; }

        // Stock count for this product.
        public int StockQuantity { get; set; }

        // Each product can belong to multiple categories.
        public List<Category> Categories { get; set; }

        // Product variations (e.g., different sizes or colors).
        public List<ProductVariation> Variations { get; set; }

        // Link to the warehouse where this product is stored.
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }

        // Images for the main product (if no variations exist).
        public List<string> Images { get; set; }
    }
}
