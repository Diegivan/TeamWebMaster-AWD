import logo from './logo.svg';
import * as React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './users/Login'
import Main from './Main'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Public Routes*/}
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
