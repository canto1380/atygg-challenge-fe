import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './components/Login'
import Usuarios from './components/Usuarios'
import NuevoUsuario from './components/Usuarios/NuevoUsuario'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Index />} />
          <Route exact path='/usuarios' element={<Usuarios />} />
          <Route exact path='/usuarios/agregar-usuario' element={<NuevoUsuario />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
