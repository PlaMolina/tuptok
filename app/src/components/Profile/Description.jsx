import React, { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import imagen from './images/images.jpg';
import StarFixed from "../StarFixed";
import moneda from "../imgAler/moneda.png";
import Context from "../../context/Context";
import UserController from "../../controller/UserController";
import TokenController from "../../controller/TokenController";
import { Container, Col, Row } from "reactstrap";

const Perfil = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    box-shadow: 0 0 .25em .25em rgba(0, 0, 0, 0.25);
`;

const Money = styled.img`
    display: inline;
    width: 25px; 
    height: 25px;
`;

const Saldo = styled.h6`
    display: inline;
`;

const Usuario = styled.h1`
    font-family: Londrina Solid;
    font-size: 33px;
    background-color: #E6F8F7;
    color: #EE5D6E;
    text-align: center;
    border-radius: 10px;
`;

const Description = () => {

  const context = useContext(Context);
  const [user, setUser] = useState({ email: "", ranking: { titulo: "" } });

  useEffect(() => {
    UserController.getUser(TokenController.getIdUser(context.token), context.token)
      .then((user) => {
        if (user.ok) {
          if (user.resp.fotoURL !== null) user.resp.fotoURL = UserController.getUrlFoto(user.resp.fotoURL);
          setUser(user.resp);
        };
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} className="text-center text-sm-right">
          <Perfil src={user.fotoURL !== null ? user.fotoURL : imagen} />
        </Col>
        <Col xs={12} sm={3} className="text-center text-sm-left">
          <Usuario>{user.email.split("@")[0]}</Usuario>
          <h6>Rango: "{user.ranking.titulo}"</h6>
          <StarFixed valor={2} />
          <div>
            <Saldo>Saldo: {user.tickets}</Saldo>
            <Money src={moneda} alt='moneda' />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Description;
