import React, { useEffect, useState } from 'react';
import NavbarPages from '../components/NavbarPages'
import TemporaryDrawer from '../components/TemporaryDrawerAdmin';
import DataTable from 'react-data-table-component';
import { getBooks } from '../components/fetchBooks';
import FormAddBook from '../components/FormAddBook';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModalEditBook from '../components/ModalEditBook';

export default function BookAdmin() {
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

    const deleteBook = async (codigo) => {
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ codigo })
        }
        let result = await (await fetch('http://192.168.129.72:5013/book/delete', options)).json();
        return result;
    }

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
            name: 'EnStock',
            selector: row => row.enStock,
            center: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='container-actions'>
                    <ModalEditBook />
                    <button
                        className='btn-deleteBook'
                        onClick={async () => {
                            const codigo = row.codigo;
                            deleteBook(codigo).then(() => {
                                setData(data.filter(r => r.codigo !== codigo));
                            });
                        }}
                    >
                        <DeleteForeverOutlinedIcon />
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
        </>
    )
}