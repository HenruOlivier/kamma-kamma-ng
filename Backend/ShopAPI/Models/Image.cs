using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }

        // Foreign key to the Product
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}