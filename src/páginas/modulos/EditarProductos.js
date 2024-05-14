import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoapi/APIInvoke'
import swal from 'sweetalert';


const EditarProductos = () => {
    const [nombreProducto, setNombreProducto] = useState('')
    const [codigo, setCodigo] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [cantidad, setCantidad] = useState('')
    const navigate = useNavigate();
    const {id}= useParams();

    const editarProducto = async(evento) => {

        evento.preventDefault();

        const res = await APIInvoke.invokePUT(`/actualizarProducto/${id}`,{
            nombreProducto:nombreProducto,
            codigo:codigo,
            fabricante:fabricante,
            cantidad:cantidad
        })
        const resp = res._id;
        if(resp !== id){
            const msg = 'Error al editar la información';
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
            const msg = 'Producto editado correctamente';
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
        }
    }

    useEffect(()=>{
        getProductoId();
        // eslint-disable-next-line
    },[]);

    const getProductoId = async() => {
        const res = await APIInvoke.invokeGET(`/buscarProductoId/${id}`)
        setNombreProducto(res.nombreProducto)
        setCodigo(res.codigo)
        setFabricante(res.fabricante)
        setCantidad(res.cantidad)
    }
    return(
        <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={'Editar producto'}
                    breadCrumb1={'Edicion de producto'}
                    breadCrumb2={'Editar'}
                    ruta1={'/producto'}
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
                            <form onSubmit={editarProducto}>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label htmlFor='nombreProducto'>Nombre producto</label>
                                    <input type='text' placeholder='Ingrese el nombre del producto' className='form-control' id='nombreProducto' name='nombreProducto' value={nombreProducto} onChange={(evento) => setNombreProducto(evento.target.value)} required  />  
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Código</label>
                                    <input value={codigo} onChange={(evento) => setCodigo(evento.target.value)} type='text' className='form-control' />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Fabricante</label>
                                    <input value={fabricante} onChange={(evento) => setFabricante(evento.target.value)} type='text' className='form-control' />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Cantidad</label>
                                    <input value={cantidad} onChange={(evento) => setCantidad(evento.target.value)} type='number' className='form-control' />
                                  </div>                                
                                </div>
                                <button type='submit' className='btn btn-primary'>Guardar cambios</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default EditarProductos;




