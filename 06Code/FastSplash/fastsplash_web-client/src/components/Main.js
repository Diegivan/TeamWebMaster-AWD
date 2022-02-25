import axios from '../url/axios';
import React, { useState} from 'react'
import principal from '../public/img/principal.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/main.css"
import { Link } from 'react-router-dom';

const Main = () => {
    const actualUser = JSON.parse(localStorage.getItem('actualUser'));
    return (
        <div>
            <div class="jumbotron mt-4">
                <h1 class="display-4">FastSplash</h1>
                <p class="lead">Donde lavar tu carro pasa en un Splash!</p>
                <hr class="my-4"/>
                    <div class="row jumbotron">
                        <img src={principal} width="100%" alt="Car Wash"/>
                    </div>
            </div>
            <div className="row">
                <div className="jumbotron py-sm-2">
                    <div className="row justify-content-center">
                        <div className="col-md-12 my-4 mx-auto">
                            <h2 className="text-center display-6">Échale un vistazo a nuestros servicios</h2>
                            <hr/>
                                <div className="row no-gutters my-3">
                                    <div className="col-md-3 pr-2">
                                        <div className="list-group text-center my-4">
                                            <div className="list-group-item text-white bg-dark">
                                                <h5 className="text-center my-1">Básico</h5>
                                            </div>
                                            <div className="list-group-item text-uppercase font-weight-bold">
                                                5,50$
                                            </div>
                                             <div className="list-group-item">
                                                Wash Basic
                                            </div>
                                             <div className="list-group-item">
                                                1 hora de duración
                                            </div>
                                             <div className="list-group-item">
                                                1 personal
                                            </div>
                                            <div className="list-group-item">
                                            <Link to={actualUser ? '/appointments/new' : '/login'}>
                                                <button className="btn button-b rounded-pill btn-1g btn-block text-truncate">I'm interested</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="list-group text-center my-4">
                                            <div className="list-group-item text-white bg-dark">
                                                <h5 className="text-center my-1">Estandar<br/></h5>
                                            </div>
                                            <div className="list-group-item text-uppercase font-weight-bold">
                                                9,99$
                                            </div>
                                             <div className="list-group-item">
                                                Wash Standard
                                            </div>
                                             <div className="list-group-item">
                                                1:30 horas de duración
                                            </div>
                                             <div className="list-group-item">
                                                2 personal
                                            </div>
                                             <div className="list-group-item">
                                                Lavado de llantas
                                            </div>
                                            <div className="list-group-item">
                                            <Link to={actualUser ? '/appointments/new' : '/login'}>
                                                <button className="btn button-b rounded-pill btn-1g btn-block text-truncate">Estoy interesado!</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 pl-2">
                                        <div className="list-group text-center my-4">
                                            <div className="list-group-item text-white bg-dark">
                                                <h5 className="text-center my-1">Pro</h5>
                                            </div>
                                            <div className="list-group-item text-uppercase font-weight-bold">
                                                24.99$
                                            </div>
                                             <div className="list-group-item">
                                                Wash Pro
                                            </div>
                                             <div className="list-group-item">
                                                2 horas de duración
                                            </div>
                                             <div className="list-group-item">
                                                2 personal
                                            </div>
                                             <div className="list-group-item">
                                                Lavado de llantas
                                            </div>
                                             <div className="list-group-item">
                                                Lavado de motor
                                            </div>
                                             <div className="list-group-item">
                                                Descuento para siguiente lavado
                                            </div>

                                            <div className="list-group-item">
                                            <Link to={actualUser ? '/appointments/new' : '/login'}>
                                                <button className="btn button-b rounded-pill btn-1g btn-block text-truncate">Estoy interesado!</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 pl-2">
                                        <div className="list-group text-center my-4">
                                            <div className="list-group-item text-white bg-dark">
                                                <h5 className="text-center my-1">Premium</h5>
                                            </div>
                                            <div className="list-group-item text-uppercase font-weight-bold">
                                                39.99$
                                            </div>
                                             <div className="list-group-item">
                                                Wash Premium
                                            </div>
                                             <div className="list-group-item">
                                                3 horas de duración
                                            </div>
                                             <div className="list-group-item">
                                                4 personal
                                            </div>
                                             <div className="list-group-item">
                                                Detailing de motor
                                            </div>
                                             <div className="list-group-item">
                                                Limpieza Profunda
                                            </div>
                                             <div className="list-group-item">
                                                Micropulido
                                            </div>
                                             <div className="list-group-item">
                                                Lavado de Llantas
                                            </div>
                                             <div className="list-group-item">
                                                Lavado de motor
                                            </div>
                                             <div className="list-group-item">
                                                Membresía
                                            </div>

                                            <div className="list-group-item">
                                            <Link to={actualUser ? '/appointments/new' : '/login'}>
                                                <button className="btn button-b rounded-pill btn-1g btn-block text-truncate">Estoy interesado!</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
          
</div>
        </div>
          
    )
}

export default Main;