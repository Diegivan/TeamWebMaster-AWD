import React,{Component} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import AppointmentsItem from './AppointmentsItem';



class AllAppointments extends Component {

    constructor(){
        super();
        this.state={
            appointments:[], id:''
            
        }
    }

    componentDidMount(){
        this.getAppointments();
    }

    getAppointments(){
        axios.get('http://localhost:8085/admin/appointments')
        .then(response => {
            this.setState({appointments: response.data},() => {

                //console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }
    render(){
        const appointmentsItem = this.state.appointments.map((appointment) => {

            return(
                <AppointmentsItem key={appointment._id} item={appointment}/>
            )
        })

        return(
            <div>
           
                    <div className="container">
                    <div className="col-sm-12 p-4">
                    <h2 className=" p-2">Citas Disponibles:</h2>
                    </div>
                    <div className="col-sm-12 ">{appointmentsItem}</div><br/>
                    
                    </div>                  

            </div>

        )
    }
}

export default AllAppointments