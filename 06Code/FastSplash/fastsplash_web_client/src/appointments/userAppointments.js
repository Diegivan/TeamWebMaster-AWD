import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFilePdf, faBan } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import api from '../url/axios'

class App extends Component {
    state = {
        appointments: [],
        services: [],
        error: [],
        success: [],
        modalEliminar: false,
        form: {
            _id: '',
            Name: '',
            Adress: '',
            Reference: '',
            Date: '',
            Plate: '',
            cars: '',
            services: '',
            hours: '',
            status: '',
            Obs: ''
        }
    }

    petitionGet = async () => {
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        await api.get("appointments/historial/" + actualUser._id).then(response => {
            if (response.data.appointments) {
                this.setState({ appointments: response.data.appointments, services: response.data.services, error: [] });
            } else {
                this.setState({ appointments: [], services: response.data.services, error: [] });
            }

        }).catch(error => {
            console.log(error.message);
        })
    }

    petitionDelete = async () => {
        await api.delete('appointments/delete/' + this.state.form._id).then(response => {
            this.setState({ modalEliminar: false });
            const temp = [];
            temp.push({ message: "Cita cancelada correctamente" });
            this.setState({ success: temp });
            this.petitionGet();
        })
    }

    printBill = async (id) => {
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        await api.get("get-factura/" + id).then(response => {
            const temp = [];
            temp.push({ message: "Cita generada correctamente" });
            this.setState({ success: temp });
            window.location.href = "http://localhost:3027/get-factura/"+id;
        }).catch(error => {
            console.log(error.message);
        })
    }

    selectAppointment = (appointment) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: appointment._id,
                Name: appointment.Name,
                Adress: appointment.Adress,
                Reference: appointment.Reference,
                Date: appointment.Date,
                Plate: appointment.Plate,
                cars: appointment.cars,
                services: appointment.services,
                hours: appointment.hours,
                status: appointment.status,
                Obs: appointment.Obs
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                status: this.state.form ? this.state.form.status : "0",
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.petitionGet();
    }

    successButton = () => {
        this.setState({ success: [], error: [] });
    }

    render() {
        const { form } = this.state;
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        if (!actualUser || actualUser.rol != 1) {
            localStorage.clear();
            return (
                <Navigate to='/login' />
            )
        }
        return (
            <div className="row col-md-10 mx-auto">
                {() => {

                }}
                {this.state.success.length > 0 ?
                    <div className="alert alert-success alert-dismissible fade show" role="success">
                        {this.state.success.map((success) => {
                            return (
                                <div>- {success.message}</div>
                            )
                        })}
                        <button type="button" className="btn-close" data-bs-dismiss="success" aria-label="Close" onClick={this.successButton}></button>
                    </div>
                    : ''
                }
                {this.state.error.length > 0 ?
                    <div className="alert alert-danger alert-dismissible fade show" role="error">
                        {this.state.error.map((error) => {
                            return (
                                <div>- {error.message}</div>
                            )
                        })}
                        <button type="button" className="btn-close" data-bs-dismiss="error" aria-label="Close" onClick={this.successButton}></button>
                    </div>
                    : ''
                }
                <h2 className="display-6">Historial de Citas</h2>
                <div className="mx-auto card">
                    <div className="d-flex justify-content-end mt-3">
                        <h5>Mis Citas</h5>
                    </div>
                    <hr />
                    {this.state.appointments.length > 0 ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cita N°</th>
                                    <th>Vehículo</th>
                                    <th>Placa</th>
                                    <th>Fecha</th>
                                    <th>Dirección</th>
                                    <th>Servicio</th>
                                    <th>Observaciones</th>
                                    <th>Estado</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appointments.map((appointment, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{appointment.cars}</td>
                                            <td>{appointment.Plate}</td>
                                            <td>{appointment.Date.substring(0, 10)} {appointment.hours}</td>
                                            <td>{appointment.Adress}. {appointment.Reference != "Ninguna" ? <i>{appointment.Reference}</i> : ''} </td>
                                            {this.state.services.map(service => {
                                                if (appointment.services == service._id) {
                                                    return (
                                                        <td>{service.name ? service.name : 'Ninguno'}</td>
                                                    )
                                                }
                                            })}
                                            <td>{!appointment.Obs || appointment.Obs == 'Ninguna' ? <i>Ninguna</i> : appointment.Obs}</td>
                                            <td><div className={appointment.status == 0 ? 'btn btn-warning' : 'btn btn-success'}>{appointment.status == 0 ? 'Pendiente ' : 'Completado '} </div></td>
                                            <td>
                                                <button className="btn btn-primary rounded-circle py-1" onClick={() => { this.selectAppointment(appointment); this.printBill(appointment._id) }}><FontAwesomeIcon icon={faFilePdf} /></button>
                                                {"   "}
                                                <button className="btn btn-danger rounded-circle py-1 px-2" onClick={() => { this.selectAppointment(appointment); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faBan} /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <div>
                            <div className="alert alert-primary alert-dismissible fade show" role="error">
                                Parece que aun no has realizado ninguna cita
                            </div>
                            <Link className='btn btn-success px-3 mb-3' to="/appointments/new">Hacer una Cita</Link>
                        </div>
                    }
                </div>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalHeader style={{ display: 'block', position: 'relative' }}>
                        <h3>Confirmación</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.setState({ modalEliminar: false })}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        ¿Estás seguro que deseas cancelar la cita programada para el <b>{form && form.Date}</b>?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.petitionDelete()}>Sí, eliminar</button>
                        <button className="btn btn-primary" onClick={() => this.setState({ modalEliminar: false })}>No, cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}
export default App;
