import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const MenuNav = () => {
    const {userName} = JSON.parse(localStorage.getItem('actualUser'));
    return (
       
        <div>
        <nav classname="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div classname="container-fluid container">
            <div classname="navbar-brand logo" href="/">
              <img src="/img/isotipo.svg" alt="isotipo" width="43%" />
              <img src="/img/logo-fastsplash.svg" alt="logo" width="57%" />
            </div>
            <button classname="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div classname="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul classname="navbar-nav">
                <li classname="nav-item">
                  <Link classname="nav-link active" to="/">Inicio</Link>
                </li>
                <li classname="nav-item">
                  <div classname="nav-link"><Link to ="/services">Servicios</Link></div>
                </li>
                <li classname="nav-item">
                  <Link classname="nav-link" to="/promotions">Promociones</Link>
                </li>
                <li classname="nav-item">
                  <Link classname="nav-link" to="/about">Acerca de</Link>
                </li>
                <li classname="nav-item">
                  <Link classname="nav-link" to="/contact">Contáctanos</Link>
                </li>
              </ul>
              <ul classname="navbar-nav ml-auto" id="navbarSupportedContent">
                <li classname="nav-item">
                  <Link classname="nav-link" to="/login">Inicia Sesión</Link>
                </li>
                <li classname="nav-item">
                  <div classname="nav-link">Regístrate</div>
                </li>
              </ul>
            </div>
          </div>
          { userName } 
        </nav>
      </div>

    )
}

export default MenuNav;