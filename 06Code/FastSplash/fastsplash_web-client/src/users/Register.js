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
        errorc: [],
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
        const temp = [];
        if (!this.state.form || !this.state.form.firstName || !this.state.form.lastName || !this.state.form.ci ||
            !this.state.form.email || !this.state.form.birthDate || !this.state.form.userName ||
            !this.state.form.password || !this.state.form.confirmPassword || !this.state.form.rol || this.state.form.firstName === '' || this.state.form.lastName === '' || this.state.form.ci === '' ||
            this.state.form.email === '' || this.state.form.birthDate === '' || this.state.form.userName === '' ||
            this.state.form.password === '' || this.state.form.confirmPassword === '' || this.state.form.rol === '') {
            temp.push({ message: "Debe llenar todos los campos" });
            this.setState({ errorc: temp });
        }
        else {
            if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(this.state.form.firstName)) {
                temp.push({ message: "El nombre unicamente debe llevar letras" });
            }
            if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(this.state.form.lastName)) {
                temp.push({ message: "El apellido unicamente debe llevar letras" });
            }
            if (this.state.form.ci) {
                var total = 0;
                var longitud = this.state.form.ci.length;
                var longCheck = longitud - 1;
                var message = "";
                var flag = false;

                if (longitud === 10) {
                    if (isNaN(this.state.form.ci)) {
                        temp.push({ message: "La CI solo puede contener numeros" });
                    }
                    else {
                        for (var i = 0; i < longCheck; i++) {
                            if (i === 0) {
                                let firstNumbers = parseInt(this.state.form.ci.charAt(i)) * 10 + parseInt(this.state.form.ci.charAt(i + 1));
                                if (firstNumbers >= 25) {
                                    temp.push({ message: "La CI no corresponde a ninguna provincia" });
                                }
                            }
                            if (i % 2 === 0) {
                                var aux = this.state.form.ci.charAt(i) * 2;
                                if (aux > 9) aux -= 9;
                                total += aux;
                            } else {
                                total += parseInt(this.state.form.ci.charAt(i));
                            }
                        }

                        total = total % 10 ? 10 - total % 10 : 0;

                        if (this.state.form.ci.charAt(longitud - 1) != total) {
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
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.state.form.email)) {
                temp.push({ message: "El email no sigue el formato: ejemplo@ej.ej" });
            }
            if (this.state.form.birthDate) {
                var today = new Date();
                var yyToday = today.getFullYear();

                var dateArr = this.state.form.birthDate.split("-");
                var yyDate = dateArr[0];
                if (!(((yyToday - yyDate) <= 100) && ((yyToday - yyDate) >= 18))) {
                    temp.push({ message: "No puede ingresar una persona mayor a 100 años o menor a 18" });
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
                await api.post("clients/new", this.state.form).then((response) => {
                    if (!response.data.error) {
                        localStorage.setItem('actualUser', JSON.stringify(response.data.newUser))
                        window.location.href = 'http://localhost:3028/';
                    } else {
                        this.setState({ error: response.data.error });
                    }
                    console.log(response, api.getUri, "res");
                }).catch((error) => {
                    console.log(error.message, api.getUri, " error");
                })
            }
            else {
                this.setState({ errorc: temp });
            }
        }
        /*delete this.state.form._id;
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

            /*await api.post("clients/new", this.state.form).then((response) => {
                if (!response.data.error) {
                    localStorage.setItem('actualUser', JSON.stringify(response.data.newUser))
                    window.location.href = 'http://localhost:3028/';
                } else {
                    this.setState({ error: response.data.error });
                }
                console.log(response, api.getUri, "res");
            }).catch((error) => {
                console.log(error.message, api.getUri, " error");
            })
        }*/
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
                {this.state.errorc.length > 0 ?
                    <div className="alert alert-danger alert-dismissible fade show" role="error">
                        {this.state.errorc.map((error) => {
                            return (
                                <div>- {error.message}</div>
                            )
                        })}
                      
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
