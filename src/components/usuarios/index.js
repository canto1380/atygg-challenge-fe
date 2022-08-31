import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { usuariosAPI } from "../../utils/querysAPI/usuariosAPI";
import BotonesMenuUsuarios from "./Botones";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [consultaUsuario, setConsultaUsuarios] = useState(false)

  useEffect(() => {
    consultarUsuarios();
  }, [consultaUsuario]);
  const consultarUsuarios = async () => {
    setUsuarios(await usuariosAPI());
    setConsultaUsuarios(false)
  };
  console.log(usuarios);

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="text-center mt-3">
            <i>Menu Usuarios</i>
          </h1>
        </Col>
      </Row>
      <hr />
      <Row className='justify-content-between mt-5'>
        <Col xs={12} sm={6} md={4}>
          <h4 className='text-dark'>
            <span className=''>
                Listado de Usuarios
            </span>
          </h4>
        </Col>
        <Col xs={2} sm={1}>
            <div className='d-flex justify-content-end'>
              <Link
                className='btn text-dark'
                to={`/usuarios/agregar-usuario`}
                title='Agregar usuario'
              >
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </Link>
            </div>
          </Col>
      </Row>
      <Table size='sm' className='border my-3' striped hover bordered responsive>
        <thead>
          <tr className='text-dark'>
            <th>
              <i>Apellido</i>
            </th>
            <th>
              <i>Nombre</i>
            </th>
            <th>
              <i>Edad</i>
            </th>
            <th>
              <i>Email</i>
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user._id} className="herencia">
              <td>{user.apellido}</td>
              <td>{user.nombre}</td>
              <td>{user.edad}</td>
              <td>{user.email}</td>
              <td>
                <BotonesMenuUsuarios
                    user={user}
                    setConsultaUsuarios={setConsultaUsuarios}
                  ></BotonesMenuUsuarios>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Usuarios;
