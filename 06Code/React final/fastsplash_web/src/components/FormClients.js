import React,{Component} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';



export default class FormClients extends Component {
    state = {
        clients:[],
        firstName:'',
        lastName:'',
        ci:'',
        email:'',
        birthDate:'',
        userName:'',
        password:'',
        confirmPassword:'',
        rol:''
    
    }
    onSubmit =  e => {
        axios.post('http://localhost:8085/clients/new',{
            firstName:this.state.clientsFirstName,
            lastName:this.state.clientsLastName,
            ci:this.state.clientsCi,
            email:this.state.clientsEmail,
            birthDate:this.state.clientsBirthDate,
            userName:this.state.clientsUserName,
            password:this.state.clientsPassword,
            confirmPassword:this.state.clientsConfirmPassword,
            rol:this.state.clientsRol

        })
        e.preventDefault();
        this.setState({clientsFirstName:''});
        this.setState({clientsLastName:''});
        this.setState({clientsCi:''});
        this.setState({clientsEmail:''});
        this.setState({clientsBirthDate:''});
        this.setState({clientsUserName:''});
        this.setState({clientsPassword:''});
        this.setState({clientsConfirmPassword:''});
        this.setState({clientsRol:''});

    }
    
    onChangeClientsFirstName = (e) => {
        this.setState({
            clientsFirstName:e.target.value
        })

     }
    onChangeClientsLastName= (e) => {
        this.setState({
            clientsLastName:e.target.value
        })

     }
    onChangeClientsCI= (e) => {
        this.setState({
            clientsCi:e.target.value
        })

    }
    onChangeClientsEmail= (e) => {
        this.setState({
            clientsEmail:e.target.value
        })

    }
    onChangeClientsBirthDate= (e) => {
        this.setState({
            clientsBirthDate:e.target.value
        })

    }

    onChangeClientsUserName= (e) => {
        this.setState({
            clientsUserName:e.target.value
        })

    }
    onChangeClientsPassword= (e) => {
        this.setState({
            clientsPassword:e.target.value
        })

    }
    onChangeClientsConfirmPassword= (e) => {
        this.setState({
            clientsConfirmPassword:e.target.value
        })

    }
    onChangeClientsRol= (e) => {
        this.setState({
            clientsRol:e.target.value
        })

    }

    render(){

    return(
        <div className="container">
         <form onSubmit={this.onSubmit} className='form-group border rounded col-sm-6'>
    
            <div className='input-field p-3 col-5'>
            <TextField  label="Nombre:" variant="outlined" name='clientsFirstName' value={this.state.clientsFirstName}  onChange={this.onChangeClientsFirstName}/>     
            </div>
            <div className='input-field p-3 col-5 '> 
            <TextField  label="Apellido:" variant="outlined" name='clientsLastName' value={this.state.clientsLastName}  onChange={this.onChangeClientsLastName}/>     
            </div> 
            <div className='input-field p-3 col-5 '>  
            <TextField  label="C.I" variant="outlined" name='clientsCI' value={this.state.clientsCi}  onChange={this.onChangeClientsCI}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField  label="email" type='email' variant="outlined" name='clientsEmail' value={this.state.clientsEmail}  onChange={this.onChangeClientsEmail}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField  label="Fecha de nacimiento" type='date' variant="outlined" name='clientsBirthDate' value={this.state.clientsBirthDate}  onChange={this.onChangeClientsBirthDate}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField  label="Usuario" variant="outlined" name='clientsUserName' value={this.state.clientsUserName}  onChange={this.onChangeClientsUserName}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField  label="Inserte su clave" type='password' variant="outlined" name='clientsPassword' value={this.state.clientsPassword}  onChange={this.onChangeClientsPassword}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField  label="Confirmar clave" type='password' variant="outlined" name='clientsConfirmPassword' value={this.state.clientsConfirmPassword}  onChange={this.onChangeClientsConfirmPassword}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField  label="Rol 1. Cliente 2. Admin" variant="outlined" type='number' name='clientsRol' value={this.state.clientsRol}  onChange={this.onChangeClientsRol} min="1" max="2"/>     
            </div>
            <div className='input-field p-3'>  
                <button type='Submit'>Enviar</button>
            </div>
         </form>
        </div>
    )}
}
