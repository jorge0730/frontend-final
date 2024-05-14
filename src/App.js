
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './páginas/auth/login';
import Registro from './páginas/auth/registro';
import Home from './páginas/Home';
import MostrarClientes from './páginas/modulos/MostrarClientes';
import AgregarClientes from './páginas/modulos/AgregarClientes';
import EditarClientes from './páginas/modulos/EditarClientes';
import MostrarProductos from './páginas/modulos/MostrarProductos';
import AgregarProductos from './páginas/modulos/AgregarProductos';
import EditarProductos from './páginas/modulos/EditarProductos';

function App() {
  return (
    <div>
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/Registro" exact element={<Registro/>}/>
            <Route path="/home" exact element={<Home/>}/>
            <Route path="/clientes" exact element={<MostrarClientes/>}/>
            <Route path="/clientes/agregar" exact element={<AgregarClientes/>}/>
            <Route path="/clientes/editar/:id" exact element={<EditarClientes/>}/>
            <Route path="/productos" exact element={<MostrarProductos/>}/>
            <Route path="/productos/agregar" exact element={<AgregarProductos/>}/>
            <Route path="/productos/editar/:id" exact element={<EditarProductos/>}/>
          </Routes>
        </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
