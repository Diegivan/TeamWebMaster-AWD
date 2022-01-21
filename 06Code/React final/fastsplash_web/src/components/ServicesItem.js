import React, {Component} from 'react'
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';


    class ServicesItem extends Component{
        constructor(props){
            super(props);
            this.state={
             item:props.item
            }
        }


    deleteService = (id) => {
        axios.delete('http://localhost:8085/admin/delete-service/'+id)

    }


    deleteService 


        render(){
            return(
                
                <div className="col-sm-3 event ">
                                      
                    <h4 className='p-2 event-name-text'><LocalCarWashIcon color="primary" fontSize="large"/> {this.state.item.name}</h4>
                    <p className='align-self-center event-name-text'>Description: {this.state.item.description} </p>
                    <p className='align-self-center event-name-text'>Price: {this.state.item.price}</p>
                    <div className="d-flex flex-row">
                    <div className="p-1"><IconButton type='submit' aria-label="delete" color='error' onClick={() => this.deleteService(this.state.item._id)} size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton> </div>
                    </div>
                    </div>
                
    
            )
        }
        
    

    }

    
    export default ServicesItem;