using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Models
{
    public class ProductVariation
    {
        public int Id { get; set; }

        [Required]
        public string OptionName { get; set; } // e.g., "Size", "Color", etc.

        [Required]
        public string OptionValue { get; set; } // e.g., "Large", "Red", etc.

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; } // Optional: Override base product price.

        // Individual stock count for this variation.
        public int StockQuantity { get; set; }

        // Images for this variation.
        public List<string> Images { get; set; }

        // Foreign Key to the main Product
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
