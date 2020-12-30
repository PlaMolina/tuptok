import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../Tupper/NewTupper.css';
import styled from "styled-components";
import AccountController from '../../controller/AccountController';
import { withCookies } from 'react-cookie';
import Context from "../../context/Context";

const Tuptok = styled.h2`
    font-size: 30px;
    text-align: center;
    font-family: Londrina Solid;
    margin-top: 60px;
`;

const AnadirUsuario = styled.h3`
    font-family: Londrina Solid;
    font-size: 20px;
    color: #EE5D6E;
    text-align: center;
`;

const Registro = (props) => {

    const context = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      AccountController.registerUser(email, password, tel)
        .then(data => saveCookie(data.token))
        .catch(error => console.log(error));
    }

    const saveCookie = (token) => {
      const { cookies } = props;
      cookies.set('token', token, [{ sameSite: 'none', secure: true, expires: 120 * 60 * 1000 }]);
      context.setToken(token);
      props.onLogin(true);
    }

    return (
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Tuptok><i className="fa fa-plus" aria-hidden="true" />TUPTOK REGISTRO</Tuptok>
        <AnadirUsuario>¿No tienes cuenta?</AnadirUsuario>
        <FormGroup className="col-12 cuerpoRegistro" >
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Introduce tu email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </FormGroup>
        <FormGroup className="col-12 cuerpoRegistro" >
          <Label for="examplePassword" styled={{ marginTop: "10px" }}>Contraseña</Label>
          <Input type="password" name="password" id="password" placeholder="Introduce tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
        </FormGroup>
        <FormGroup className="col-12 cuerpoRegistro" >
          <Label for="telefono" styled={{ marginTop: "10px" }}>Teléfono</Label>
          <Input type="tel" name="telefono" id="tel" placeholder="Introduce tu número de teléfono" value={tel} onChange={(event) => setTel(event.target.value)} />
        </FormGroup>
        <Button type="submit" className="col-sm-12 col-md-4 text-center boton mb-3" style={{ backgroundColor: '#EE5D6E', border: "none", color: "#E6F8F7", fontFamily: "Londrina Solid", textAlign: "center" }}>Registrame</Button>
      </Form>
    );
}

export default withCookies(Registro);
