import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Link } from 'react-router-dom';

export default function TemporaryDrawerAdmin() {
    return (
        <>
            <aside className='main-left-navigation'>
                <div className="listItemSideBar">
                    <Link className='itemSideBar-link' to='/admin/home'>
                        <button className='itemSideBar'>
                            <HomeSharpIcon fontSize='large' sx={{ color: 'white' }} />
                            <span>Inicio</span>
                        </button>
                    </Link>
                    <Link className='itemSideBar-link' to='/admin/book'>
                        <button className='itemSideBar'>
                            <MenuBookSharpIcon fontSize='large' sx={{ color: 'white' }}></MenuBookSharpIcon>
                            <span>Libros</span>
                        </button>
                    </Link>
                    <Link className='itemSideBar-link' to='/admin/loan'>
                        <button className='itemSideBar'>
                            <CheckIcon fontSize='large' sx={{ color: 'white' }}></CheckIcon>
                            <span>Reservas</span>
                        </button>
                    </Link>
                    <Link className='itemSideBar-link' to='/admin/loanAccepted'>
                        <button className='itemSideBar'>
                            <EventAvailableIcon fontSize='large' sx={{ color: 'white' }}></EventAvailableIcon>
                            <span>Prestamos</span>
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    )
}
