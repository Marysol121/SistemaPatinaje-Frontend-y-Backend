import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IPrueba } from "../../interfaces/IPrueba";

const initialPrueba: IPrueba = {
    id: 0,
    TituloPrueba: "",
    DescripcionPrueba: ""
};

export function EditarPrueba() {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    const [prueba, setPrueba] = useState<IPrueba>(initialPrueba);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la prueba existente
        const obtenerPrueba = async () => {
            try {
                const response = await fetch(`${appsettings.apiUrl}Pruebas/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Datos obtenidos:", data);
                    setPrueba({
                        id: data.id || 0,
                        TituloPrueba: data.tituloPrueba || "", // Cambiar esto a data.tituloPrueba
                        DescripcionPrueba: data.descripcionPrueba || "" // Cambiar esto a data.descripcionPrueba
                    });
                } else {
                    console.error("Error al cargar la prueba:", response.statusText);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo cargar la prueba",
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
        obtenerPrueba();
    }, [id]);

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPrueba({ ...prueba, [name]: value });
    };

    const guardar = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Pruebas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prueba)
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                // Si la respuesta no tiene contenido, navega directamente
                if (response.status === 204) {
                    navigate("/pruebas");
                    return;
                }

                const responseData = await response.json();
                console.log("Response data:", responseData);
                navigate("/pruebas");
            } else {
                const errorData = await response.json();
                console.log("Error data:", errorData);
                Swal.fire({
                    title: "Error",
                    text: `No se puede actualizar la noticia: ${errorData.message || "Error desconocido"}`,
                    icon: "warning"
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

    const volver = () => {
        navigate("/pruebas");
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h3>Editar Prueba</h3>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label for="TituloPrueba">Nombre</Label>
                            <Input type="text" name="TituloPrueba" id="TituloPrueba" onChange={inputChangeValue} value={prueba.TituloPrueba} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="DescripcionPrueba">Descripción</Label>
                            <Input type="text" name="DescripcionPrueba" id="DescripcionPrueba" onChange={inputChangeValue} value={prueba.DescripcionPrueba} />
                        </FormGroup>
                        <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                        <Button color="secondary" onClick={volver}>Volver</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
