import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../archivoapi/APIInvoke.js';
import swal from 'sweetalert';

const Login = () => {

    const navigate = useNavigate();

    const[usuario, setUsuario] = useState({
         email: '',
         password:''
    });

    const {email, password} = usuario;

    const onChange = (e) =>{
        setUsuario({
           ...usuario, [e.target.name]: e.target.value
        })
    }

    useEffect(() =>{
      document.getElementById("email").focus();
    }, [])

    const IniciarSesion = async () =>{
        if(password.length < 10){
            const men ="la contraseña minimo debe tener 10 caracteres minimo";
            swal({
                title:'Error',
                text: men,
                icon: 'error',
                buttons:{
                    confirm:{
                        text:'ok',
                        value:true,
                        visible:true,
                        className: 'btn btn-danger',
                        closeModal:true
                    }
                }
            });
        }else {

            const data ={
                email: usuario.email,
                password: usuario.password
            }

            const response = await APIInvoke.invokePOST('/api/auth', data );
            const mensaje = response.msg;

            if(mensaje === 'el usuario no existe' || mensaje === 'contraseña no válida'){
                const msg = "No es posible iniciar sesión, datos incorrectos";
                swal({
                    title:'Error',
                    text: msg,
                    icon: 'error',
                    buttons:{
                        confirm:{
                            text:'OK',
                            value:true,
                            visible:true,
                            className: 'btn btn-danger',
                            closeModal:true
                        }
                    }
                });
            } else {
                // el token de acceso
                const jwt = response.token;

                // se guarda el token
                localStorage.setItem('token', jwt);

                navigate("/Home");
            }


        }
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        IniciarSesion();
    }
    
    return (

        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"} ><b>Inciar</b> Sesion</Link>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg"> Ingrese sus datos </p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    required

                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button type='submit' className='btn btn-block btn-primary'> Ingresar </button>
                                <Link to={"/Registro"} className='btn btn-block btn-danger' > Crear Cuenta </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login