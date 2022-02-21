import React, { Component } from 'react'

export default class promotions extends Component {
  render() {
    return (

      <div>
        <h2 className=" p-2 display-5 mb-4">Promociones</h2>
        <div className='d-flex row gap-3'>
          <div className='col promo pr1'>
            <div className='content'>
              <h1 className='text-light fw-lighter my-2'>El Espiritu de la navidad llega a FastSplash</h1>
              <p className='text-light fs-6 my-3'>En FastSplash nos importas, sabemos que la mejor manera de premiarte es cuidando de tu bolsillo, por temporada navidena
                hemos decidido regalarte un lavado gratis por cada 3 vehiculos que reciban lavado, la oferta es valida hasta el 5 de enero de 2022.
              </p>
            </div>
          </div>
          <div className='col promo pr2'>
            <div className='content'>
              <h1 className='text-light fw-lighter my-2'>Estas fiestas de Quito celébralas con FastSplash</h1>
              <p className='text-light fs-6 my-3'>
                La carita de dios esta de fiestas, y para celebrarlo fastSplash ha decidido ofrecer un 10 por ciento de descuento
                en sus servicios a los 3 mejores chullas Quitenos que suban su foto a nuestra pagina de Facebook. Esta oferta es valida
                desde el 4 al 8 de diciembre de 2021.
              </p>
            </div>
          </div>
          <div className='col promo pr3'>
            <div className='content'>
              <h1 className='text-light fw-lighter my-2'>Enamorate con FastSplash este San Valentin</h1>
              <p className='text-light fs-6 my-3'>
                Solo por el mes del amor fastsplash ha decidido darle una mano a cupido, por cada consumo superior a 40 dolares estaras participando por un sorteo de una cena todo pagado en el columbus en quito si llevas a tu pareja recibiras 2 cupones de sorteo.
              </p>
            </div>
          </div>
        </div>

      </div>

    )
  }
}