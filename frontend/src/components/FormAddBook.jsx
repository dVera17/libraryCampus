import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormAddBook() {
    const [show, setShow] = useState(false);
    const [codigo, setCodigo] = useState();
    const [titulo, settitulo] = useState();
    const [autor, setautor] = useState();
    const [editorial, seteditorial] = useState();
    const [cantidadPaginas, setcantidadPaginas] = useState();
    const [fechaEdicion, setfechaEdicion] = useState();
    const [descripcion, setdescripcion] = useState();
    const [enStock, setenStock] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataForm = { codigo: parseInt(codigo), titulo, autor, editorial, cantidadPaginas: parseInt(cantidadPaginas), fechaEdicion, descripcion, enStock: parseInt(enStock) }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        }
        let result = await (await fetch('http://localhost:5010/book/create', options)).json()
        if (result.action) {
            toast.success(result.message)
        } else toast.error(result.message)
    }

    return (
        <>
            <div className="container-buttons">
                <Button variant="outline-info" className="btn-agregar" onClick={handleShow}>
                    Agregar
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control type="text" placeholder="Codigo" required onChange={(e) => setCodigo(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" placeholder="Titulo" required onChange={(e) => settitulo(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" placeholder="Autor" required onChange={(e) => setautor(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Editorial</Form.Label>
                                <Form.Control type="text" placeholder="Editorial" required onChange={(e) => seteditorial(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPassword">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion" required onChange={(e) => setdescripcion(e.target.value)} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Fecha de Edicion</Form.Label>
                                <Form.Control type="date" placeholder="Fecha de edicion" required onChange={(e) => setfechaEdicion(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Cantidad de Paginas</Form.Label>
                                <Form.Control type="number" placeholder="Cantidad de paginas" required onChange={(e) => setcantidadPaginas(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Cantidad en Stock</Form.Label>
                                <Form.Control type="number" placeholder="Cantidad de libros" required onChange={(e) => setenStock(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        </>
    )
}
