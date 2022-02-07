import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'
import api from '../url/axios'

class App extends Component {
    state = {
        clients: [],
        users: [],
        error: [],
        success: [],
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

    petitionPost = async () => {
        delete this.state.form._id;
        if (this.state.form.firstName === '' || this.state.form.lastName === '' || this.state.form.ci === '' ||
            this.state.form.email === '' || this.state.form.birthDate === '' || this.state.form.userName === '' ||
            this.state.form.password === '' || this.state.form.confirmPassword === '' || this.state.form.rol === '') {
            const temp = [];
            temp.push({ message: "Debe llenar todos los campos" });
            this.setState({ error: temp });
        } else if(this.state.form.password !== this.state.form.confirmPassword) {
            const temp = [];
            temp.push({ message: "Las contraseñas no coinciden" });
            this.setState({ error: temp });
        } else {
            await api.post("clients/new", this.state.form).then((response) => {
                if (!response.data.error) {
                    localStorage.setItem('actualUser', JSON.stringify(response.data.newUser))
                    window.location.href = 'http://localhost:3000/';
                } else {
                    this.setState({ error: response.data.error });
                }
                console.log(response, api.getUri, "res");
            }).catch((error) => {
                console.log(error.message, api.getUri, " error");
            })
        }
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

    successButton = () => {
        this.setState({ success: [], error: [] });
    }

    render() {
        const { form } = this.state;
        return (
            <div className="row col-md-5 mx-auto">
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
                <div className="card">
                    <div className='card-header'>
                        <h2 className='display-6'>Registro</h2>
                    </div>
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
                        <hr />
                        <div className="form-group d-flex justify-content-end">
                            <button className="btn btn-success mx-1 px-4" onClick={() => this.petitionPost()}>
                                Registrarse
                            </button>
                            <Link to="/"><button className="btn btn-danger mx-1">Cancelar</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
