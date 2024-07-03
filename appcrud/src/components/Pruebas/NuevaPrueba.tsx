import { ChangeEvent, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IPrueba } from "../../interfaces/IPrueba";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const initialPrueba: IPrueba = {
    id: 0,
    TituloPrueba: "",
    DescripcionPrueba: ""
};

export function NuevaPrueba() {
    const [prueba, setPrueba] = useState<IPrueba>(initialPrueba);
    const navigate = useNavigate();

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPrueba({ ...prueba, [name]: value });
    };

    const guardar = async () => {
        const response = await fetch(`${appsettings.apiUrl}Pruebas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prueba)
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            const responseData = await response.json();
            console.log("Response data:", responseData);
            navigate("/pruebas");
        } else {
            const errorData = await response.json();
            console.log("Error data:", errorData);
            Swal.fire({
                title: "Error",
                text: `No se puede guardar la prueba: ${errorData.message || "Error desconocido"}`,
                icon: "warning"
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
                    <h3>Nueva Prueba</h3>
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
