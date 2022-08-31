import React from 'react';
import { Link } from "react-router-dom";


const Index = () => {
    return (
        <div>
        <p>hola</p>

        <Link to={'/usuarios'}>boton</Link>
        </div>
    );
};

export default Index;