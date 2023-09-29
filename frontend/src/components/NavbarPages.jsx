import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function NavbarPages() {
    const navigate = useNavigate()

    const handleLogOut = async () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }
        let result = await (await fetch('http://localhost:5010/auth/logout', options)).json();
        if (result.action) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            toast.success(result.message)
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } else toast.error(result.message)
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="main-navbar">
                <Container>
                    <Navbar.Brand className='titleNavbar'>Library Campus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav>
                            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown" className='titleNavbar'>
                                <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 1000 }} />
        </>
    )
}
