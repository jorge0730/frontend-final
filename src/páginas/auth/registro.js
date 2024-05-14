import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alertas from 'sweetalert'
import APIInvoke from '../../archivoapi/APIInvoke.js';


const Registro = () => {

  const [usuario,setUsuario] = useState({
    nombres:'',
    email:'',
    password:'',
    confirmar:''
  });
  const {nombres,email,password,confirmar} = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario, [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    document.getElementById("nombres").focus();
  }, [])

  const RegistrarCuenta = async () => {
    if(password !== confirmar ){
        const mensaje = "Las constraseñas no coinciden";
        Alertas({
            title:"Error",
            text: mensaje,
            icon: "error",
            buttons:{
                confirm:{
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                }
            }
        });
    }else{
      if(password.length<8){
        const mensaje = "La constraseña debe tener minimo 8 caracteres";
        Alertas({
            title:"Error",
            text: mensaje,
            icon: "error",
            buttons:{
                confirm:{
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                }
            }
        })
      }else{
        const data = {
          nombres: usuario.nombres,
          email: usuario.email,
          password: usuario.password
        }

        const response = await APIInvoke.invokePOST('/api/usuarios',data)
        const mensa = response.mensaje;
        if(mensa === 'El usuario ya existe'){
          const msg = 'El usuario ya existe';
          Alertas({
            title:"Error",
            text: msg,
            icon: "error",
            buttons:{
                confirm:{
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                }
            }
          });
        }else{
          const msg='El usuario fue creado correctamente'
          Alertas({
            title:"Información",
            text: msg,
            icon: "success",
            buttons:{
                confirm:{
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                }
            }
          });
          setUsuario({
            nombres:'',
            email:'',
            password:'',
            confirmar:''
          });
        }
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    RegistrarCuenta();
  }
  return (
    <div className="hold-transition register-page">
      <div className='login-box'>
        <div className='login-logo'>
          <Link to={"#"}>Registrarse</Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Ingrese los datos de usuario
            </p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input className="form-control" placeholder="nombres" type="text" id='nombres' name='nombres' value={nombres} onChange={onChange} required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input className="form-control" placeholder="Email" type="email" id='email' name='email' value={email} onChange={onChange} required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input className="form-control" placeholder="Password" type="password" id='password' name='password' value={password} onChange={onChange} required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input className="form-control" placeholder="Confirme password" type="password" id='confirmar' name='confirmar' value={confirmar} onChange={onChange} required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="social-auth-links text-center mb-3">
                <button type='submit' className='btn btn-block btn-primary'>registrarse</button>
                <Link to={"/"} className='btn btn-block btn-danger'>regresar al login</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro
