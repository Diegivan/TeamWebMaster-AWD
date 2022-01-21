import React,{Component} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';



export default class FormAppointments extends Component {
    state = {
        appointments:[],
        Name:'',
        Adress:'',
        Reference:'',
        Date:'',
        Plate:'',
        cars:'',
        services:'',
        hours:'',
        status:'',
        Obs:''
    }
    onSubmit =  e => {
        axios.post('http://localhost:8085/appointment',{
        Name: this.state.appointmentsName,
        Adress: this.state.appointmentsAdress,
        Reference: this.state.appointmentsReference,
        Date: this.state.appointmentsDate,
        Plate: this.state.appointmentsPlate,
        cars: this.state.appointmentsCars,
        services: this.state.appointmentsServices,
        hours: this.state.appointmentsHours,
        status: this.state.appointmentsStatus,
        Obs: this.state.appointmentsObs
        })
        e.preventDefault();
        this.setState({appointmentsName:''});
        this.setState({appointmentsAdress:''});
        this.setState({appointmentsReference:''});
        this.setState({appointmentsDate:''});
        this.setState({appointmentsPlate:''});
        this.setState({appointmentsCars:''});
        this.setState({appointmentsServices:''});
        this.setState({appointmentsHours:''});
        this.setState({appointmentsStatus:''});
        this.setState({appointmentsObs:''});

    }
    onChangeAppointmentsName = (e) => {
        this.setState({
            appointmentsName:e.target.value
        })

    }

    onChangeAppointmentsAdress = (e) => {
        this.setState({
            appointmentsAdress:e.target.value
        })

    }
    onChangeAppointmentsReference = (e) => {
        this.setState({
            appointmentsReference:e.target.value
        })

    }
    onChangeAppointmentsDate = (e) => {
        this.setState({
            appointmentsDate:e.target.value
        })

     }
     onChangeAppointmentsPlate = (e) => {
        this.setState({
            appointmentsPlate:e.target.value
        })

     }
     onChangeAppointmentsCars = (e) => {
        this.setState({
            appointmentsCars:e.target.value
        })

     }
     onChangeAppointmentsServices = (e) => {
        this.setState({
            appointmentsServices:e.target.value
        })

     }
     onChangeAppointmentsHours = (e) => {
        this.setState({
            appointmentsHours:e.target.value
        })

     }
     onChangeAppointmentsStatus = (e) => {
        this.setState({
            appointmentsStatus:e.target.value
        })

     }
     onChangeAppointmentsObs = (e) => {
        this.setState({
            appointmentsObs:e.target.value
        })

    }

    render(){

    return(
        <div className="container">
         <form onSubmit={this.onSubmit} className='form-group border rounded col-sm-6'>
        
         <div className='input-field p-3 col-5'>
            <TextField id="standard-basic" label="Nombre de solicitante:" variant="outlined" name='AppointmentsName' value={this.state.appointmentsName}  onChange={this.onChangeAppointmentsName}/>     
            </div>
            <div className='input-field p-3 col-5'>
            <TextField id="standard-basic" label="Direccion de domicilio:" variant="outlined" name='AppointmentsAdress' value={this.state.appointmentsAdress}  onChange={this.onChangeAppointmentsAdress}/>     
            </div>
            <div className='input-field p-3 col-5'>
            <TextField id="standard-basic" label="Referencia de domicilio:" variant="outlined" name='AppointmentsReference' value={this.state.appointmentsReference}  onChange={this.onChangeAppointmentsReference}/>     
            </div>
            <div className='input-field p-3 col-5 '> 
            <TextField id="standard-basic" label="Fecha del servicio:"  type='date' variant="outlined" name='AppointmentsDate' value={this.state.appointmentsDate}  onChange={this.onChangeAppointmentsDate}/>     
            </div> 
            <div className='input-field p-3 col-5 '>  
            <TextField id="standard-basic" label="Placa del vehiculo:" variant="outlined" name='AppointmentsPlate' value={this.state.appointmentsPlate}  onChange={this.onChangeAppointmentsPlate}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.appointmentsServices || ''}
    label="Servicio"
    onChange={this.onChangeAppointmentsServices}
  >
    <MenuItem value='Lavado Encerado'>Lavado Encerado</MenuItem>
    <MenuItem value='Espumoso'>Espumoso</MenuItem>
    <MenuItem value='Ultra Mega Lavado'>Ultra Mega Lavado</MenuItem>
    <MenuItem value='Lavado con Espuma y Cera'>Lavado con Espuma y Cera</MenuItem>
    <MenuItem value='Lavado con Grasa'>Lavado con Grasa</MenuItem>

  </Select>            
            </div>
            <div className='input-field p-3 col-5 '>  
            <InputLabel id="demo-simple-select-label">Cars</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.appointmentsCars || ''}
    label="Cars"
    onChange={this.onChangeAppointmentsCars}
  >
    <MenuItem value='Chevrolet'>Chevrolet</MenuItem>
    <MenuItem value='Kia'>Kia</MenuItem>
    <MenuItem value='Toyota'>Toyota</MenuItem>
    <MenuItem value='Haval'>Haval</MenuItem>
    <MenuItem value='Mazda'>Mazda</MenuItem>

  </Select>             
            </div>
            <div className='input-field p-3 col-5 '>  
            <InputLabel id="demo-simple-select-label">Hours</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.appointmentsHours || ''}
    label="Hours"
    onChange={this.onChangeAppointmentsHours}
  >
    <MenuItem value='8:30-9:30'>8:30-9:30</MenuItem>
    <MenuItem value='10:30-11:30'>10:30-11:30</MenuItem>
    <MenuItem value='12:30-13:30'>12:30-13:30</MenuItem>
    <MenuItem value='12:30-13:30'>14:30-15:30</MenuItem>
    <MenuItem value='16:30-17:30'>16:30-17:30</MenuItem>

  </Select>  
            </div>
            <div className='input-field p-3 col-5 '> 
            <TextField id="standard-basic" label="Status del servicio:"  type='text' variant="outlined" name='AppointmentsStatus' value={this.state.appointmentsStatus} onChange={this.onChangeAppointmentsStatus}  />     
            </div> 
            <div className='input-field p-3 col-5'>
            <TextField id="standard-basic" label="Obs de vehiculo:" variant="outlined" name='AppointmentsObs' value={this.state.appointmentsObs}   onChange={this.onChangeAppointmentsObs}/>     
            </div>
            <div className='input-field p-3'>  
                <button type='Submit'>Enviar</button>
            </div>
         </form>
        </div>
    )}
}
