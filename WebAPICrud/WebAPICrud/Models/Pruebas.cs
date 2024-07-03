using System.ComponentModel.DataAnnotations;

namespace WebAPICrud.Models
{
    public class Pruebas
    {
        public int Id { get; set; }  // El ID se incrementará automáticamente en la base de datos

        public string TituloPrueba { get; set; }
        public string DescripcionPrueba { get; set; }
    }
}
