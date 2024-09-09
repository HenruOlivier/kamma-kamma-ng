using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class ProductVariation
    {
        public int Id { get; set; }

        [Required]
        public string OptionName { get; set; } = string.Empty; // Initialize with default value

        [Required]
        public string OptionValue { get; set; } = string.Empty; // Initialize with default value

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public int StockQuantity { get; set; }

        public List<Image> Images { get; set; } = new(); // Initialize with an empty list

        [Required]
        public int ProductId { get; set; }

        public Product Product { get; set; } = new(); // Initialize with default value
    }
}
