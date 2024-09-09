using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Warehouse
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty; // Initialize with default value

        [Required]
        public string Location { get; set; } = string.Empty; // Initialize with default value

        public List<Product> Products { get; set; } = new(); // Initialize with an empty list

        public List<ShippingOption> ShippingOptions { get; set; } = new(); // Initialize with an empty list
    }
}
