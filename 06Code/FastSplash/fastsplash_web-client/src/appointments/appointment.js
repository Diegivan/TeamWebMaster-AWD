import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Navigate } from 'react-router'
const url = "http://ec2-44-202-44-135.compute-1.amazonaws.com:3027/";

class App extends Component {
    state = {
        appointments: [],
        services: [],
        error: [],
        success: [],
        modalInsert: false,
        modalUpdate: false,
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

    petitionGet = () => {
        axios.get(url + "admin/appointments").then(response => {
            this.setState({ appointments: response.data.appointments, services: response.data.services, error: [] });
        }).catch(error => {
            console.log(error.message);
        })
    }

    petitionPut = async () => {
        await axios.put(url + "appointments/edit-appointment/" + this.state.form._id, this.state.form).then((response) => {
            if (!response.data.error) {
                this.modalUpdate();
                const temp = [];
                temp.push({ message: "Estado de la cita actualizado correctamente" });
                this.setState({ success: temp });
                this.petitionGet();
            } else {
                this.setState({ error: response.data.error });
            }
            console.log(response, "res");
        }).catch((error) => {
            console.log(error.message, "error");
        })
    }

    modalUpdate = () => {
        this.setState({ modalUpdate: !this.state.modalUpdate, error: [] });
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
        if (!actualUser || actualUser.rol != 2) {
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
                        <h5>Citas pendientes/completadas de su negocio</h5>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Cita N°</th>
                                <th>Vehículo</th>
                                <th>Placa</th>
                                <th>Fecha</th>
                                <th>Dirección</th>
                                <th>Horario</th>
                                <th>Servicio</th>
                                <th>Observaciones</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appointments.map((appointment, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{appointment.cars}</td>
                                        <td>{appointment.Plate}</td>
                                        <td>{appointment.Date.substring(0, 10)}</td>
                                        <td>{appointment.Adress}. {appointment.Reference != "Ninguna" ? <i>{appointment.Reference}</i> : ''}</td>
                                        <td>{appointment.hours}</td>
                                        {this.state.services.map(service => {
                                            if (appointment.services == service._id) {
                                                return (
                                                    <td>{service.name ? service.name : 'Ninguno'}</td>
                                                )
                                            }
                                        })}
                                        <td>{!appointment.Obs || appointment.Obs == 'Ninguna' ? <i>Ninguno</i> : appointment.Obs}</td>
                                        <td>
                                            <button className={appointment.status == 0 ? 'btn btn-warning' : 'btn btn-success'} onClick={() => { this.selectAppointment(appointment); this.modalUpdate() }}>{appointment.status == 0 ? 'Pendiente ' : 'Completado '} </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={this.state.modalUpdate}>
                    <ModalHeader style={{ display: 'block', position: 'relative' }}>
                        <h3>Actualizar Estado</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.modalUpdate()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className="card">
                                {this.state.error.length > 0 ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {this.state.error.map((errors) => {
                                            return (
                                                <div>- {errors.message}</div>
                                            )
                                        })}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    : ''
                                }

                                <div className="card-body">
                                    <div className="form-group">
                                        <label for="status">Estado de la cita</label>
                                        <select name="status" class="form-control" id="exampleFormControlSelect1" value={form ? form.status : 0} onChange={this.handleChange}>
                                            <option value="0">Pendiente</option>
                                            <option value="1">Completado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <div className="form-group d-flex justify-content-end">
                            {this.state.tipoModal == 'insertar' ?

                                <button className="btn btn-success mx-1 px-4" onClick={() => this.petitionPost()}>
                                    Crear
                                </button> : <button className="btn btn-primary mx-1" onClick={() => this.petitionPut()}>
                                    Actualizar
                                </button>
                            }
                            <button className="btn btn-danger mx-1" onClick={() => this.modalUpdate()}>Cancelar</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}
export default App;
