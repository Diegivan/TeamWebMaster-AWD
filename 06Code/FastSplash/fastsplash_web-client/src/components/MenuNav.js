import React, { useState } from 'react'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../public/img/isotipo.svg';
import iso from '../public/img/letras2.svg';
import "../public/css/main.css"

const MenuNav = () => {
  const handle = () => {
    localStorage.clear();
    window.location.href = 'http://localhost:3028/';
  }

  const [isActive, setActive] = useState('inicio');

  const actualUser = JSON.parse(localStorage.getItem('actualUser'));
  if (!actualUser) {
    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div className="container-fluid container">
            <Link className="navbar-brand logo" to="/" onClick={() => setActive('inicio')}>
              <img src={logo} alt="isotipo" width="43%" />
              <img src={iso} alt="logo" width="57%" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={isActive == 'inicio' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('inicio')} aria-current="page" to="/" >Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'services' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('services')} to="/services">Servicios</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'promotions' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('promotions')} to="/promotions">Promociones</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'about' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('about')} to="about">Acerca de</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'contactus' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('contactus')} to="contact">Contáctanos</Link>
                </li>


              </ul>
              <ul className="navbar-nav ml-auto" id="navbarSupportedContent">

                <li>
                  <Link className={isActive == 'login' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('login')} to="/login">Iniciar sesion</Link>
                </li>
                <li>
                  <Link className={isActive == 'signup' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('signup')} to="/register">Registrarse</Link>
                </li>


              </ul>


            </div>
          </div>
        </nav>
      </div>
    )
  }
  if (actualUser && actualUser.rol == 2) {
    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div className="container-fluid container">
            <Link className="navbar-brand logo" to="/" onClick={() => setActive('inicio')}>
              <img src={logo} alt="isotipo" width="43%" />
              <img src={iso} alt="logo" width="57%" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={isActive == 'inicio' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('inicio')} aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'services' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('services')} to="/admin/services">Servicios</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'users' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('users')} to="/admin/users">Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'clients' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('clients')} to="/admin/clients">Clientes</Link>
                </li>

                <li className="nav-item">
                  <Link className={isActive == 'admins' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('admins')} to="/admin/admins">Administradores</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'dates' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('dates')} to="/admin/appointments">Citas</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto" id="navbarSupportedContent">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {actualUser.userName}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><a className="dropdown-item" onClick={handle}>Salir</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
  if (actualUser && actualUser.rol == 1) {
    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div className="container-fluid container">
            <Link className="navbar-brand logo" to="/" onClick={() => setActive('inicio')}>
              <img src={logo} alt="isotipo" width="43%" />
              <img src={iso} alt="logo" width="57%" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  justify-content-between" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={isActive == 'inicio' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('inicio')} aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'services' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('services')} to="/services">Servicios</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'promotions' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('promotions')} to="/promotions">Promociones</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'about' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('about')} to="about">Acerca de</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive == 'contactus' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('contactus')} to="contact">Contáctanos</Link>
                </li>

              </ul>
              <ul className="navbar-nav ml-auto align-self-start" id="navbarSupportedContent">
                <li className="nav-item">

                  <Link className="nav-link" to="appointments/new">
                    <button className={isActive == 'makedate' ? 'btn btn-success rounded-pill nav-button' : 'btn btn-light rounded-pill nav-button'} onClick={() => setActive('makedate')}>Hacer cita</button>
                  </Link>

                </li>
                <li className="nav-item">

                  <Link className="nav-link" to="appointments/me">
                    <button className={isActive == 'history' ? 'btn btn-success rounded-pill nav-button' : 'btn btn-light rounded-pill nav-button'} onClick={() => setActive('history')}>Historial de citas</button>
                  </Link>

                </li>
              </ul>
              <ul className="navbar-nav ml-auto" id="navbarSupportedContent">

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {actualUser.userName}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><a className="dropdown-item" onClick={handle}>Salir</a></li>
                  </ul>
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