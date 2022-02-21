import React, { Component } from 'react'
import axios from 'axios'
import ServicesItem from './ServicesItem';

class AllServices extends Component {

    constructor() {
        super();
        this.state = {
            services: [], id: ''

        }
    }

    componentDidMount() {
        this.getServices();
    }

    getServices() {
        axios.get('http://localhost:3027/admin/services')
            .then(response => {
                this.setState({ services: response.data.service }, () => {

                    //console.log(this.state);
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const serviceItems = this.state.services.map((service) => {

            return (
                <ServicesItem key={service._id} item={service} />
            )
        })

        return (
            <div>

                <div className="container">
                    <h2 className=" p-2 display-5">Servicios Disponibles</h2>
                    <div className="col-sm-12 ">
                        <div className='row gap-3'>{serviceItems}</div>
                    </div>
                    <br />
                </div>

            </div>

        )
    }
}

export default AllServices