import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const BotonesMenuUsuarios = (props) => {
  const { user, setConsultaUsuarios } = props;
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "Estas seguro de borrar este usuario?",
      text: "Tenga en cuenta que se lo puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (res) => {
      if(res.isConfirmed) {
        try {
          const urlEliminar = `${process.env.REACT_APP_API_URL}/usuarios/${id}`;
          const config = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          const response = await fetch(urlEliminar, config);
          if(response.status === 200) {
            Swal.fire(
              "Usuario eliminado con exito",
            );
            setConsultaUsuarios(true)
          }
  
        } catch (error) {
          console.log(error)
        }
      }
    });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-evenly">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-2"
            as={Link}
            type="button"
            to={"/"}
            title="Editar usuario"
          >
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
          </Button>
          <Button
            className="mx-2"
            title="Eliminar usuario"
            onClick={() => eliminarUsuario(user._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BotonesMenuUsuarios;
