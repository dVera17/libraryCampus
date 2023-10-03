import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import { useNavigate } from 'react-router-dom';
import TemporaryDrawer from '../components/TemporaryDrawerAdmin';

export default function HomeAdmin() {
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
                    <TemporaryDrawer />
                </>
            )}
        </>
    )
}
