import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import React from 'react'
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
    return (
        <>
            <aside className='main-left-navigation'>
                <div className="listItemSideBar">
                    <Link className='itemSideBar-link' to='/home'>
                        <button className='itemSideBar'>
                            <HomeSharpIcon fontSize='large' sx={{ color: 'white' }} />
                            <span>Inicio</span>
                        </button>
                    </Link>
                    <Link className='itemSideBar-link' to='/book'>
                        <button className='itemSideBar'>
                            <MenuBookSharpIcon fontSize='large' sx={{ color: 'white' }}></MenuBookSharpIcon>
                            <span>Libros</span>
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    )
}
