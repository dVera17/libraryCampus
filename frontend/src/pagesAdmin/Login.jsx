import React, { useState } from 'react'
import '../styles.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import BackGround from '../components/BackGround';

export default function Login() {
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataForm = { user, password }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        }

        let result = await (await fetch('http://localhost:5010/auth/login', options)).json();
        if (result.action) {
            toast.success(result.message)
            document.cookie = `token=${result.token}; path=/;`;
            if (result.user.rol === 'gerente') {
                setTimeout(() => {
                    navigate('/admin/home')
                }, 1000)
            }
            if (result.user.rol === 'cliente') {
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            }
        } else toast.error(result.message)
    }

    return (
        <>
            <BackGround />
            <div className="containerForm">
                <Form className='formLogin'>
                    <Form.Label className='title-form'>Login</Form.Label>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu usuario o email" onChange={(e) => setUser(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Stack gap={2} className="col-md-5 mx-auto btn-info-login">
                        <Col><Button variant="primary" type='submit' onClick={handleSubmit} >Login</Button></Col>
                        <Col>No tienes una cuenta? <Link to={'/register'}>Registrate aquí</Link></Col>
                    </Stack>
                </Form>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 1000 }} />
            </div>
        </>
    )
}
