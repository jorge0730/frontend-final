import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoapi/APIInvoke'
import swal from 'sweetalert';


const EditarClientes = () => {
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [documento, setDocumento] = useState('')
    const [correo, setCorreo] = useState('')
    const [celular, setCelular] = useState('')
    const [direccion, setDireccion] = useState('')
    const navigate = useNavigate();
    const {id}= useParams();

    const editarCliente = async(evento) => {
        evento.preventDefault();
        const res =await APIInvoke.invokePUT(`/actualizarCliente/${id}`,{
            nombres:nombres,
            apellidos:apellidos,
            documento:documento,
            correo:correo,
            celular:celular,
            direccion:direccion
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
            navigate('/clientes');
            const msg = 'Cliente editado correctamente';
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
        getClienteId();
        // eslint-disable-next-line
    },[]);

    const getClienteId = async() => {
        const res = await APIInvoke.invokeGET(`/buscarClienteId/${id}`)
        setNombres(res.nombres)
        setApellidos(res.apellidos)
        setDocumento(res.documento)
        setCorreo(res.correo)
        setCelular(res.celular)
        setDireccion(res.direccion)
    }
    return(
        <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={'Editar cliente'}
                    breadCrumb1={'Edicion de cliente'}
                    breadCrumb2={'Editar'}
                    ruta1={'/clientes'}
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
                            <form onSubmit={editarCliente}>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label htmlFor='nombres'>Nombres</label>
                                    <input type='text' placeholder='Ingrese los nombres' className='form-control' id='nombres' name='nombres' value={nombres} onChange={(evento) => setNombres(evento.target.value)} required  />  
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Apellidoss</label>
                                    <input value={apellidos} onChange={(evento) => setApellidos(evento.target.value)} type='text' className='form-control' />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Documento</label>
                                    <input value={documento} onChange={(evento) => setDocumento(evento.target.value)} type='number' className='form-control' />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Correo</label>
                                    <input value={correo} onChange={(evento) => setCorreo(evento.target.value)} type='text' className='form-control' />
                                  </div>                                
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Celular</label>
                                    <input value={celular} onChange={(evento) => setCelular(evento.target.value)} type='number' className='form-control' />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group">
                                    <label className="form-label">Dirección</label>
                                    <input value={direccion} onChange={(evento) => setDireccion(evento.target.value)} type='text' className='form-control' />
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

export default EditarClientes;




// const EditarClientes = () => {
//     const navigate = useNavigate();

//     const {idclientes} = useParams();
//     const res = idclientes.split('@');
//     const ncliente = res[1];

//     const [clientes, setClientes] = useState({
//         nombres:ncliente,
//         apellidos:ncliente,
//         documento:ncliente,
//         correo:ncliente,
//         celular:ncliente,
//         direccion:ncliente
//     });
//     const {nombres, apellidos, documento, correo, celular, direccion} = clientes;

//     useEffect(()=>{
//         document.getElementById("nombres").focus();
//     },[]);
//     const onChange = (e) =>{
//         setClientes({
//            ...clientes, [e.target.name]: e.target.value
//         })
//     };

//     const addClientes = async ()=>{
//         const res = idclientes.split('');
//         const idClientes = res[0];
//         const data = {
//             nombres: clientes.nombres,
//             apellidos: clientes.apellidos,
//             documento: clientes.documento,
//             correo: clientes.correo,
//             celular: clientes.celular,
//             direccion: clientes.direccion
//         }
    
//         const response = await APIInvoke.invokePUT(`/actualizarCliente/${idClientes}`,data);
//         const addClientes = response.clientes._id;
        
//         if(addClientes !== idClientes){
//             const msg = 'Error al editar la información';
//             swal({
//                 title: 'Error',
//                 text: msg,
//                 icon: 'error',
//                 buttons: {
//                     confirm: {
//                         text: 'Ok',
//                         value: true,
//                         visible: true,
//                         className: 'btn btn-danger',
//                         closeModal: true
//                     }
//                 }
//             });
//         }else{
//             navigate('/clientes');
//             const msg = 'Cliente editado correctamente';
//             swal({
//                 title: 'Información',
//                 text: msg,
//                 icon: 'success',
//                 buttons: {
//                     confirm: {
//                         text: 'Ok',
//                         value: true,
//                         visible: true,
//                         className: 'btn btn-primary',
//                         closeModal: true
//                     }
//                 }
//             });
//             setClientes({
//                 nombres:nombres,
//                 apellidos:apellidos,
//                 documento:documento,
//                 correo:correo,
//                 celular:celular,
//                 direccion:direccion
//             });
//         }
//     }

//     const onSubmit = (e) =>{
//         e.preventDefault();
//         addClientes();
//     }

//   return (
//     <div className='wrapper'>
//             <Navbar></Navbar>
//             <SidebarContainer></SidebarContainer>
//             <div className="content-wrapper">
//                 <ContentHeader
//                     titulo={'Editar cliente'}
//                     breadCrumb1={'Edicion de cliente'}
//                     breadCrumb2={'Editar'}
//                     ruta1={'/clientes'}
//                 />
//                 <section className="content">

//                     <div className="card">
//                         <div className="card-header">
//                             <div className="card-tools">
//                                 <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
//                                     <i className="fas fa-minus" />
//                                 </button>
//                                 <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
//                                     <i className="fas fa-times" />
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={onSubmit}>
//                                 <div className="card-body">
//                                     <div className="form-group">
//                                         <label htmlFor='nombres'>Nombres</label>
//                                         <input type='text' placeholder='Ingrese los nombres' className='form-control' id='nombres' name='nombres' value={nombres} onChange={onChange} required />
//                                         <div className="input-group-append">
//                                             <div className="input-group-text">
//                                                 <span className="fas fa-envelope" />
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                                 <div className="card-body">
//                                   <div className="form-group">
//                                       <label className="form-label">Apellidos</label>
//                                       <input type='text' className='form-control' id='apellidos' name='apellidos' value={apellidos} onChange={onChange} required />
//                                   </div>
//                                 </div>
//                                 <div className="card-body">
//                                     <label className="form-label">Documento</label>
//                                     <input type='text' className='form-control' id='documento' name='documento' value={documento} onChange={onChange} required />
//                                 </div>
//                                 <div className="card-body">
//                                     <label className="form-label">Correo</label>
//                                     <input type='text' className='form-control' id='correo' name='correo' value={correo} onChange={onChange} required />
//                                 </div>
//                                 <div className="card-body">
//                                     <label className="form-label">Celular</label>
//                                     <input type='text' className='form-control' id='celular' name='celular' value={celular} onChange={onChange} required />
//                                 </div>
//                                 <div className="card-body">
//                                 <div className="form-group">
//                                     <label className="form-label">Dirección</label>
//                                     <input type='text' className='form-control' id='direccion' name='direccion' value={direccion} onChange={onChange} required />
//                                 </div>
//                                 </div>
//                                 <button type='submit' className='btn btn-primary'>Guardar cambios</button>
//                             </form>

//                         </div>
//                     </div>

//                 </section>
//             </div>
            
//             <Footer></Footer>
//         </div>
//   )
// }

// export default EditarClientes;