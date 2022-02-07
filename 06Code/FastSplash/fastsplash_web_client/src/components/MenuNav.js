import React, { useState } from 'react'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../public/img/isotipo.svg';
import iso from '../public/img/letras2.svg';

const MenuNav = () => {
  const handle = ()=>{
    localStorage.clear();
    window.location.href = 'http://localhost:3000/';
    }
  const  actualUser  = JSON.parse(localStorage.getItem('actualUser'));
  if(!actualUser)
  {
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div className="container-fluid container">
          <div className="navbar-brand logo">
              <img src={logo} alt="isotipo" width="43%" />
              <img src={iso} alt="logo" width="57%" />
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/promotions">Promociones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">Acerca de</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contact">Contáctanos</Link>
              </li>
             

            </ul>
            <ul className="navbar-nav ml-auto" id="navbarSupportedContent">
          
                  <li>
                    <Link className="nav-link" to="/login">Iniciar sesion</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/register">Registrarse</Link>
                  </li>
                  
                  
            </ul>
    

          </div>
        </div>
      </nav>
    </div>
  )
  }
  if(actualUser && actualUser.rol==2){
    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div className="container-fluid container">
            <div className="navbar-brand logo">
              <img src={logo} alt="isotipo" width="43%" />
              <img src={iso} alt="logo" width="57%" />
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/services">Servicios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/clients">Clientes</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/admins">Administradores</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/appointments">Citas</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handle}>Salir</a>
                </li>
               
  
              </ul>
              <ul className="navbar-nav ml-auto" id="navbarSupportedContent">
                    <li>
                      <Link className="nav-link" to="">{actualUser.userName}</Link>
                    </li> 
              </ul>
            </div>
          </div>
        </nav>
      </div>
    ) 
  }
  if(actualUser && actualUser.rol==1){
    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div className="container-fluid container">
            <div className="navbar-brand logo">
              <img src={logo} alt="isotipo" width="43%" />
              <img src={iso} alt="logo" width="57%" />
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">Servicios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/promotions">Promociones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="about">Acerca de</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="contact">Contáctanos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="">Hacer cita</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handle}>Salir</a>
                </li>
  
              </ul>
              <ul className="navbar-nav ml-auto" id="navbarSupportedContent">
                    <li>
                      <Link className="nav-link" to="">{actualUser.userName}</Link>
                    </li> 
              </ul>
            </div>
          </div>
        </nav>
      </div>
    ) 
  }
}

export default MenuNav;