using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Models
{
    public class ShippingOption
    {
        public int Id { get; set; }

        [Required]
        public string Method { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Rate { get; set; }

        [Required]
        public string EstimatedDeliveryTime { get; set; }

        // Foreign key to Warehouse
        [Required]
        public int WarehouseId { get; set; }

        public Warehouse Warehouse { get; set; }
    }
}