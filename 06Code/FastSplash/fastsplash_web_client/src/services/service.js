import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Navigate } from 'react-router'
const url = "http://localhost:3027/";

class App extends Component {
    state = {
        services: [],
        error: [],
        success: [],
        modalInsert: false,
        modalUpdate: false,
        modalEliminar: false,
        form: {
            _id: '',
            name: '',
            description: '',
            price: 0.0,
            discount: 0.0,
        }
    }

    petitionGet = () => {
        axios.get(url + "admin/services").then(response => {
            this.setState({ services: response.data.service, error: [] });
        }).catch(error => {
            console.log(error.message);
        })
    }

    petitionPost = async () => {
        delete this.state.form._id;
        if (this.state.form.name === '') {
            const temp = [];
            temp.push({ message: "Debe llenar todos los campos" });
            this.setState({ error: temp });
        } else {
            await axios.post(url + "admin/new-services", this.state.form).then((response) => {
                if (!response.data.error) {
                    this.modalInsert();
                    const temp = [];
                    temp.push({ message: "Servicio registrado correctamente" });
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
    }

    petitionPut = async () => {
        await axios.put(url + "services/edit-service/" + this.state.form._id, this.state.form).then((response) => {
            if (!response.data.error) {
                this.modalUpdate();
                const temp = [];
                temp.push({ message: "Servicio actualizado correctamente" });
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

    petitionDelete = async () => {
        await axios.delete(url + 'admin/delete-service/' + this.state.form._id).then(response => {
            this.setState({ modalEliminar: false });
            const temp = [];
            temp.push({ message: "Servicio eliminado correctamente" });
            this.setState({ success: temp });
            this.petitionGet();
        })
    }

    modalInsert = () => {
        this.setState({ modalInsert: !this.state.modalInsert, error: [] });
    }

    modalUpdate = () => {
        this.setState({ modalUpdate: !this.state.modalUpdate, error: [] });
    }

    selectService = (service) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: service._id,
                name: service.name,
                description: service.description,
                price: (service.price/(1+0.12)).toFixed(2),
                discount: service.discount,
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                price: this.state.form ? this.state.form.price : 0.00,
                discount: this.state.form ? this.state.form.discount : 0.00,
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
                <h2 className="display-6">Servicios </h2>
                <div className="mx-auto card">
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsert() }}>Añadir Servicio</button>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Servicio</th>
                                <th>Descripción</th>
                                <th>Precio (Incluye IVA)</th>
                                <th>Descuento (%)</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.map((service, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{service.name}</td>
                                        <td>{service.description}</td>
                                        <td>$ {service.price.toFixed(2)}</td>
                                        <td>{service.discount} %</td>
                                        <td>
                                            <button className="btn btn-primary rounded-circle py-1 px-2" onClick={() => { this.selectService(service); this.modalUpdate() }}><FontAwesomeIcon icon={faEdit} /></button>
                                            {"   "}
                                            <button className="btn btn-danger rounded-circle py-1 px-2" onClick={() => { this.selectService(service); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader style={{ display: 'block', position: 'relative' }}>
                        <h3>Nuevo Servicio</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.modalInsert()}>x</span>
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
                                        <input type="text" name="name" id="name" className="form-control mb-3" title="Servicio"
                                            placeholder="Nombre del servicio" value={form ? form.name : ''} autoFocus onChange={this.handleChange} />
                                        <input type="text" name="description" id="description" className="form-control mb-3" title="Descripción"
                                            placeholder="Descripción" value={form ? form.description : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="price" id="price" className="form-control mb-3 form-floating"
                                            title="Precio" value={form ? form.price : 0.00} onInput={this.handleChange} min="0.00" step="0.01" />
                                        <label htmlFor="price">Precio (sin IVA)</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="discount" id="discount" className="form-control mb-3 form-floating"
                                            title="Descuento (%)" value={form ? form.discount : 0.00} onInput={this.handleChange} min="0.00" step="0.01" />
                                        <label htmlFor="discount">Descuento (%)</label>
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
                                </button> : <button className="btn btn-primary mx-1" onClick={() => this.petitionPost()}>
                                    Actualizar
                                </button>
                            }
                            <button className="btn btn-danger mx-1" onClick={() => this.modalInsert()}>Cancelar</button>
                        </div>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalUpdate}>
                    <ModalHeader style={{ display: 'block', position: 'relative' }}>
                        <h3>Actualizar Administrador</h3>
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
                                        <input type="text" name="name" id="name" className="form-control mb-3" title="Servicio"
                                            placeholder="Nombre del servicio" value={form ? form.name : ''} autoFocus onChange={this.handleChange} />
                                        <input type="text" name="description" id="description" className="form-control mb-3" title="Descripción"
                                            placeholder="Descripción" value={form ? form.description : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="price" id="price" className="form-control mb-3 form-floating"
                                            title="Precio" value={form ? form.price : 0.00} onChange={this.handleChange} min="0.00" step="0.01" />
                                        <label for="price">Precio (sin IVA)</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="discount" id="discount" className="form-control mb-3 form-floating"
                                            title="Descuento (%)" value={form ? form.discount : 0.00} onChange={this.handleChange} min="0.00" step="0.01" />
                                        <label htmlFor="discount">Descuento (%)</label>
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

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalHeader style={{ display: 'block', position: 'relative' }}>
                        <h3>Confirmación</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.setState({ modalEliminar: false })}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar el servicio <b>{form && form.name}</b>?
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
