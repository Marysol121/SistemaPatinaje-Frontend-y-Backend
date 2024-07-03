import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { INoticia } from "../../interfaces/INoticia";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const initialNoticia: INoticia = {
    id: 0,
    TituloNoticia: "",
    DescripcionNoticia: "",
    ImagenUrlNoticia: ""
};

export function EditarNoticia() {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    const [noticia, setNoticia] = useState<INoticia>(initialNoticia);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la noticia existente
        const obtenerNoticia = async () => {
            try {
                const response = await fetch(`${appsettings.apiUrl}Noticias/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Datos obtenidos:", data);
                    setNoticia({
                        id: data.id || 0,
                        TituloNoticia: data.tituloNoticia || "",
                        DescripcionNoticia: data.descripcionNoticia || "",
                        ImagenUrlNoticia: data.imagenUrlNoticia || ""
                    });
                } else {
                    console.error("Error al cargar la noticia:", response.statusText);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo cargar la noticia",
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
        obtenerNoticia();
    }, [id]);

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNoticia({ ...noticia, [name]: value });
    };

    const guardar = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Noticias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noticia)
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                // Si la respuesta no tiene contenido, navega directamente
                if (response.status === 204) {
                    navigate("/noticias");
                    return;
                }

                const responseData = await response.json();
                console.log("Response data:", responseData);
                navigate("/noticias");
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
        navigate("/noticias");
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h3>Editar Noticia</h3>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label for="TituloNoticia">Título</Label>
                            <Input type="text" name="TituloNoticia" id="TituloNoticia" onChange={inputChangeValue} value={noticia.TituloNoticia} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="DescripcionNoticia">Descripción</Label>
                            <Input type="text" name="DescripcionNoticia" id="DescripcionNoticia" onChange={inputChangeValue} value={noticia.DescripcionNoticia} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ImagenUrlNoticia">URL de la Imagen</Label>
                            <Input type="text" name="ImagenUrlNoticia" id="ImagenUrlNoticia" onChange={inputChangeValue} value={noticia.ImagenUrlNoticia} />
                        </FormGroup>
                        <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                        <Button color="secondary" onClick={volver}>Volver</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
