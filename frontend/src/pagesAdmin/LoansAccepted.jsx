import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import TemporaryDrawer from '../components/TemporaryDrawerAdmin';
import DataTable from 'react-data-table-component';
import FormAddBook from '../components/FormAddBook';
import toast, { Toaster } from 'react-hot-toast';
import { getAccettedReserves } from '../components/fetchReserves';

export default function LoansAccepted() {
    const [data, setData] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        getAccettedReserves().then(data => {
            setData(data);
            setPending(false);
        });
    }, []);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const columns = [
        {
            name: 'DNI usuario',
            selector: row => row.dniUser,
            center: true
        },
        {
            name: 'Codigo Libro',
            selector: row => row.codigoLibro,
        },
        {
            name: 'Fecha Prestamo',
            selector: row => row.fechaPrestamo,
        },
        {
            name: 'Fecha Devolucion',
            selector: row => row.fechaDevolucion,
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            center: true,
        }
    ];

    return (
        <>
            <NavbarPages />
            <TemporaryDrawer />
            <div className="content-page">
                <div className="container-table">
                    <DataTable
                        title='Libros Registrados'
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={pending}
                    />
                </div>
                <FormAddBook />
            </div>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        </>
    )
}
