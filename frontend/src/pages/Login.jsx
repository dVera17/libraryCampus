import React, { useState } from 'react'
import '../styles.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function Login() {
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = { user, password }
        console.log(dataForm);
    }

    return (
        <div className="containerForm">
            <Form className='formLogin'>
                <Form.Label className='title-form'>Log In</Form.Label>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu usuario o email" onChange={(e) => setUser(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Stack gap={2} className="col-md-5 mx-auto btn-info-login">
                    <Col><Button variant="primary" type='submit' onClick={handleSubmit} >Registrarse</Button></Col>
                    <Col>No tienes una cuenta? Registrate aquí</Col>
                </Stack>
            </Form>
        </div>
    )
}
