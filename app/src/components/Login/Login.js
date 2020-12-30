import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../Tupper/NewTupper.css';
import styled from "styled-components";
import AccountController from '../../controller/AccountController';
import Context from "../../context/Context";
import { withCookies } from 'react-cookie';

const Tuptok = styled.h2`
    font-size: 30px;
    text-align: center;
    font-family: Londrina Solid;
    margin-top: 60px;
`;

const LoginUsuario = styled.h3`
    font-family: Londrina Solid;
    font-size: 20px;
    color: #EE5D6E;
    text-align: center;
`;

const ForgotUsuario = styled.h3`
    font-family: Londrina Solid;
    font-size: 15px;
    color: #EE5D6E;
    text-align: right;
`;

const Login = (props) => {

    const context = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        AccountController.loginUser(email, password)
            .then(data => saveCookie(data.token))
            .catch(error => console.log(error));
    }

    const saveCookie = (token) => {
        const { cookies } = props;
        cookies.set('token', token, [{ sameSite: 'none', Secure: true, expires: 120 * 60 * 1000 }]);
        context.setToken(token);
        props.onLogin(true);
    }

    return (
        <Form onSubmit={(event) => handleSubmit(event)}>
            <Tuptok><i className="fa fa-arrow-right" aria-hidden="true"/>
                TUPTOK</Tuptok>
            <LoginUsuario>Bienvenido de nuevo</LoginUsuario>
            <FormGroup className="col-sm-12 cuerpoRegistro" >
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Introduce tu email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </FormGroup>
            <FormGroup className="col-sm-12 cuerpoRegistro" >
                <Label for="examplePassword" styled={{ marginTop: "10px" }}>Contraseña</Label>
                <Input type="password" name="password" id="password" placeholder="introduce tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
            </FormGroup>
            <ForgotUsuario>¿Has olvidado la contraseña?</ForgotUsuario>
            <Button type="submit" className="col-sm-4 col-md-4  justify-content-end text-center boton" style={{ backgroundColor: '#EE5D6E', border: "none", color: "#E6F8F7", fontFamily: "Londrina Solid", textAlign: "center" }}>Log In</Button>
        </Form>
    );
}

export default withCookies(Login);