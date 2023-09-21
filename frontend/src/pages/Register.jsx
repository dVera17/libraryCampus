import React, { useState } from 'react'
import '../styles.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function Register() {
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [telefono, setTelefono] = useState();
    const [primerNombre, setPrimerNombre] = useState();
    const [primerApellido, setPrimerApellido] = useState();
    const [password, setPassword] = useState();
    const [fechaNac, setFechaNac] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataForm = { user, email, telefono: parseInt(telefono), primerNombre, primerApellido, password, rol: 'cliente', fechaNac }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        }
        let result = await (await fetch('http://localhost:5010/auth/register', options)).json()
        console.log(result);
    }

    return (
        <div className="containerForm">
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Primer nombre</Form.Label>
                        <Form.Control type="text" name="primerNombre" placeholder="Primer nombre" required onChange={(e) => setPrimerNombre(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Primer apellido</Form.Label>
                        <Form.Control type="text" name="primerApellido" placeholder="Primer apellido" required onChange={(e) => setPrimerApellido(e.target.value)} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGroupUser">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" name="user" placeholder='Usuario' required onChange={(e) => setUser(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="number" name="telefono" placeholder='Telefono' required onChange={(e) => setTelefono(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control type="date" name="fechaNac" placeholder='Telefono' required onChange={(e) => setFechaNac(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className='btn-info-register'>
                    <Col sm={4}><Button variant="primary" type='submit' onClick={handleSubmit}>Registrarse</Button></Col>
                    <Col sm={8}>Ya tienes una cuenta? Inicia sesion aquí</Col>
                </Row>
            </Form>
        </div>
    )
}