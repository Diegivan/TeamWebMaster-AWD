import React, { Component } from 'react'

export default class aboutUs extends Component {
  render() {
    return (

      <div>
        <h2 className=" p-2 display-5 text-center">Acerca de nosotros</h2>
        <hr />
        <div className='d-flex row py-3'>
          <div align="center" className='col-5'>
            <img src="https://www.firestone.com.mx/content/dam/bridgestone/consumer/bst/latam/mx/nosotros/tips-2020/feb/lavado_big_1.jpg" width="80%" /><br />
          </div>
          <div className='col align-self-center'>
            <p align="center" className='fw-light fs-5 text-muted'>
              Somos una empresa familiar dedicada al lavado de autos, asi como el cuidado y mantenimiento de los mismos.<br />
              FastSplash ofrece una gran variedad de servicios.<br />
              Somos reconocidos por nuestros clientes, por nuestra calidad en el cuidado y lavado de autos.
            </p>
          </div>
        </div>
        <div className='d-flex row py-3'>
          <div className='col align-self-center'>
            <h6 className=" p-2 display-6 text-center fst-italic fs-4">Misión</h6>
            <p align="center" className='fw-light fs-5 text-muted'>
              Proveer servicios de Higiene y Limpieza en Detalle de vehículos, en tiempo record y bajo un estándar de calidad que se sustenta en tecnología de procesos y productos únicos de limpieza.
            </p>
            <h6 className=" p-2 display-6 text-center fst-italic fs-4">Visión</h6>
            <p align="center" className='fw-light fs-5 text-muted'>
            Brindar a nuestros clientes una atención personalizada, entregando una calidad excepcional de servicio.
            </p>
          </div>
          <div align="center" className='col-5'>
            <img src="http://tienda.pimentel.com.pe/img/cms/servicio_car_wash.jpg" width="80%" /><br />
          </div>
        </div>

      </div>

    )
  }
}