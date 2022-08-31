import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Image,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import MsjError from "../../utils/messageError";

import {
  nombreApellido,
  edad,
  email,
  clave,
} from "../../utils/regularExpressions";

const NuevoUsuario = (props) => {
  const navigate = useNavigate();
  const urlAgregarUsuario = `${process.env.REACT_APP_API_URL}/usuarios/addUser`;

  const [usuario, setUsuario] = useState({
    apellido: "",
    nombre: "",
    edad: "",
    email: "",
    clave: "",
  });

  const [error, setError] = useState(false);
  const [err1, setErr1] = useState(false); //mensaje de error en valicaciones general
  const [err2, setErr2] = useState(false); //mensaje de error para email en uso
  const handleValores = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  /*States para feedback formulario*/
  const [nomValid, setNomValid] = useState("");
  const [nomInvalid, setNomInvalid] = useState("");
  const [apeValid, setApeValid] = useState("");
  const [apeInvalid, setApeInvalid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [emailInvalid, setEmailInvalid] = useState("");
  const [claveValid, setClaveValid] = useState("");
  const [claveInValid, setClaveInvalid] = useState("");
  const [reClave, setReClave] = useState("");
  const [reClaveValid, setReClaveValid] = useState("");
  const [reClaveInValid, setReClaveInvalid] = useState("");
  const [edadValid, setEdadValid] = useState("");
  const [edadInvalid, setEdadInvalid] = useState("");

  const [vNom, setVNom] = useState(false);
  const [vApe, setVApe] = useState(false);
  const [vEmail, setVEmail] = useState(false);
  const [vClave, setVClave] = useState(false);
  const [vReClave, setVReClave] = useState(false);
  const [vEdad, setVEdad] = useState(false);

  const validarApellido = () => {
    setApeValid("");
    setApeInvalid("");
    let ape = nombreApellido;
    if (usuario.apellido.trim() !== "" && ape.test(usuario.apellido)) {
      setApeValid(true);
      setVApe(true);
    } else {
      setApeInvalid(true);
      setVApe(false);
    }
  };
  const validarNombre = () => {
    setNomValid("");
    setNomInvalid("");
    let nom = nombreApellido;
    if (usuario.nombre.trim() !== "" && nom.test(usuario.nombre)) {
      setNomValid(true);
      setVNom(true);
    } else {
      setNomInvalid(true);
      setVNom(false);
    }
  };

  const validarEdad = () => {
    setEdadValid("");
    setEdadInvalid("");
    let e = edad;
    if (usuario.edad.trim() !== "" && e.test(usuario.edad)) {
      setEdadValid(true);
      setVEdad(true);
    } else {
      setEdadInvalid(true);
      setVEdad(false);
    }
  };

  const validarEmail = () => {
    setEmailInvalid("");
    setEmailValid("");
    let mail = email;
    if (usuario.email.trim() !== "" && mail.test(usuario.email)) {
      setEmailValid(true);
      setVEmail(true);
    } else {
      setEmailInvalid(true);
      setVEmail(false);
    }
  };
  const validarClave = () => {
    setClaveValid("");
    setClaveInvalid("");
    validarReClave();
    let pass = clave;
    if (usuario.clave.trim() !== "" && pass.test(usuario.clave)) {
      setClaveValid(true);
      setVClave(true);
    } else {
      setClaveInvalid(true);
      setVClave(false);
    }
  };
  const validarReClave = () => {
    setReClaveValid("");
    setReClaveInvalid("");
    if (usuario.clave.trim() === reClave) {
      setReClaveValid(true);
      setVReClave(true);
    } else {
      setReClaveInvalid(true);
      setVReClave(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (vApe && vNom && vEdad && vEmail && vClave && vReClave) {
      console.log(usuario);
      setError(false);
      try {
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        };
        const response = await fetch(urlAgregarUsuario, config);
        if (response.status === 201 || response.status === 200) {
          console.log(typeof response.status);
          console.log(typeof 201);
          Swal.fire("Usuario agregado correctamnete");
          e.target.reset();
          navigate("/usuarios");
        } else if (response.status === 400) {
          setErr2(true);
          setTimeout(() => {
            setErr2(false);
          }, 2500);
        }
      } catch (error) {
        Swal.fire(
          "A ocurrido un error en el servidor",
          "Por favor intentelo de nuevo mas tarde",
          "error"
        );
      }
    } else {
      setError(true);
      setErr1(true);
      setTimeout(() => {
        setErr1(false);
      }, 2000);
    }
  };

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-cemter">
        <Col xs={12}>
          <h1 className="text-center mt-3">
            <i>Nuevo usuario</i>
          </h1>
        </Col>
      </Row>
      <hr />
      <Form onSubmit={handleSubmit} className='border border-1 p-4 rounded'>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="">
              <Form.Label className="ps-2 pt-1 rounded-top">
                <b>
                  Apellido<span className="text-danger">*</span>
                </b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su apellido"
                name="apellido"
                onChange={handleValores}
                onBlur={validarApellido}
                minLength="3"
                maxLength="60"
                isValid={apeValid}
                isInvalid={apeInvalid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger ms-2 mb-1 lead"
              >
                <big>
                  <b>Datos incorrectos</b>
                </big>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="">
              <Form.Label className="ps-2 pt-1 rounded-top">
                <b>
                  Nombre<span className="text-danger">*</span>
                </b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre "
                name="nombre"
                onChange={handleValores}
                onBlur={validarNombre}
                maxLength="60"
                isValid={nomValid}
                isInvalid={nomInvalid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger ms-2 mb-1 lead"
              >
                <big>
                  <b>Datos incorrectos</b>
                </big>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mt-2">
              <Form.Label className="ps-2 pt-1 rounded-top">
                <b>
                  Edad<span className="text-danger">*</span>
                </b>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese su edad"
                name="edad"
                onChange={handleValores}
                onBlur={validarEdad}
                minLength="1"
                maxLength="3"
                isValid={edadValid}
                isInvalid={edadInvalid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger ms-2 mb-1 lead"
              >
                <big>
                  <b>Datos incorrectos</b>
                </big>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mt-2">
              <Form.Label className="ps-2 pt-1 rounded-top">
                <b>
                  Email<span className="text-danger">*</span>
                </b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="email"
                autoComplete="username"
                onChange={handleValores}
                onBlur={validarEmail}
                minLength="15"
                maxLength="40"
                isValid={emailValid}
                isInvalid={emailInvalid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger ms-2 mb-1 lead"
              >
                <big>
                  <b>Datos incorrectos</b>
                </big>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <Form.Group className="mt-2 ">
              <Form.Label className="ps-2 pt-1 rounded-top">
                <b>
                  Contraseña<span className="text-danger">*</span>
                </b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                name="clave"
                autoComplete="current-password"
                onChange={handleValores}
                onBlur={validarClave}
                minLength="8"
                maxLength="15"
                isValid={claveValid}
                isInvalid={claveInValid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger ms-2 mb-1 lead"
              >
                <big>
                  <b>
                    Su contraseña debe contener entre 8 y 15 caracteres, letras
                    o números
                  </b>
                </big>{" "}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mt-2 ">
              <Form.Label className="ps-2 pt-1 rounded-top">
                <b>
                  Confirme su contraseña<span className="text-danger">*</span>
                </b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña nuevamente"
                name="clave"
                autoComplete="current-password"
                onChange={(e) => setReClave(e.target.value)}
                onBlur={validarReClave}
                minLength="8"
                maxLength="15"
                isValid={reClaveValid}
                isInvalid={reClaveInValid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger ms-2 mb-1 lead"
              >
                <big>
                  <b>La confirmación de contraseña no coincide.</b>
                </big>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="my-5">
          <Col xs={12}>
          <Button className="w-100 rounded border-0 text-light" type="submit">
            <big>
              <b>Registrarme</b>
            </big>
          </Button>
          </Col>
        </Row>
        {err1 ? (
          <MsjError
            text1="Datos incorrectos"
            text2="Todos los campos son obligatorios."
          />
        ) : null}
        {err2 ? (
          <MsjError
            text1="El email ingresado ya se encuentra registrado"
            text2="Por favor, intente con otra direccion ."
          />
        ) : null}
      </Form>
    </Container>
  );
};

export default NuevoUsuario;
