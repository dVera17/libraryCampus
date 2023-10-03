import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import { useNavigate } from 'react-router-dom';
import TemporaryDrawer from '../components/TemporaryDrawerAdmin';
import TemporaryDrawerUser from '../components/TemporaryDrawerUser';

export default function HomeUser() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const hasTokenCookie = document.cookie.includes('token=');

    useEffect(() => {
        if (hasTokenCookie) {
            const token = document.cookie.match(/token=([^;]+)/)[1];
            fetch('http://192.168.129.72:5013/home', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.action) {
                        setIsLoggedIn(true);
                    } else {
                        navigate('/');
                    }
                })
                .catch((error) => {
                    console.error('Error al verificar la sesión', error);
                });
        } else {
            navigate('/');
        }
    }, [navigate, hasTokenCookie]);

    return (
        <>
            {isLoggedIn && (
                <>
                    <NavbarPages />
                    <TemporaryDrawerUser />
                    <div className="body-home-page">
                        <div className="main-content">
                            <header className="main-header">
                                <h1>Library</h1>
                                <p className="eslogan">Tu fuente de inspiración</p>
                            </header>
                            <main>
                                <section className="intro">
                                    <p>
                                        La librería Campus es una librería independiente que ofrece una
                                        amplia selección de libros para todos los gustos. Nos comprometemos a
                                        ofrecer un servicio al cliente de primera y a proporcionar a nuestros
                                        clientes una experiencia de compra agradable.
                                    </p>
                                </section>
                            </main>
                        </div>
                        <footer className="footer-section">
                            <div className="container">
                                <div className="footer-cta pt-5 pb-5">
                                    <div className="row">
                                        <div className="col-xl-4 col-md-4 mb-30">
                                            <div className="single-cta">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <div className="cta-text">
                                                    <h4>Find us</h4>
                                                    <span>1010 Avenue, sw 54321, chandigarh</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-md-4 mb-30">
                                            <div className="single-cta">
                                                <i className="fas fa-phone"></i>
                                                <div className="cta-text">
                                                    <h4>Call us</h4>
                                                    <span>9876543210 0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-md-4 mb-30">
                                            <div className="single-cta">
                                                <i className="far fa-envelope-open"></i>
                                                <div className="cta-text">
                                                    <h4>Mail us</h4>
                                                    <span>mail@info.com</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="copyright-area">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                                            <div className="copyright-text">
                                                <p>Copyright &copy; 2018, All Right Reserved</p>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                            <div className="footer-menu">
                                                <ul>
                                                    <li><a href="#">Home</a></li>
                                                    <li><a href="#">Terms</a></li>
                                                    <li><a href="#">Privacy</a></li>
                                                    <li><a href="#">Policy</a></li>
                                                    <li><a href="#">Contact</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </>
            )}
        </>
    )
}
