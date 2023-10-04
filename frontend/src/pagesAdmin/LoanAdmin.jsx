import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import TemporaryDrawer from '../components/TemporaryDrawerAdmin';
import DataTable from 'react-data-table-component';
import FormAddBook from '../components/FormAddBook';
import toast, { Toaster } from 'react-hot-toast';
import { getAllReserves } from '../components/fetchReserves';

export default function LoanAdmin() {
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
        getAllReserves().then(data => {
            setData(data);
            setPending(false);
        });
    }, []);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const aceptarReserva = async (dniUser) => {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dniUser: parseInt(dniUser) })
        }

        let result = await (await fetch('http://192.168.129.72:5013/reserve/aceptar', options)).json();
        if (result.action) {
            toast.success(result.message)
        } else toast.error(result.message)
    }

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
        },
        {
            name: 'Action',
            cell: row => (
                <div className='container-actions'>
                    <button
                        className='btn-deleteBook'
                        onClick={async () => {
                            const dniUser = row.dniUser;
                            aceptarReserva(dniUser);
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            ),
            center: true
        },
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