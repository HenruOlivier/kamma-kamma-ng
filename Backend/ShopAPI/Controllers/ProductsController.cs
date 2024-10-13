// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using ShopAPI.Data;
// using ShopAPI.Models;

// namespace ShopAPI.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class ProductsController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//         public ProductsController(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // GET: api/Products
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
//         {
//             return await _context.Products.ToListAsync();
//         }

//         // GET: api/Products/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Product>> GetProduct(int id)
//         {
//             var product = await _context.Products.FindAsync(id);

//             if (product == null)
//             {
//                 return NotFound();
//             }

//             return product;
//         }

//         // POST: api/Products
//         [HttpPost]
//         public async Task<ActionResult<Product>> PostProduct(Product product)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState);
//             }

//             _context.Products.Add(product);
//             await _context.SaveChangesAsync();

//             return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
//         }

//         // PUT: api/Products/5
//         [HttpPut("{id}")]
//         public async Task<IActionResult> PutProduct(int id, Product product)
//         {
//             if (id != product.Id)
//             {
//                 return BadRequest("Product ID mismatch.");
//             }

//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState);
//             }

//             _context.Entry(product).State = EntityState.Modified;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!ProductExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }

//             return NoContent();
//         }

//         // DELETE: api/Products/5
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteProduct(int id)
//         {
//             var product = await _context.Products.FindAsync(id);
//             if (product == null)
//             {
//                 return NotFound();
//             }

//             _context.Products.Remove(product);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool ProductExists(int id)
//         {
//             return _context.Products.Any(e => e.Id == id);
//         }
//     }
// }


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // Include related entities if needed (e.g., Categories, Variations, Images)
            return await _context.Products
                .Include(p => p.Categories)
                .Include(p => p.Variations)
                .Include(p => p.Images)
                .ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // Include related entities if needed
            var product = await _context.Products
                .Include(p => p.Categories)
                .Include(p => p.Variations)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest("Product ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProduct = await _context.Products
                .Include(p => p.Categories)
                .Include(p => p.Variations)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            // Update fields
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Quantity = product.Quantity;
            existingProduct.IsHireable = product.IsHireable;
            existingProduct.IsForSale = product.IsForSale;
            existingProduct.StockQuantity = product.StockQuantity;

            // Update related entities (Categories, Variations, Images) if necessary
            existingProduct.Categories = product.Categories;
            existingProduct.Variations = product.Variations;
            existingProduct.Images = product.Images;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Categories)
                .Include(p => p.Variations)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}