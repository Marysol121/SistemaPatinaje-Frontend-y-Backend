import { useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { INoticia } from "../../interfaces/INoticia";
import { Container, Row, Col, Table, Button } from "reactstrap";

// Interfaz para la respuesta de una noticia desde la API
interface INoticiaResponse {
    id: number;
    tituloNoticia: string;
    descripcionNoticia: string;
    imagenUrlNoticia: string;
}


export function ListaNoticia() {
    const [noticias, setNoticias] = useState<INoticia[]>([]);

    // Función para obtener la lista de noticias
    const obtenerNoticias = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Noticias`);
            if (response.ok) {
                const data: INoticiaResponse[] = await response.json(); // Convertir a arreglo de INoticiaResponse
                console.log("Datos obtenidos:", data);

                // Mapear INoticiaResponse a INoticia
                const noticiasArray: INoticia[] = data.map((item) => ({
                    id: item.id,
                    TituloNoticia: item.tituloNoticia,
                    DescripcionNoticia: item.descripcionNoticia,
                    ImagenUrlNoticia: item.imagenUrlNoticia
                }));

                setNoticias(noticiasArray);  // Actualizar el estado con las noticias obtenidas
            } else {
                console.error("Error al cargar las noticias:", response.statusText);
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron cargar las noticias",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error de red:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo conectar al servidor",
                icon: "error"
            });
        }
    };

    // Cargar la lista de noticias al montar el componente
    useEffect(() => {
        obtenerNoticias();
    }, []);

    // Función para eliminar una noticia
    const eliminarNoticia = async (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Eliminar noticia!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${appsettings.apiUrl}Noticias/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        await obtenerNoticias();  // Actualizar la lista de noticias después de eliminar
                    } else {
                        console.error("Error al eliminar la noticia:", response.statusText);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo eliminar la noticia",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error("Error de red:", error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo conectar al servidor",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h3>Lista de Noticias</h3>
                    <hr />
                    <Link className="btn btn-success mb-3" to="/noticias/nuevanoticia">Nueva Noticia</Link>
                    <hr />

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.TituloNoticia}</td>
                                    <td>{item.DescripcionNoticia}</td>
                                    <td>{item.ImagenUrlNoticia}</td>
                                    <td>
                                        <Link className="btn btn-primary mb-2 mx-2" to={`/noticias/editarnoticia/${item.id}`}>Editar</Link>
                                        <Button className="mb-2 mx-2" color="danger" onClick={() => eliminarNoticia(item.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
