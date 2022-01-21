import React,{Component} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';



export default class FormAdmins extends Component {
    state = {
        admins:[],
        username:'',
        password:'',
        rol:'',
    }
    onSubmit =  e => {
        axios.post('http://localhost:3000/users',{
        username: this.state.adminsUsername,
        password: this.state.adminsPassword,
        rol: this.state.adminsRol
        })
        e.preventDefault();
        this.setState({adminsUsername:''});
        this.setState({adminsPassword:''});
        this.setState({adminsRol:''});
    }
    
    onChangeAdminsUserName = (e) => {
        this.setState({
            adminsUsername:e.target.value
        })

     }
    onChangeAdminsPassword = (e) => {
        this.setState({
            adminsPassword:e.target.value
        })

     }
    onChangeAdminsRol = (e) => {
        this.setState({
            adminsRol:e.target.value
        })

    }

    render(){

    return(
        <div className="container">
         <form onSubmit={this.onSubmit} className='form-group border rounded col-sm-6'>
        
            <div className='input-field p-3 col-5'>
            <TextField id="standard-basic" label="Usuario:" variant="outlined" name='adminsuserName' value={this.state.adminsUsername}  onChange={this.onChangeAdminsUserName}/>     
            </div>
            <div className='input-field p-3 col-5 '> Admins
            <TextField id="standard-basic" label="Clave:" type="password" variant="outlined" name='adminspassword' value={this.state.adminsPassword}  onChange={this.onChangeAdminsPassword}/>     
            </div> 
            <div className='input-field p-3 col-5 '>  
            <TextField id="standard-basic" label="Rol (1. Admin 2. Usuario):" variant="outlined" name='adminsrol' value={this.state.adminsRol}  onChange={this.onChangeAdminsRol}/>     
            </div>
            <div className='input-field p-3'>  
                <button type='Submit'>Enviar</button>
            </div>
         </form>
        </div>
    )}
}
