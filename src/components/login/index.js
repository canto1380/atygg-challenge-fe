import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MsjError from "../../utils/messageError";
import { email, clave } from "../../utils/regularExpressions";
import { authToken } from "../../helpers/helper";

const Index = (props) => {
  const { setTok } = props
  const navigate = useNavigate();
  const urlLogin = `${process.env.REACT_APP_API_URL}/auth`;
  const [userLogin, setUserLogin] = useState({
    email: "",
    clave: "",
  });
  const [err, setErr] = useState(false);
  const [userValid, setUserValid] = useState("");
  const [userInvalid, setUserInvalid] = useState("");
  const [passValid, setPassValid] = useState("");
  const [passInvalid, setPassInvalid] = useState("");

  const handleValores = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const validaUsuario = () => {
    setUserValid("");
    setUserInvalid("");
    const mail = email;
    if (userLogin.email.trim() !== "" && mail.test(userLogin.email)) {
      setUserValid(true);
      return false;
    } else {
      setUserInvalid(true);
      return true;
    }
  };

  const validaClave = () => {
    setPassValid("");
    setPassInvalid("");
    const pass = clave;
    if (userLogin.clave.trim() !== "" && pass.test(userLogin.password)) {
      setPassValid(true);
      return false;
    } else {
      setPassInvalid(true);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validaUsuario() && !validaClave()) {
        setErr(false);
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLogin),
        };
        const response = await fetch(urlLogin, config);
        const inforUsuario = await response.json()
        if (response.status === 201) {
          Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Iniciando sesion',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            navigate('/usuarios')
          }, 2000);
          setTok(inforUsuario)
          authToken(inforUsuario)
        } else if (response.status === 400) {
          setErr(true);
          setTimeout(() => {
            setErr(false);
          }, 2500);
        }
      } else {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
    } catch (error) {
      Swal.fire(
        "A ocurrido un error en el servidor",
        "Por favor intentelo de nuevo mas tarde",
        "error"
      );
    }
  };

  return (
    <Container className="py-5 my-3">
      <div className="">
        <h1 className="text-center display-4 mt-4 mb-3">ATYGG</h1>
      </div>
      <hr />
      <Row className="mt-5 d-flex justify-content-around">
        <Col sm={12} lg={4}>
          <h4 className="text-center">
            <span className=" pb-3 px-3">
              <b>Ingrese a su cuenta</b>
            </span>
          </h4>
          <div>
            <Form
              className="my-4 border border-1 rounded p-4"
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoComplete="username"
                  minLength="15"
                  maxLength="40"
                  type="email"
                  name="email"
                  placeholder="nombre@gmail.com"
                  onChange={handleValores}
                  onBlur={validaUsuario}
                  isValid={userValid}
                  isInvalid={userInvalid}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  Campo Obligatorio, al menos debe contener entre 15 - 40
                  caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="my-4" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  autoComplete="current-password"
                  minLength="8"
                  maxLength="15"
                  type="password"
                  name="clave"
                  onChange={handleValores}
                  onBlur={validaClave}
                  isValid={passValid}
                  isInvalid={passInvalid}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  Campo Obligatorio, al menos debe contener entre 8 - 15
                  caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Button className="my-2 w-100" type="submit">
                <b>Ingresar</b>
              </Button>
              <div>
                {err ? (
                  <MsjError
                    text1="Datos incorrectos"
                    text2="Todos los campos son obligatorios."
                  />
                ) : null}
              </div>
              <div className="text-center">
                <Link to={"/"}>¿Olvidó su clave?</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
