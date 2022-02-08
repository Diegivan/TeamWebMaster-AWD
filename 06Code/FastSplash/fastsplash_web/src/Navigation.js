import Nav from './components/MenuNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Public Routes*/}
      
      <Nav />
      
    </BrowserRouter>
  );
}

export default App;
