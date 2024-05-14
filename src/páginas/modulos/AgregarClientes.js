import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoapi/APIInvoke'
import swal from 'sweetalert';


const AgregarClientes = () => {

    const navigate = useNavigate();
    const [clientes, setClientes] = useState({
        nombres:'',
        apellidos:'',
        documento:'',
        correo:'',
        celular:'',
        direccion:''
    });
    const {nombres, apellidos, documento, correo, celular, direccion} = clientes;
    useEffect(()=>{
        document.getElementById("nombres").focus();
    },[]);
    const onChange = (e) =>{
        setClientes({
           ...clientes, [e.target.name]: e.target.value
        })
    };
    const crearCliente = async () => {
        const data = {
            nombres: clientes.nombres,
            apellidos: clientes.apellidos,
            documento: clientes.documento,
            correo: clientes.correo,
            celular: clientes.celular,
            direccion: clientes.direccion
        }
        const response = await APIInvoke.invokePOST('/agregarCliente',data);
        const idClientes = response._id;

        if(idClientes === 'error al agregar cliente'){
            const msg = 'error al agregar cliente';
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
            navigate('/clientes');
            const msg = 'Cliente creado exitosamente';
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
            setClientes({
                nombres:'',
                apellidos:'',
                documento:'',
                correo:'',
                celular:'',
                direccion:''
            });
        }
    }
     
    const onSubmit = (e) =>{
        e.preventDefault();
        crearCliente();
    }
    return(
        <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={'Crear cliente'}
                    breadCrumb1={'Listado de clientes'}
                    breadCrumb2={'Creación'}
                    ruta1={'/clientes/agregar'}
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
                                    <label htmlFor='nombres'>Nombres</label>
                                    <input type='text' placeholder='Ingrese los nombres' className='form-control' id='nombres' name='nombres' value={nombres} onChange={onChange} required />
                                </div>
                                </div>
                                <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Apellidos</label>
                                    <input type='text' className='form-control' id='apellidos' name='apellidos' value={apellidos} onChange={onChange} required />
                                </div>
                                </div>
                                <div className="card-body">
                                    <label className="form-label">Documento</label>
                                    <input type='text' className='form-control' id='documento' name='documento' value={documento} onChange={onChange} required />
                                </div>
                                <div className="card-body">
                                    <label className="form-label">Correo</label>
                                    <input type='text' className='form-control' id='correo' name='correo' value={correo} onChange={onChange} required />
                                </div>
                                <div className="card-body">
                                    <label className="form-label">Celular</label>
                                    <input type='text' className='form-control' id='celular' name='celular' value={celular} onChange={onChange} required />
                                </div>
                                <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Dirección</label>
                                    <input type='text' className='form-control' id='direccion' name='direccion' value={direccion} onChange={onChange} required />
                                </div>
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

export default AgregarClientes;

