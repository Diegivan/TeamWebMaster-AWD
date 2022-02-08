import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const footer = () => {
  
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Nuestras redes</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <a href className="me-4 text-reset">
              <i className="fab fa-facebook-f" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </section>
        <section className>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3" />FastSplash
                </h6>
                <p>
                  Lavado de autos FastSplash.<br />
                  Derecehos reservados.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Productos
                </h6>
                <p>
                  <a href="#!" className="text-reset">Basico</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Estandar</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Pro</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Premium</a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Contactanos
                </h6>
                <p><i className="fas fa-home me-3" /> Av. Naciones Unidas y 10 de Agosto</p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  FastSplash@gmail.com
                </p>
                <p><i className="fas fa-phone me-3" /> 0995768532</p>
                <p><i className="fas fa-phone me-3" /> 0984653246</p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    )
}

export default footer;