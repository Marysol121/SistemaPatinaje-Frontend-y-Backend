using System.ComponentModel.DataAnnotations;

namespace WebAPICrud.Models
{
    public class Noticias
    {
        public int Id { get; set; }  // El ID se incrementará automáticamente en la base de datos

        public string TituloNoticia { get; set; }
        public string DescripcionNoticia { get; set; }
        public string ImagenUrlNoticia { get; set; }
    }
}
