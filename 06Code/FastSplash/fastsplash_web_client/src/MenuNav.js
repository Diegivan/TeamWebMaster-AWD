import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MenuNav = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container-fluid container">
            <div class="navbar-brand logo" href="/">
                <img src="/img/isotipo.svg" alt="isotipo" width="43%"/>
                <img src="/img/logo-fastsplash.svg" alt="logo" width="57%"/>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse  justify-content-between" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div class="nav-link active" aria-current="page">Inicio</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">Servicios</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">Promociones</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">Acerca de</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">Contáctanos</div>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" id="navbarSupportedContent">
                    <li class="nav-item">
                        <div class="nav-link">Inicia Sesión</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">Regístrate</div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        </div>
    )
}

export default MenuNav;