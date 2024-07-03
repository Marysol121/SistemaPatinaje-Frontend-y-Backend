using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPICrud.Context;
using WebAPICrud.Models;

namespace WebAPICrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PruebasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PruebasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Pruebas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pruebas>>> GetPruebas()
        {
            return await _context.Pruebas.ToListAsync();
        }

        // GET: api/Pruebas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pruebas>> GetPruebas(int id)
        {
            var pruebas = await _context.Pruebas.FindAsync(id);

            if (pruebas == null)
            {
                return NotFound();
            }

            return pruebas;
        }

        // PUT: api/Pruebas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPruebas(int id, Pruebas pruebas)
        {
            if (id != pruebas.Id)
            {
                return BadRequest();
            }

            _context.Entry(pruebas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PruebasExists(id))
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

        // POST: api/Pruebas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pruebas>> PostPruebas(Pruebas pruebas)
        {
            _context.Pruebas.Add(pruebas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPruebas", new { id = pruebas.Id }, pruebas);
        }

        // DELETE: api/Pruebas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePruebas(int id)
        {
            var pruebas = await _context.Pruebas.FindAsync(id);
            if (pruebas == null)
            {
                return NotFound();
            }

            _context.Pruebas.Remove(pruebas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PruebasExists(int id)
        {
            return _context.Pruebas.Any(e => e.Id == id);
        }
    }
}
