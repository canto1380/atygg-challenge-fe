import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Index from "./components/Login";
import Usuarios from "./components/Usuarios";
import NuevoUsuario from "./components/Usuarios/NuevoUsuario";
import PaginaError from "./components/PaginaError";

function App() {
  const [tok, setTok] = useState([]);

  useEffect(() => {
    setTok(JSON.parse(localStorage.getItem("jwt-token-atygg")));
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='error-page' element={<PaginaError />} />
          
          {!tok ? (
          <Route exact path="/" element={<Index setTok={setTok} />} />
          ) : (
          <Route path='/' element={<Navigate to="/usuarios" />} />
          )}
          {tok ? (
            <Route exact path="/usuarios" element={<Usuarios />} />
          ) : (
            <Route path='/usuarios' element={<Navigate to="/" />} />
          )}
          {tok ? (
            <Route
              exact
              path="/usuarios/agregar-usuario"
              element={<NuevoUsuario />}
            />
          ) : (
            <Route path='/usuarios/agregar-usuario' element={<Navigate to="/" />} />
          )}
          {tok ? (
            <Route exact path="*" element={<Navigate to='/usuarios' />} />
          ) : (
            <Route exact path="*" element={<Navigate to='/' />} />
            
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
