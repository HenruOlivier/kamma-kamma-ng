using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class ProductVariation
    {
        public int Id { get; set; }

        [Required]
        public string OptionName { get; set; } // e.g., "Size", "Color"

        [Required]
        public string OptionValue { get; set; } // e.g., "Large", "Red"

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public int StockQuantity { get; set; }

        public List<string> Images { get; set; } = new();

        // Foreign key to the main Product
        [Required]
        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}
