using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        // Products in this category (many-to-many relationship)
        public List<Product> Products { get; set; } = new();
    }
}