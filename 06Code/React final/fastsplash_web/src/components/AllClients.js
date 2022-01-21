import React,{Component} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import ClientsItem from './ClientsItem'

class AllClients extends Component {

    constructor(){
        super();
        this.state={
            clients:[], id:''
            
        }
    }

    componentDidMount(){
        this.getClients();
    }

    getClients(){
        axios.get('http://localhost:8085/admin/clients')
        .then(response => {
            this.setState({clients: response.data.clients},() => {

                //console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }
    render(){
        const clientItems = this.state.clients.map((client) => {

            return(
                <ClientsItem key={client._id} item={client}/>
            )
        })

        return(
            <div>
           
                    <div className="container">
                    <div className="col-sm-12 p-4">
                    <h2 className=" p-2">Clientes:</h2>
                    </div>
                    <div className="col-sm-12 ">{clientItems}</div><br/>
                    
                    </div>                  

            </div>

        )
    }
}

export default AllClients