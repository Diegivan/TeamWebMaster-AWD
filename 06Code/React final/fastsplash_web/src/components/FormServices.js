import React,{Component} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';



export default class FormServices extends Component {
    state = {
        services:[],
        name:'',
        description:'',
        price:'',
        discount:''
    }
    onSubmit =  e => {
        axios.post('http://localhost:8085/admin/new-services',{
        name: this.state.servicesName,
        description: this.state.servicesDescription,
        price: this.state.servicesPrice,
        discount: this.state.servicesDiscount
        })
        e.preventDefault();
        this.setState({servicesName:''});
        this.setState({servicesDescription:''});
        this.setState({servicesPrice:''});
        this.setState({servicesDiscount:''});
    }
    
    onChangeServicesName = (e) => {
        this.setState({
            servicesName:e.target.value
        })

     }
    onChangeServicesDescription = (e) => {
        this.setState({
            servicesDescription:e.target.value
        })

     }
    onChangeServicesPrice = (e) => {
        this.setState({
            servicesPrice:e.target.value
        })

    }
    onChangeServicesDiscount = (e)=>{
    this.setState({
        servicesDiscount:e.target.value
    })
    }

    render(){

    return(
        <div className="container">
         <form onSubmit={this.onSubmit} className='form-group border rounded col-sm-6'>
        
            <div className='input-field p-3 col-5'>
            <TextField id="standard-basic" label="Nombre del Servicio:" variant="outlined" name='servicesName' value={this.state.servicesName}  onChange={this.onChangeServicesName}/>     
            </div>
            <div className='input-field p-3 col-5 '> 
            <TextField id="standard-basic" label="Descripcion del Servicio:" variant="outlined" name='servicesDescription' value={this.state.servicesDescription}  onChange={this.onChangeServicesDescription}/>     
            </div> 
            <div className='input-field p-3 col-5 '>  
            <TextField id="standard-basic" label="Precio del Servicio:" variant="outlined" name='servicesPrice' value={this.state.servicesPrice}  onChange={this.onChangeServicesPrice}/>     
            </div>
            <div className='input-field p-3 col-5 '>  
            <TextField id="standard-basic" label="Descuento del Servicio:" variant="outlined" name='servicesPrice' value={this.state.servicesDiscount}  onChange={this.onChangeServicesDiscount}/>     
            </div>
            <div className='input-field p-3'>  
                <button type='Submit'>Enviar</button>
            </div>
         </form>
        </div>
    )}
}
