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
        admins: [],
        users: [],
        error: [],
        errora: [],
        success: [],
        modalInsert: false,
        modalUpdate: false,
        modalEliminar: false,
        form: {
            _id: '',
            name: '',
            lastname: '',
            CI: '',
            userId: '',
            userName: '',
            password: '',
            rol: '',
            confirmPassword: '',
            actualPassword: '',
        }
    }

    petitionGet = () => {
        axios.get(url + "admin/admins").then(response => {
            this.setState({ admins: response.data.admins, users: response.data.users, error: [] });
        }).catch(error => {
            console.log(error.message);
        })
    }

    petitionPost = async () => {
        const temp = [];
        if (!this.state.form ||  !this.state.form.name || !this.state.form.lastname || !this.state.form.CI ||
            !this.state.form.userName || !this.state.form.password || 
            !this.state.form.confirmPassword || !this.state.form.rol || this.state.form.name === '' || this.state.form.lastname === '' || this.state.form.CI === '' ||
        this.state.form.userName === '' || this.state.form.password === '' || 
        this.state.form.confirmPassword === '' || this.state.form.rol === '') {
            temp.push({ message: "Debe llenar todos los campos" });
            this.setState({ errora: temp });
        }
        else {
            if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(this.state.form.name)) {
                temp.push({ message: "El nombre unicamente debe llevar letras" });
            }
            if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(this.state.form.lastname)) {
                temp.push({ message: "El apellido unicamente debe llevar letras" });
            }
            if ( this.state.form.CI) {
                var total = 0;
                var longitud =  this.state.form.CI.length;
                var longCheck = longitud - 1;
                var message = "";
                var flag = false;

                if (longitud === 10) {
                    if (isNaN( this.state.form.CI)) {
                        temp.push({ message: "La CI solo puede contener numeros" });
                    }
                    else {
                        for (var i = 0; i < longCheck; i++) {
                            if (i === 0) {
                                let firstNumbers = parseInt( this.state.form.CI.charAt(i)) * 10 + parseInt( this.state.form.CI.charAt(i + 1));
                                if (firstNumbers >= 25) {
                                    temp.push({ message: "La CI no corresponde a ninguna provincia" });
                                }
                            }
                            if (i % 2 === 0) {
                                var aux =  this.state.form.CI.charAt(i) * 2;
                                if (aux > 9) aux -= 9;
                                total += aux;
                            } else {
                                total += parseInt( this.state.form.CI.charAt(i));
                            }
                        }

                        total = total % 10 ? 10 - total % 10 : 0;

                        if ( this.state.form.CI.charAt(longitud - 1) != total) {
                            temp.push({ message: "Debe ingresar una CI ecuatoriana" });
                        }
                        else {

                        }
                    }
                }
                else {
                    temp.push({ message: "Debe ingresar 10 digitos en la cedula" });
                }
            }
            if (!/^[a-zA-ZÀ-ÿ0-9-_]{1,20}$/.test(this.state.form.userName)) {
                temp.push({ message: "El nombre de usuario solo puede contener caracteres alfanumericos" });
            }
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,16}$/.test(this.state.form.password)) {
                temp.push({ message: "La contraseña debe tener mínimo una mayúscula, una minúscula y un número" });
                if (this.state.form.password.length < 8) {
                    temp.push({ message: "La contraseña debe ser mayor a 8 caracteres" });
                }
                if (this.state.form.password.length > 16) {
                    temp.push({ message: "La contraseña debe ser menor a 16 caracteres" });
                }
            }
            if (this.state.form.password !== this.state.form.confirmPassword) {
                temp.push({ message: "Las contraseñas no coinciden" });
            }
            if (temp.length == 0) {
                await axios.post(url + "admin/new-admin", this.state.form).then((response) => {
                    if (!response.data.error) {
                        this.modalInsert();
                        const temp = [];
                        temp.push({ message: "Administrador registrado correctamente" });
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
            else {
                this.setState({ errora: temp });
            }
        }
       
    }

    petitionPut = async () => {
        const temp = [];
        if (!this.state.form ||  !this.state.form.name || !this.state.form.lastname || !this.state.form.CI ||
            !this.state.form.userName || !this.state.form.password || 
            !this.state.form.confirmPassword || !this.state.form.rol || this.state.form.name === '' || this.state.form.lastname === '' || this.state.form.CI === '' ||
        this.state.form.userName === '' || this.state.form.password === '' || 
        this.state.form.confirmPassword === '' || this.state.form.rol === '') {
            temp.push({ message: "Debe llenar todos los campos" });
            this.setState({ errora: temp });
        }
        else {
            if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(this.state.form.name)) {
                temp.push({ message: "El nombre unicamente debe llevar letras" });
            }
            if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(this.state.form.lastname)) {
                temp.push({ message: "El apellido unicamente debe llevar letras" });
            }
            if ( this.state.form.CI) {
                var total = 0;
                var longitud =  this.state.form.CI.length;
                var longCheck = longitud - 1;
                var message = "";
                var flag = false;

                if (longitud === 10) {
                    if (isNaN( this.state.form.CI)) {
                        temp.push({ message: "La CI solo puede contener numeros" });
                    }
                    else {
                        for (var i = 0; i < longCheck; i++) {
                            if (i === 0) {
                                let firstNumbers = parseInt( this.state.form.CI.charAt(i)) * 10 + parseInt( this.state.form.CI.charAt(i + 1));
                                if (firstNumbers >= 25) {
                                    temp.push({ message: "La CI no corresponde a ninguna provincia" });
                                }
                            }
                            if (i % 2 === 0) {
                                var aux =  this.state.form.CI.charAt(i) * 2;
                                if (aux > 9) aux -= 9;
                                total += aux;
                            } else {
                                total += parseInt( this.state.form.CI.charAt(i));
                            }
                        }

                        total = total % 10 ? 10 - total % 10 : 0;

                        if ( this.state.form.CI.charAt(longitud - 1) != total) {
                            temp.push({ message: "Debe ingresar una CI ecuatoriana" });
                        }
                        else {

                        }
                    }
                }
                else {
                    temp.push({ message: "Debe ingresar 10 digitos en la cedula" });
                }
            }
            if (!/^[a-zA-ZÀ-ÿ0-9-_]{1,20}$/.test(this.state.form.userName)) {
                temp.push({ message: "El nombre de usuario solo puede contener caracteres alfanumericos" });
            }
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,16}$/.test(this.state.form.password)) {
                temp.push({ message: "La contraseña debe tener mínimo una mayúscula, una minúscula y un número" });
                if (this.state.form.password.length < 8) {
                    temp.push({ message: "La contraseña debe ser mayor a 8 caracteres" });
                }
                if (this.state.form.password.length > 16) {
                    temp.push({ message: "La contraseña debe ser menor a 16 caracteres" });
                }
            }
            if (this.state.form.password !== this.state.form.confirmPassword) {
                temp.push({ message: "Las contraseñas no coinciden" });
            }
            if (temp.length == 0) {
                await axios.put(url + "admin/edit-admins/" + this.state.form._id, this.state.form).then((response) => {
                    if (!response.data.error) {
                        this.modalUpdate();
                        const temp = [];
                        temp.push({ message: "Administrador actualizado correctamente" });
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
            else {
                this.setState({ errora: temp });
            }
        }

    }

    petitionDelete = async () => {
        await axios.delete(url + 'admin/delete/' + this.state.form._id).then(response => {
            this.setState({ modalEliminar: false });
            const temp = [];
            temp.push({ message: "Administrador eliminado correctamente" });
            this.setState({ success: temp });
            this.petitionGet();
        })
    }

    modalInsert = () => {
        this.setState({ modalInsert: !this.state.modalInsert, error: [], errora: [] });
    }

    modalUpdate = () => {
        this.setState({ modalUpdate: !this.state.modalUpdate, error: [], errora: [] });
    }

    selectAdmin = (admin, user) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: admin._id,
                name: admin.name,
                lastname: admin.lastname,
                CI: admin.CI,
                userId: admin.userId,
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
                rol: '2',
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
                <h2 className="display-6">Administradores </h2>
                <div className="mx-auto card">
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsert() }}>Añadir Administrador</button>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Usuario</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admins.map((admin, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{admin.name} {admin.lastname}</td>
                                        <td>{admin.CI}</td>
                                        {this.state.users.map(user => {
                                            if (admin.userId == user._id) {
                                                return (
                                                    <td>{user.userName}</td>
                                                )
                                            }
                                        })}
                                        <td>
                                            {this.state.users.map(user => {
                                                if (admin.userId == user._id) {
                                                    return (
                                                        <div>
                                                            <button className="btn btn-primary rounded-circle py-1 px-2" onClick={() => { this.selectAdmin(admin, user); this.modalUpdate() }}><FontAwesomeIcon icon={faEdit} /></button>
                                                            {"   "}
                                                            <button className="btn btn-danger rounded-circle py-1 px-2" onClick={() => { this.selectAdmin(admin, user); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                        <h3>Nuevo Administrador</h3>
                        <span style={{ cursor: 'pointer', position: 'absolute', top: '20%', right: '1.5em' }} onClick={() => this.modalInsert()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className="card">
                                {this.state.errora.length > 0 ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {this.state.errora.map((errors) => {
                                            return (
                                                <div>- {errors.message}</div>
                                            )
                                        })}
                                    </div>
                                    : ''
                                }

                                <div className="card-body">
                                    <div className="form-group">
                                        <input type="text" name="name" id="name" className="form-control mb-3" title="First Name"
                                            placeholder="Nombre" value={form ? form.name : ''} autoFocus onChange={this.handleChange} />
                                        <input type="text" name="lastname" id="lastname" className="form-control mb-3" title="Last Name"
                                            placeholder="Apellido" value={form ? form.lastname : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group ">
                                        <input type="text" name="CI" id="CI" className="form-control mb-3" title="Cédula" placeholder="Cédula" value={form ? form.CI : ''} onChange={this.handleChange} />
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <input type="text" name="userName" id="userName" className="form-control mb-3" title="User"
                                            placeholder="Usuario" value={form ? form.userName : ''} onChange={this.handleChange} />
                                        <input type="password" name="password" id="password" className="form-control mb-3" title="Password"
                                            placeholder="Contraseña" value={form ? form.password : ''} onChange={this.handleChange} />
                                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control mb-3"
                                            title="Confirm Password" placeholder="Confirmar Contraseña" value={form ? form.confirmPassword : ''} onChange={this.handleChange} />
                                        <input type="hidden" name="rol" id="rol" value={form ? form.rol : '1'} onChange={this.handleChange} />
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
                                {this.state.errora.length > 0 ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {this.state.errora.map((errors) => {
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
                                        <input type="text" name="name" id="name" className="form-control mb-3" title="First Name"
                                            placeholder="Nombre" value={form ? form.name : ''} autofocus onChange={this.handleChange} />
                                        <input type="text" name="lastname" id="lastname" className="form-control mb-3" title="Last Name"
                                            placeholder="Apellido" value={form ? form.lastname : ''} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group ">
                                        <input type="text" name="CI" id="CI" className="form-control mb-3" title="CI" placeholder="Cédula" value={form ? form.CI : ''} onChange={this.handleChange} readOnly />
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
                                        <input type="hidden" name="rol" id="rol" value={form ? form.rol : '1'} onChange={this.handleChange} />
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
                        ¿Estás seguro que deseas eliminar al Administrador <b>{form && form.name} {form && form.lastname}</b>?
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
