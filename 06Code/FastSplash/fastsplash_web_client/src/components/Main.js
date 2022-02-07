import axios from '../url/axios';
import React, { useState } from 'react'
import principal from '../public/img/principal.jpg';
const Main = () => {

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
            <div class="row">
                <div class="jumbotron py-sm-2">
                    <div class="row justify-content-center">
                        <div class="col-md-12 my-4 mx-auto">
                            <h2 class="text-center display-6">Échale un vistazo a nuestros servicios</h2>
                            <hr/>
                                <div class="row no-gutters my-3">
                                    <div class="col-md-3 pr-2">
                                        <div class="list-group text-center my-4">
                                            <div class="list-group-item text-white bg-dark">
                                                <h5 class="text-center my-1">Básico</h5>
                                            </div>
                                            <div class="list-group-item text-uppercase font-weight-bold">
                                                5,50$
                                            </div>
                                             <div class="list-group-item">
                                                Wash Basic
                                            </div>
                                             <div class="list-group-item">
                                                1 hora de duración
                                            </div>
                                             <div class="list-group-item">
                                                1 personal
                                            </div>
                                            <div class="list-group-item">
                                                <button class="btn btn-success btn-1g btn-block text-truncate">I'm interested</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="list-group text-center my-4">
                                            <div class="list-group-item text-white bg-dark">
                                                <h5 class="text-center my-1">Estandar<br/></h5>
                                            </div>
                                            <div class="list-group-item text-uppercase font-weight-bold">
                                                9,99$
                                            </div>
                                             <div class="list-group-item">
                                                Wash Standard
                                            </div>
                                             <div class="list-group-item">
                                                1:30 horas de duración
                                            </div>
                                             <div class="list-group-item">
                                                2 personal
                                            </div>
                                             <div class="list-group-item">
                                                Lavado de llantas
                                            </div>
                                            <div class="list-group-item">
                                                <button class="btn btn-success btn-1g btn-block text-truncate">Estoy interesado!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 pl-2">
                                        <div class="list-group text-center my-4">
                                            <div class="list-group-item text-white bg-dark">
                                                <h5 class="text-center my-1">Pro</h5>
                                            </div>
                                            <div class="list-group-item text-uppercase font-weight-bold">
                                                24.99$
                                            </div>
                                             <div class="list-group-item">
                                                Wash Pro
                                            </div>
                                             <div class="list-group-item">
                                                2 horas de duración
                                            </div>
                                             <div class="list-group-item">
                                                2 personal
                                            </div>
                                             <div class="list-group-item">
                                                Lavado de llantas
                                            </div>
                                             <div class="list-group-item">
                                                Lavado de motor
                                            </div>
                                             <div class="list-group-item">
                                                Descuento para siguiente lavado
                                            </div>

                                            <div class="list-group-item">
                                                <button class="btn btn-success btn-1g btn-block text-truncate">Estoy interesado!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 pl-2">
                                        <div class="list-group text-center my-4">
                                            <div class="list-group-item text-white bg-dark">
                                                <h5 class="text-center my-1">Premium</h5>
                                            </div>
                                            <div class="list-group-item text-uppercase font-weight-bold">
                                                39.99$
                                            </div>
                                             <div class="list-group-item">
                                                Wash Premium
                                            </div>
                                             <div class="list-group-item">
                                                3 horas de duración
                                            </div>
                                             <div class="list-group-item">
                                                4 personal
                                            </div>
                                             <div class="list-group-item">
                                                Detailing de motor
                                            </div>
                                             <div class="list-group-item">
                                                Limpieza Profunda
                                            </div>
                                             <div class="list-group-item">
                                                Micropulido
                                            </div>
                                             <div class="list-group-item">
                                                Lavado de Llantas
                                            </div>
                                             <div class="list-group-item">
                                                Lavado de motor
                                            </div>
                                             <div class="list-group-item">
                                                Membresía
                                            </div>

                                            <div class="list-group-item">
                                                <button class="btn btn-success btn-1g btn-block text-truncate">Estoy interesado!</button>
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