import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoapi/APIInvoke'
import swal from 'sweetalert';


const AgregarProductos = () => {

    const navigate = useNavigate();
    const [productos, setProductos] = useState({
        nombreProducto:'',
        codigo:'',
        fabricante:'',
        cantidad:''
    });
    const {nombreProducto, codigo, fabricante, cantidad} = productos;
    useEffect(()=>{
        document.getElementById("nombreProducto").focus();
    },[]);
    const onChange = (e) =>{
        setProductos({
           ...productos, [e.target.name]: e.target.value
        })
    };
    const crearProducto = async () => {
        const data = {
            nombreProducto: productos.nombreProducto,
            codigo: productos.codigo,
            fabricante: productos.fabricante,
            cantidad: productos.cantidad
        }
        const response = await APIInvoke.invokePOST('/agregarProducto',data);
        const idProductos = response._id;

        if(idProductos === 'error al agregar producto'){
            const msg = 'error al agregar producto';
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
        }else{
            navigate('/productos');
            const msg = 'Producto creado exitosamente';
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
            setProductos({
                nombreProducto:'',
                codigo:'',
                fabricante:'',
                cantidad:''
            });
        }
    }
     
    const onSubmit = (e) =>{
        e.preventDefault();
        crearProducto();
    }
    return(
        <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={'Crear producto'}
                    breadCrumb1={'Listado de productos'}
                    breadCrumb2={'Creación'}
                    ruta1={'/productos/agregar'}
                />
                <section className="content">

                    <div className="card">
                        <div className="card-header">
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
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombreProducto'>Nombre Producto</label>
                                    <input type='text' placeholder='Ingrese el nombre del producto' className='form-control' id='nombreProducto' name='nombreProducto' value={nombreProducto} onChange={onChange} required />
                                </div>
                                </div>
                                <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Código</label>
                                    <input type='text' className='form-control' id='codigo' name='codigo' value={codigo} onChange={onChange} required />
                                </div>
                                </div>
                                <div className="card-body">
                                    <label className="form-label">Fabricante</label>
                                    <input type='text' className='form-control' id='fabricante' name='fabricante' value={fabricante} onChange={onChange} required />
                                </div>
                                <div className="card-body">
                                    <label className="form-label">Cantidad</label>
                                    <input type='text' className='form-control' id='cantidad' name='cantidad' value={cantidad} onChange={onChange} required />
                                </div>
                                <button type='submit' className='btn btn-primary'>Crear</button>
                            </form>

                        </div>
                    </div>

                </section>
            </div>
            
            <Footer></Footer>
        </div>

    )
}

export default AgregarProductos;

