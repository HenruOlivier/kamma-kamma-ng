using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class ProductVariation
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Initialize with a GUID by default

        [Required]
        public string OptionName { get; set; } = string.Empty; // Initialize with default value

        [Required]
        public string OptionValue { get; set; } = string.Empty; // Initialize with default value

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public int StockQuantity { get; set; }

        public List<Image> Images { get; set; } = new(); // Initialize with an empty list

        [Required]
        public string ProductId { get; set; } // Update to string to match Product's Id type

        public Product Product { get; set; } = new(); // Initialize with default value
    }
}
