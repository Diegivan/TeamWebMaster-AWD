import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        axios.post('http://localhost:8085/login/auth', {
            userName: userName,
            password: password
        })
            .then(res => {
                setLoading(false)
                localStorage.setItem('actualUser', JSON.stringify(res.data.actualUser))
                axios.post('http://localhost:8085/login', {
                    userName: userName,
                    password: password
                })
                .then(res => {
                    window.location.href = 'http://localhost:3000/';
                })
                .catch(err => {
                    setLoading(false)
                    setError(err.response.data.error)
                    console.log(err)
                })
                
            })
            .catch(err => {
                setLoading(false)
                setError(err.response.data.error)
                console.log(err)
            })
    }

    return (
        <div>
            {error && <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <div class="col-md-4 mx-auto mt-5 mb-5">
                <div class="card">
                    <div class="card-header">
                        <h3>Iniciar Sesión</h3>
                    </div>
                    <div class="card-body">
                        <div class="form-floating">
                            <input type="text" name="userName" id="userName" class="form-control mb-3" placeholder="Usuario"
                                value={userName} onChange={e => setUserName(e.target.value)} />
                            <label for="userName">Usuario</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" name="password" id="password" class="form-control mb-3" placeholder="Contraseña"
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <label for="password">Contraseña</label>
                        </div>
                        <div class="form-group d-grid">
                            <button type="submit" class="btn btn-primary btn-block" disabled={loading} onClick={handleLogin}>
                                {loading ? "Comprobando..." : "Ingresar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;