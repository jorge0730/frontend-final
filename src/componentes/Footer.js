import React from 'react';
import facebook from '../imagenes/facebook.png' 
import whatsapp from '../imagenes/whatsapp.png'

const Footer = () => {
    return (
        <footer className="main-footer">
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="links">Siguenos en:</div>
                            < div className="links"><a href="https://es-la.facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} width="50" height="50" alt=""></img></a></div>
                            <div className="links"><a href="https://api.whatsapp.com/send?phone=3214237797&text=Buen%20d%C3%ADa,%20Me%20ayuda%20con:" target="_blank" rel="noopener noreferrer"><img src={whatsapp} width="50" height="50" alt=""></img></a></div>
                        </div>
                        <div class="col">
                            <h6>SERVICIO AL CLIENTE</h6>
                            <div>
                                <dl>
                                    <dt>Jorge Pardo Quiroga</dt>
                                    <dt>Administrador</dt>
                                    <dt>cel.: 3214237797</dt>
                                    <dt>email: jorge@gmail.com</dt>
                                    <dt>Bogotá D.C</dt>
                                </dl>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>  
        </footer>
    );
}

export default Footer;