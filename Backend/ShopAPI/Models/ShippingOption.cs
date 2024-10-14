using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Models
{
    public class ShippingOption
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Initialize with a GUID by default

        [Required]
        public string Method { get; set; } = string.Empty; // Initialize with default value

        [Range(0.01, double.MaxValue)]
        public decimal Rate { get; set; }

        [Required]
        public string EstimatedDeliveryTime { get; set; } = string.Empty; // Initialize with default value
    }
}
