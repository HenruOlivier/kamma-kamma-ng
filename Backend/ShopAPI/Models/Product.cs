using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Product
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();  // Initialize with a GUID by default

        [Required]
        public string Name { get; set; } = string.Empty; // Initialize with default value

        public string SKU { get; set; } = string.Empty; // Initialize with default value

        public string Description { get; set; } = string.Empty; // Initialize with default value

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public bool IsHireable { get; set; }

        public bool IsForSale { get; set; }

        public int StockQuantity { get; set; }

        public List<Category> Categories { get; set; } = new(); // Initialize with an empty list

        public List<ProductVariation> Variations { get; set; } = new(); // Initialize with an empty list

        public List<Image> Images { get; set; } = new(); // Initialize with an empty list
    }

}
