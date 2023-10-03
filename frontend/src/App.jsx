import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pagesAdmin/Login'
import Register from './pagesAdmin/Register'
import HomeAdmin from './pagesAdmin/HomeAdmin'
import BookAdmin from './pagesAdmin/BookAdmin'
import LoanAdmin from './pagesAdmin/LoanAdmin'
import Error404 from './pagesAdmin/Error404'
import HomeUser from './pagesUser/HomeUser'
import LoanUser from './pagesUser/LoanUser'

export default function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/admin/home' element={<HomeAdmin />} />
                <Route path='/admin/book' element={<BookAdmin />} />
                <Route path='/admin/loan' element={<LoanAdmin />} />
                <Route path='*' element={<Error404 />} />
                <Route path='/home' element={<HomeUser />} />
                <Route path='/loan' element={<LoanUser />} />
            </Routes>
        </>
    )
}