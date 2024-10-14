using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ShopAPI.Models
{
    public class Image
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();  // Initialize with a GUID by default

        [Required]
        public string Url { get; set; } = string.Empty;  // Initialize non-nullable property

        public string Description { get; set; } = string.Empty;  // Initialize non-nullable property
    }
}
