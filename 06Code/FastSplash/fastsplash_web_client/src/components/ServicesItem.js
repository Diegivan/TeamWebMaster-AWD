import React, {Component} from 'react'
import axios from 'axios';


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
               
                <div className="col-md-3">
                    
                     <div className="list-group text-center my-4">
									<div className="list-group-item text-white bg-dark">
										<h5 class="text-center my-1">{this.state.item.name} </h5>
									</div>
                                    
									<div className="list-group-item text-uppercase font-weight-bold">
                                        <a><strong> servicio cuenta con:</strong></a>
										{this.state.item.description}
									</div>
                                    <div className="list-group-item text-uppercase font-weight-bold">
                                          <a><strong>Precio dolares americanos</strong></a>
                                          {this.state.item.price}
									</div>
                                   <div className="list-group-item">
										<button class="btn btn-success btn-1g btn-block text-truncate">Estoy interesado!</button>
									</div>
					</div>
       
    </div>
    
              
               
            )                    
        }
        
    

    }

    
    export default ServicesItem;