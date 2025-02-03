using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private static List<Produto> produtos = new List<Produto>
    {
        new Produto { Id = 1, Nome = "Produto A", Preco = 10.99M },
        new Produto { Id = 2, Nome = "Produto B", Preco = 25.50M }
    };

    // GET: api/produto
    [HttpGet]
    public ActionResult<IEnumerable<Produto>> Get()
    {
        return Ok(produtos);
    }

    // GET: api/produto/{id}
    [HttpGet("{id}")]
    public ActionResult<Produto> Get(int id)
    {
        var produto = produtos.FirstOrDefault(p => p.Id == id);
        if (produto == null)
            return NotFound();
        return Ok(produto);
    }

    // POST: api/produto
    [HttpPost]
    public ActionResult<Produto> Post([FromBody] Produto produto)
    {
        produto.Id = produtos.Count + 1;
        produtos.Add(produto);
        return CreatedAtAction(nameof(Get), new { id = produto.Id }, produto);
    }

    // PUT: api/produto/{id}
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Produto produtoAtualizado)
    {
        var produto = produtos.FirstOrDefault(p => p.Id == id);
        if (produto == null)
            return NotFound();

        produto.Nome = produtoAtualizado.Nome;
        produto.Preco = produtoAtualizado.Preco;
        return NoContent();
    }

    // DELETE: api/produto/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var produto = produtos.FirstOrDefault(p => p.Id == id);
        if (produto == null)
            return NotFound();

        produtos.Remove(produto);
        return NoContent();
    }
}
