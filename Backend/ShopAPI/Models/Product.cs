using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty; // Initialize with default value

        public string Description { get; set; } = string.Empty; // Initialize with default value

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public int? Quantity { get; set; }

        public bool IsHireable { get; set; }

        public int StockQuantity { get; set; }

        public List<Category> Categories { get; set; } = new(); // Initialize with an empty list

        public List<ProductVariation> Variations { get; set; } = new(); // Initialize with an empty list

        [Required]
        public int WarehouseId { get; set; }

        // Remove the default initialization here
        public Warehouse? Warehouse { get; set; }

        public List<Image> Images { get; set; } = new(); // Initialize with an empty list
    }

}
