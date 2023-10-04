import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import DataTable from 'react-data-table-component';
import { getBooks } from '../components/fetchBooks';
import FormAddBook from '../components/FormAddBook';
import TemporaryDrawerUser from '../components/TemporaryDrawerUser';
import FormReserveBook from '../components/FormReserveBook';


export default function LoanUser() {
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
        getBooks().then(data => {
            setData(data);
            setPending(false);
        });
    }, []);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const columns = [
        {
            name: 'Codigo',
            selector: row => row.codigo,
            center: true
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
        },
        {
            name: 'Autor',
            selector: row => row.autor,
        },
        {
            name: 'Editorial',
            selector: row => row.editorial,
        },
        {
            name: 'Paginas',
            selector: row => row.cantidadPaginas,
            center: true,
        },
        {
            name: 'Fecha Edicion',
            selector: row => row.fechaEdicion,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='container-actions'>
                    <FormReserveBook codigoLibro={row.codigo} />
                </div>
            ),
            center: true
        },
    ];
    return (
        <>
            <NavbarPages />
            <TemporaryDrawerUser />
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
        </>
    )
}