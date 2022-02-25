import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


class ServicesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        }
    }


    render() {
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        return (

            <div className="col promo py-2">

                <div className="text-center my-1 px-2">
                    <h5 class="text-center my-2">{this.state.item.name} {this.state.item.discount > 0 ? <span><button className='btn btn-danger px-1 py-0'>-{this.state.item.discount}%</button></span> : ''}</h5>
                    <div className="text-uppercase font-weight-bold">

                        {this.state.item.discount > 0 ? <span><span className="text-decoration-line-through text-muted"><strong>$</strong>{this.state.item.price.toFixed(2)}  </span><strong>$</strong>{this.state.item.price.toFixed(2) - (this.state.item.price * this.state.item.discount / 100).toFixed(2)}</span> : <span><strong>$</strong>{this.state.item.price.toFixed(2)}</span>}
                    </div>
                    <hr />
                    <div className="font-weight-bold">
                        <div><strong> Incluye</strong></div>
                        {this.state.item.description}
                    </div>
                    <div className='align-self-end'>
                        <hr />
                        <div className="">
                            <Link to={actualUser ? '/appointments/new' : '/login'}>
                                <button class="btn button-b rounded-pill btn-block text-truncate px-4">Estoy interesado!</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>



        )
    }



}


export default ServicesItem;