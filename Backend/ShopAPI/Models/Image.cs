using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        public string Url { get; set; } = string.Empty;  // Initialize non-nullable property

        public string Description { get; set; } = string.Empty;  // Initialize non-nullable property
    }

}