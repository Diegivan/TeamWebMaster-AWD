import React,{Component} from 'react'
import axios from 'axios'
import ServicesItem from './ServicesItem';

class AllServices extends Component {

    constructor(){
        super();
        this.state={
            services:[], id:''
            
        }
    }

    componentDidMount(){
        this.getServices();
    }

    getServices(){
        axios.get('http://ec2-44-202-44-135.compute-1.amazonaws.com:3027/admin/services')
        .then(response => {
            this.setState({services: response.data.service},() => {

                //console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }
    render(){
        const serviceItems = this.state.services.map((service) => {

            return(
                <ServicesItem key={service._id} item={service}/>
            )
        })

        return(
            <div>
                 
                    <div className="container">
                    <div className="col-sm-12 p-4">
                    <h2 className=" p-2">Servicios Disponibles:</h2>
                    </div>
                    <div className="col-sm-12 "> <div className='row'>{serviceItems}</div></div><br/>
                    
                    </div>                  

            </div>

        )
    }
}

export default AllServices