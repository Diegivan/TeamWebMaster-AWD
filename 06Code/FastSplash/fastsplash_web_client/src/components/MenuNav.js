import React, { useState } from 'react'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo1 from '../public/img/isotipo.svg';

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
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container-fluid container">
          <div class="navbar-brand logo">
            <img src={ logo1 } alt="isotipo" width="43%" />
           
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse  justify-content-between" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">Inicio</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/services">Servicios</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/promotions">Promociones</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="about">Acerca de</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="contact">Contáctanos</Link>
              </li>
             

            </ul>
            <ul class="navbar-nav ml-auto" id="navbarSupportedContent">
          
                  <li>
                    <Link class="nav-link" to="/login">Iniciar sesion</Link>
                  </li>
                  <li>
                    <Link class="nav-link" to="">Registrarse</Link>
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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div class="container-fluid container">
            <div class="navbar-brand logo">
              <img src="/public/img/isotipo.svg" alt="isotipo" width="43%" />
              <img src="/public/img/logo-fastsplash.svg" alt="logo" width="57%" />
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/admin/services">Gestionar Servicios</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/admin/users">Gestionar usuarios</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/admin/clients">Gestionar clientes</Link>
                </li>
                
                <li class="nav-item">
                  <Link class="nav-link" to="/admin/admins">Gestionar clientes</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/appointment">Gestionar citas</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" onClick={handle}>Salir</a>
                </li>
               
  
              </ul>
              <ul class="navbar-nav ml-auto" id="navbarSupportedContent">
                    <li>
                      <Link class="nav-link" to="">{actualUser.userName}</Link>
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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div class="container-fluid container">
            <div class="navbar-brand logo">
              <img src="/public/img/isotipo.svg" alt="isotipo" width="43%" />
              <img src="/public/img/logo-fastsplash.svg" alt="logo" width="57%" />
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/services">Servicios</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/promotions">Promociones</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="about">Acerca de</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="contact">Contáctanos</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Hacer cita</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" onClick={handle}>Salir</a>
                </li>
  
              </ul>
              <ul class="navbar-nav ml-auto" id="navbarSupportedContent">
                    <li>
                      <Link class="nav-link" to="">{actualUser.userName}</Link>
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