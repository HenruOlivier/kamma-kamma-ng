using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Warehouse
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        // Products stored in this warehouse.
        public List<Product> Products { get; set; }

        // Shipping options available for this warehouse.
        public List<ShippingOption> ShippingOptions { get; set; }
    }
}
