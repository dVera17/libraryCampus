import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import React from 'react'
import { Link } from 'react-router-dom';

export default function TemporaryDrawerUser() {
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
                    <Link className='itemSideBar-link' to='/loan'>
                        <button className='itemSideBar'>
                            <BookmarkAddIcon fontSize='large' sx={{ color: 'white' }} />
                            <span>Prestamos</span>
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    )
}