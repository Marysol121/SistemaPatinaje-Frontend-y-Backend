import { useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { IPrueba } from "../../interfaces/IPrueba";

// Interfaz para la respuesta de una noticia desde la API
interface IPruebaResponse {
    id: number;
    tituloPrueba: string;
    descripcionPrueba: string;
}


export function ListaPrueba() {
    const [pruebas, setPruebas] = useState<IPrueba[]>([]);

    // Función para obtener la lista de noticias
    const obtenerPruebas = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Pruebas`);
            if (response.ok) {
                const data: IPruebaResponse[] = await response.json(); // Convertir a arreglo de IPruebasResponse
                console.log("Datos obtenidos:", data);

                // Mapear INoticiaResponse a INoticia
                const pruebasArray: IPrueba[] = data.map((item) => ({
                    id: item.id,
                    TituloPrueba: item.tituloPrueba,
                    DescripcionPrueba: item.descripcionPrueba
                }));

                setPruebas(pruebasArray);  // Actualizar el estado con las noticias obtenidas
            } else {
                console.error("Error al cargar las pruebas:", response.statusText);
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron cargar las prubas",
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
        obtenerPruebas();
    }, []);

    // Función para eliminar una noticia
    const eliminarPrueba = async (id: number) => {
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
                    const response = await fetch(`${appsettings.apiUrl}Pruebas/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        await obtenerPruebas();  // Actualizar la lista de noticias después de eliminar
                    } else {
                        console.error("Error al eliminar la prueba:", response.statusText);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo eliminar la prueba",
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
                    <h3>Lista de Pruebas</h3>
                    <hr />
                    <Link className="btn btn-success mb-3" to="/pruebas/nuevaprueba">Nueva Prueba</Link>
                    <hr />

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pruebas.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.TituloPrueba}</td>
                                    <td>{item.DescripcionPrueba}</td>
                                    <td>
                                        <Link className="btn btn-primary mb-2 mx-2" to={`/pruebas/editarprueba/${item.id}`}>Editar</Link>
                                        <Button className="mb-2 mx-2" color="danger" onClick={() => eliminarPrueba(item.id)}>Eliminar</Button>
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
