using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Models
{
    public class ShippingOption
    {
        public int Id { get; set; }

        [Required]
        public string Method { get; set; } // e.g., "Standard", "Express", etc.

        [Range(0.01, double.MaxValue)]
        public decimal Rate { get; set; }

        // Estimated delivery time for this shipping option.
        [Required]
        public string EstimatedDeliveryTime { get; set; } // e.g., "3-5 Business Days"

        // Foreign Key to Warehouse
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}