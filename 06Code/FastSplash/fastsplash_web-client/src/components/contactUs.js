import React, { Component } from 'react'

export default class contactUs extends Component {
    render(){
        return (
          <div className='d-flex justify-content-center'>
            <section className="col-7 mb-4">
            {/*Section heading*/}
            <h2 className="h1-responsive font-weight-bold text-center my-4">Contáctanos</h2>
            {/*Section description*/}
            <p className="text-center w-responsive mx-auto mb-5">Dudas o preguntas sobre FastSplash, estaremos encontados de responderte.</p>
            <div className="row">
              {/*Grid column*/}
              <div className="col-md-9 mb-md-0 mb-5">
                <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                  {/*Grid row*/}
                  <div className="row">
                    {/*Grid column*/}
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <input type="text" id="name" name="name" className="form-control" />
                        <label htmlFor="name" className="text-muted">Nombre</label>
                      </div>
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <input type="text" id="email" name="email" className="form-control" />
                        <label htmlFor="email" className="text-muted">Email</label>
                      </div>
                    </div>
                    {/*Grid column*/}
                  </div>
                  {/*Grid row*/}
                  {/*Grid row*/}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <input type="text" id="subject" name="subject" className="form-control" />
                        <label htmlFor="subject" className="text-muted">Asunto</label>
                      </div>
                    </div>
                  </div>
                  {/*Grid row*/}
                  {/*Grid row*/}
                  <div className="row">
                    {/*Grid column*/}
                    <div className="col-md-12">
                      <div className="md-form">
                        <textarea type="text" id="message" name="message" rows={2} className="form-control md-textarea" defaultValue={""} />
                        <label htmlFor="message" className='text-muted'>Mensaje</label>
                      </div>
                    </div>
                  </div>
                  {/*Grid row*/}
                </form>
                <div className="text-center text-md-left py-2">
                  <a className="btn button-b rounded-pill px-5" onclick="document.getElementById('contact-form').submit();">Enviar</a>
                </div>
                <div className="status" />
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="col-md-3 text-center">
                <ul className="list-unstyled mb-0">
                  <li><i className="fas fa-map-marker-alt fa-3x  blue" />
                    <p className='blue fs-5'>Quito, Ecuador</p>
                  </li>
                  
                  <li><i className="fas fa-envelope mt-4 fa-3x blue" />
                    <p className='blue fs-5'>fastSplash@hotmail.com</p>
                  </li>
                </ul>
              </div>
              {/*Grid column*/}
            </div>
          </section>
          </div>
            
        )
    }
}