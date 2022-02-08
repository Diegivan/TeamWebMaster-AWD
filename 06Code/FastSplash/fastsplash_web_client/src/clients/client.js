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
        clients: [],
        users: [],
        error: [],
        errorc: [],
        success: [],
        modalInsert: false,
        modalUpdate: false,
        modalEliminar: false,
        form: {
            _id: '',
            firstName: '',
            lastName: '',
            ci: '',
            email: '',
            birthDate: '',
            userId: '',
            date: '',
            userName: '',
            password: '',
            rol: '',
            confirmPassword: '',
            actualPassword: '',
        }
    }

    petitionGet = () => {
        axios.get(url + "admin/clients").then(response => {
            this.setState({ clients: response.data.clients, users: response.data.users, error: [] });
        }).catch(error => {
            console.log(error.message);
        })
    }

    petitionPost = async () => {
        
        if (!this.state.form ||  !this.state.form.firstName   ||  !this.state.form.lastName   ||  !this.state.form.ci   ||
            !this.state.form.email   ||  !this.state.form.birthDate   ||  !this.state.form.userName   ||
            !this.state.form.password   ||  !this.state.form.confirmPassword   ||  !this.state.form.rol || this.state.form.firstName === '' || this.state.form.lastName === '' || this.state.form.ci === '' ||
            this.state.form.email === '' || this.state.form.birthDate === '' || this.state.form.userName === '' ||
            this.state.form.password === '' || this.state.form.confirmPassword === '' || this.state.form.rol === '') {
            const temp = [];
            temp.push({ message: "Debe llenar todos los campos" });
            this.setState({ errorc: temp });
        }
        else if(this.state.form.password !== this.state.form.confirmPassword) {
            const temp = [];
            temp.push({ message: "Las contraseñas no coinciden" });
            this.setState({ errorc: temp });
        } 
        else {
            await axios.post(url + "clients/new", this.state.form).then((response) => {
                if (!response.data.error) {
                    this.modalInsert();
                    const temp = [];
                    temp.push({ message: "Cliente registrado correctamente" });
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
        await axios.put(url + "clients/editClient/" + this.state.form._id, this.state.form).then((response) => {
            if (!response.data.error) {
                this.modalUpdate();
                const temp = [];
                temp.push({ message: "Cliente actualizado correctamente" });
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
        await axios.delete(url + 'admin/clients/delete/' + this.state.form._id).then(response => {
            this.setState({ modalEliminar: false });
            const temp = [];
            temp.push({ message: "Cliente eliminado correctamente" });
            this.setState({ success: temp });
            this.petitionGet();
        })
    }

    modalInsert = () => {
        this.setState({ modalInsert: !this.state.modalInsert, error: [], errorc: [] });
    }

    modalUpdate = () => {
        this.setState({ modalUpdate: !this.state.modalUpdate, error: [], errorc: [] });
    }

    selectClient = (client, user) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: client._id,
                firstName: client.firstName,
                lastName: client.lastName,
                ci: client.ci,
                email: client.email,
                birthDate: client.birthDate,
                userId: client.userId,
                date: client.date,
                userName: user.userName,
                password: user.password,
                rol: user.rol,
                actualPassword: user.actualPassword
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                rol: '1',
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.petitionGet();
    }

    successButton = () => {
        this.setState({ success: [], error: [], errorc: [] });
    }

    checkAuth = () => {
        if (!localStorage.actualUser || localStorage.actualUser.rol != 2) {
            this.props.navigate('/login');
        }
    }

    render() {
        const { form } = this.state;
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        if (!actualUser || actualUser.rol != 2) {
            localStorage.clear();
            return (
                <Navigate to='/login'/>
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
                <h2 className="display-6">Clientes </h2>
                <div className="mx-auto card">
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsert() }}>Añadir cliente</button>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Email</th>
                                <th>Usuario</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Fecha de Registro</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clients.map((client, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{client.firstName} {client.lastName}</td>
                                        <td>{client.ci}</td>
                                        <td>{client.email}</td>
                                        {this.state.users.map(user => {
                                            if (client.userId == user._id) {
                                                return (
                                                    <td>{user.userName}</td>
                                                )
                                            }
                                        })}
                                        <td>{client.birthDate}</td>
                                        <td>{client.date.substring(0, 10)}</td>
                                        <td>
                                            {this.state.users.map(user => {
                                                if (client.userId == user._id) {
                                                    return (
                                                        <div>
                                                            <button className="btn btn-primary rounded-circle py-1 px-2" onClick={() => { this.selectClient(client, user); this.modalUpdate() }}><FontAwesomeIcon icon={faEdit} /></button>
                                                            {"   "}
                                                            <button className="btn btn-danger rounded-circle py-1 px-2" onClick={() => { this.selectClient(client, user); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader style={{ display: 'block', position: 'relative' }}>
                        <h3>Nuevo Cliente</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.modalInsert()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className="card">
                                {this.state.errorc.length > 0 ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {this.state.errorc.map((errors) => {
                                            return (
                                                <div>- {errors.message}</div>
                                            )
                                        })}
                                        
                                    </div>
                                    : ''
                                }

                                <div className="card-body">
                                    <div className="form-group">
                                        <input type="text" name="firstName" id="firstName" className="form-control mb-3" title="First Name"
                                            placeholder="Nombre" value={form ? form.firstName : ''} autoFocus onChange={this.handleChange} />
                                        <input type="text" name="lastName" id="lastName" className="form-control mb-3" title="Last Name"
                                            placeholder="Apellido" value={form ? form.lastName : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group ">
                                        <input type="text" name="ci" id="ci" className="form-control mb-3" title="CI" placeholder="Cédula" value={form ? form.ci : ''} onChange={this.handleChange} />
                                        <input type="email" name="email" id="email" className="form-control mb-3" title="Email"
                                            placeholder="Email" value={form ? form.email : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-floating">
                                        <input type="date" name="birthDate" id="dateBirth" className="form-control mb-3 form-floating"
                                            title="Date of Birth" value={form ? form.birthDate : ''} onChange={this.handleChange} />
                                        <label for="birthDate">Fecha de Nacimiento</label>
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <input type="text" name="userName" id="userName" className="form-control mb-3" title="User"
                                            placeholder="Usuario" value={form ? form.userName : ''} onChange={this.handleChange} />
                                        <input type="password" name="password" id="password" className="form-control mb-3" title="Password"
                                            placeholder="Contraseña" value={form ? form.password : ''} onChange={this.handleChange} />
                                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control mb-3"
                                            title="Confirm Password" placeholder="Confirmar Contraseña" value={form ? form.confirmPassword : ''} onChange={this.handleChange} />
                                        <input type="hidden" name="rol" id="rol" value={form ? form.rol : '2'} onChange={this.handleChange} />
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
                        <h3>Actualizar Cliente</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.modalUpdate()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className="card">
                                {this.state.errorc.length > 0 ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {this.state.errorc.map((errors) => {
                                            return (
                                                <div>- {errors.message}</div>
                                            )
                                        })}
                                        
                                    </div>
                                    : ''
                                }

                                <div className="card-body">
                                    <div className="form-group">
                                        <input type="text" name="firstName" id="firstName" className="form-control mb-3" title="First Name"
                                            placeholder="Nombre" value={form ? form.firstName : ''} autofocus onChange={this.handleChange} />
                                        <input type="text" name="lastName" id="lastName" className="form-control mb-3" title="Last Name"
                                            placeholder="Apellido" value={form ? form.lastName : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group ">
                                        <input type="text" name="ci" id="ci" className="form-control mb-3" title="CI" placeholder="Cédula" value={form ? form.ci : ''} onChange={this.handleChange} readOnly />
                                        <input type="email" name="email" id="email" className="form-control mb-3" title="Email"
                                            placeholder="Email" value={form ? form.email : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-floating">
                                        <input type="date" name="birthDate" id="dateBirth" className="form-control mb-3 form-floating"
                                            title="Date of Birth" value={form ? form.birthDate : ''} onChange={this.handleChange} />
                                        <label for="birthDate">Fecha de Nacimiento</label>
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <input type="text" name="userName" id="userName" className="form-control mb-3" title="User"
                                            placeholder="Usuario" value={form ? form.userName : ''} onChange={this.handleChange} readOnly />
                                        <input type="password" name="actualPassword" id="actualPassword" className="form-control mb-3" title="Contraseña Actual"
                                            placeholder="Contraseña Actual" value={form ? form.actualPassword : ''} onChange={this.handleChange} />
                                        <input type="password" name="password" id="password" className="form-control mb-3" title="Password"
                                            placeholder="Contraseña" onChange={this.handleChange} />
                                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control mb-3"
                                            title="Confirm Password" placeholder="Confirmar Contraseña" value={form ? form.confirmPassword : ''} onChange={this.handleChange} />
                                        <input type="hidden" name="rol" id="rol" value={form ? form.rol : '2'} onChange={this.handleChange} />
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
                        ¿Estás seguro que deseas eliminar al cliente <b>{form && form.firstName} {form && form.lastName}</b>?
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
