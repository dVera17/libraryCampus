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
            fetch('http://localhost:5010/home', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.action) {
                        setIsLoggedIn(true);
                    } else {
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    console.error('Error al verificar la sesión', error);
                });
        } else {
            navigate('/login');
        }
    }, [navigate, hasTokenCookie]);

    return (
        <>
            {isLoggedIn && (
                <>
                    <NavbarPages />
                    <TemporaryDrawerUser />
                </>
            )}
        </>
    )
}
