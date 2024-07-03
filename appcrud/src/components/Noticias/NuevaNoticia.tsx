import { ChangeEvent, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { INoticia } from "../../interfaces/INoticia";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const initialNoticia: INoticia = {
    id: 0,
    TituloNoticia: "",
    DescripcionNoticia: "",
    ImagenUrlNoticia: ""
};

export function NuevaNoticia() {
    const [noticia, setNoticia] = useState<INoticia>(initialNoticia);
    const navigate = useNavigate();

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNoticia({ ...noticia, [name]: value });
    };

    const guardar = async () => {
        const response = await fetch(`${appsettings.apiUrl}Noticias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noticia)
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            const responseData = await response.json();
            console.log("Response data:", responseData);
            navigate("/noticias");
        } else {
            const errorData = await response.json();
            console.log("Error data:", errorData);
            Swal.fire({
                title: "Error",
                text: `No se puede guardar la noticia: ${errorData.message || "Error desconocido"}`,
                icon: "warning"
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
                    <h3>Nueva Noticia</h3>
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