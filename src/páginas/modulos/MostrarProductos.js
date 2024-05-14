import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoapi/APIInvoke'
import swal from 'sweetalert';

const MostrarProductos = () => {

    const [productos, setProductoss] = useState([]);

    const getProductos = async () => {
        const response = await APIInvoke.invokeGET(`/buscarProducto`); 
        setProductoss(response);
    }

    useEffect(() => {
        getProductos();
    }, [])

    const eliminarProductos = async (e, idProducto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/eliminarProducto/${idProducto}`);

        if (response.msg === 'Producto eliminado correctamente') {
            const msg = "Producto eliminado";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            getProductos();
        } else {
            
            const msg = "Error al eliminar el producto";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Listado de Productos"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Productos"}
                    ruta1={"/home"}
                />

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/productos/agregar"} className="btn btn-block btn-primary btn-sm">
                                Crear Productos</Link></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        
                                        <th style={{ width: '15%' }}>Nombres productos</th>
                                        <th style={{ width: '15%' }}>Código</th>
                                        <th style={{ width: '15%' }}>Fabricante</th>
                                        <th style={{ width: '10%' }}>cantidad</th>
                                        <th style={{ width: '10%' }}>Opciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {productos.map( (producto, index) => (
                                <tr key = {index}>
                                    <td> {producto.nombreProducto} </td>
                                    <td> {producto.codigo} </td>
                                    <td> {producto.fabricante} </td>
                                    <td> {producto.cantidad} </td>
                                    <td>
                                                        
                                                        <Link to={`/productos/editar/${producto._id}`} className="btn btn-sm btn-primary">Editar</Link>
                                                        <button onClick={(e) => eliminarProductos(e, producto._id)} className="btn btn-sm btn-danger">Eliminar</button>
                                                    </td>
                                                </tr>
                                      ))}

                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MostrarProductos;
