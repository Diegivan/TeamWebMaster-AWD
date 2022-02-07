import logo from './logo.svg';
import Nav from './components/MenuNav';
import Footer from './components/footer';
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";
import Login from './users/Login';
import Main from './components/Main';
import Promotions from './components/promotions';
import AboutUs from './components/aboutUs';
import ContactUs from './components/contactUs';
import Services from './components/services';
import LogOut from './components/logOut';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Public Routes*/}
      <Nav />
      <div className='container'>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/promotions" element={<Promotions/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/logOut" element={<LogOut/>}/>
      </Routes>
      </div>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
