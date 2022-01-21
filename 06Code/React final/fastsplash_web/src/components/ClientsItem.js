import React, {Component} from 'react'
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
    
    
        class ClientsItem extends Component{
            constructor(props){
                super(props);
                this.state={
                 item:props.item
                }
            }
    
    
        deleteClient = (id) => {
            axios.delete('http://localhost:8085/admin/clients/delete/'+id)
    
        }
    
    
        deleteClient 
    
    
            render(){
                return(
                    
                    <div className="col-sm-3 event ">
                                          
                    <h4 className='p-2 event-name-text'><LocalCarWashIcon color="primary" fontSize="large"/> {this.state.item.firstName}</h4>
                    <p className='align-self-center event-name-text'>Apellido: {this.state.item.lastName} </p>
                    <p className='align-self-center event-name-text'>C.I: {this.state.item.ci} </p>
                    <p className='align-self-center event-name-text'>Email: {this.state.item.email}</p>
                    <p className='align-self-center event-name-text'>Fecha Nacimiento: {this.state.item.birthDate}</p>
                    <div className="d-flex flex-row">
                    <div className="p-1"><IconButton type='submit' aria-label="delete" color='error' onClick={() => this.deleteClient(this.state.item._id)} size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton> </div>
                    </div>
                    </div>
                    
        
                )
            }
            
        
    
        }
    
        
        export default ClientsItem;
    
