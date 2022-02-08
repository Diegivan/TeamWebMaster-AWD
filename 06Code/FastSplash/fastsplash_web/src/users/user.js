import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router'
const url = "http://localhost:3027/";

class App extends Component {
    state = {
        users: [],
        error: [],
        success: [],
    }

    petitionGet = () => {
        axios.get(url + "admin/users").then(response => {
            this.setState({ users: response.data.users, error: [] });
        }).catch(error => {
            console.log(error.message);
        })
    }

    successButton = () => {
        this.setState({ success: [], error: [] });
    }

    checkAuth = () => {
        if (!localStorage.actualUser || localStorage.actualUser.rol != 2) {
            this.props.navigate('/login');
        }
    }

    componentDidMount() {
        this.petitionGet();
    }

    handleClickAdmin = () => {
        return (
            <Navigate to='/admin/admins' />
        )
    }

    handleClickClient = () => {
        return (
            <Navigate to='/admin/clients' />
        )
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
            <div className="row col-md-7 mx-auto">
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
                <h2 className="display-6">Usuarios </h2>
                <div className="mx-auto card">
                    <div className="d-flex justify-content-end mt-3">
                        <Link to='/admin/admins'><button className="btn btn-success mx-1">Añadir Administrador</button></Link>
                        <Link to='/admin/clients'><button className="btn btn-success mx-1">Añadir Cliente</button></Link>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.rol == '1' ? 'Cliente' : 'Administrador'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}
export default App;
