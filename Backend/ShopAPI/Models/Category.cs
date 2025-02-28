using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Category
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Initialize with a GUID by default

        [Required]
        public string Name { get; set; } = string.Empty; // Initialize with default value

        public string Description { get; set; } = string.Empty; // Initialize with default value

        public List<Product> Products { get; set; } = new(); // Initialize with an empty list
    }
}