import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Usuarios from './components/usuarios'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/usuarios' element={<Usuarios/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
