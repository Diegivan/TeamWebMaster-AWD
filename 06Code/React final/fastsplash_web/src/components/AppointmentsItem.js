import React, {Component} from 'react'
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';


    class AppointmentsItem extends Component{
        constructor(props){
            super(props);
            this.state={
             item:props.item
            }
        }

    deleteAppointment = (id) => {
        axios.delete('http://localhost:8085/appointments/delete/'+id)

    } 


        render(){
            return(
                
                <div className="col-sm-3 event ">
                                      
                    <h4 className='p-2 event-name-text'><LocalCarWashIcon color="primary" fontSize="large"/> Nombre: {this.state.item.Name}</h4>
                    <p className='align-self-center event-name-text'>Direccion: {this.state.item.Adress} </p>
                    <p className='align-self-center event-name-text'>Referencia: {this.state.item.Reference} </p>
                    <p className='align-self-center event-name-text'>Fecha: {this.state.item.Date}</p>
                    <p className='align-self-center event-name-text'>Placa: {this.state.item.Plate}</p>
                    <p className='align-self-center event-name-text'>Carro: {this.state.item.cars}</p>
                    <p className='align-self-center event-name-text'>Servicio: {this.state.item.services}</p>
                    <p className='align-self-center event-name-text'>Horario: {this.state.item.hours}</p>
                    <p className='align-self-center event-name-text'>Status: {this.state.item.status}</p>
                    <p className='align-self-center event-name-text'>Observacion: {this.state.item.Obs} </p>



                    <div className="d-flex flex-row">
                    <div className="p-1"><IconButton type='submit' aria-label="delete" color='error' onClick={() => this.deleteAppointment(this.state.item._id)} size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton> </div>
                    </div>
                    </div>
                
    
            )
        }

    }
    export default AppointmentsItem;