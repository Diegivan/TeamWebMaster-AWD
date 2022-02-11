import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handle = ()=>{
        localStorage.clear();
        window.location.href = 'http://localhost:3028/';
    }
    
    return (
       <div>
           {handle}
       </div>   
    )
}

export default LogOut;