import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import TemporaryDrawer from '../components/TemporaryDrawer';
import DataTable from 'react-data-table-component';
import ButtonBook from '../components/ButtonBook';
import FormAddBook from '../components/FormAddBook';

export default function Book() {
    const [data, setData] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);

    const getBooks = async () => {
        let result = await (await fetch('http://localhost:5010/book/all', { method: "GET" })).json();
        setData(result.data);
    }
    getBooks();

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const columns = [
        {
            name: 'Codigo',
            selector: row => row.codigo,
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
        },
        {
            name: 'Fecha Edicion',
            selector: row => row.fechaEdicion,
        },
        {
            name: 'EnStock',
            selector: row => row.enStock,
        },
    ];
    return (
        <>
            <NavbarPages />
            <TemporaryDrawer />
            <div className="content-page">
                <div className="container-table">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={pending}
                    />
                </div>
                {/* <FormAddBook /> */}
            </div>
        </>
    )
}