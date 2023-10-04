import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles.css';

export default function FormReserveBook({ codigoLibro, onReserve }) {
    const [show, setShow] = useState(false);
    const [dniUser, setDniUser] = useState('');
    const [fechaPrestamo, setFechaPrestamo] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');

    const handleClose = () => {
        setShow(false);
        setFechaPrestamo('');
        setFechaDevolucion('');
    };

    const handleShow = () => setShow(true);

    const handleReserve = async () => {

        const dataForm = {
            dniUser: parseInt(dniUser),
            codigoLibro: parseInt(codigoLibro),
            fechaPrestamo,
            fechaDevolucion,
            estado: "pendiente",
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForm),
        };
        let result = await (await fetch('http://192.168.129.72:5013/reserve/new', options)).json()
        if (result.action) {
            toast.success(result.message)
        } else toast.error(result.message)

        // Cierra el modal
        handleClose();
    };

    return (
        <>
            <button className='btn-deleteBook' onClick={handleShow}>
                Reservar
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Dni User</Form.Label>
                            <Form.Control placeholder="Ingrese su número de identificación" type='number' onChange={(e) => setDniUser(e.target.value)} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="fechaEntrega">
                                <Form.Label>Fecha de Entrega</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={(e) => setFechaPrestamo(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="fechaDevolucion">
                                <Form.Label>Fecha de Devolución</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={fechaDevolucion}
                                    onChange={(e) => setFechaDevolucion(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Button variant="primary" onClick={handleReserve}>
                            Reservar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 1000 }} />
        </>
    );
}