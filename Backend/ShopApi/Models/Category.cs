using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        // A description of the category.
        public string Description { get; set; }

        // Products that belong to this category.
        public List<Product> Products { get; set; }
    }
}