import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Nav, NavItem } from "reactstrap";
import styled from 'styled-components';

import Description from "./Description";

const activeclassnamenav = 'nav-item-active'

const StyledNav = styled(Nav).attrs({ activeclassnamenav })`
  &.${activeclassnamenav} {
    height: 100px;
    display: flex;
    justifyContent: space-around;
    fontSize: 2em;
`;

const style = {
  textAlign: "center",
  fontFamily: "Londrina Solid",
  color: "#EE5D6E",
  fontSize: "20px"
}

const Perfil = () => {

  return (
    <>
      <Description />
      <StyledNav tabs className="justify-content-around" >
        <Container className=" filtros mt-5">
          <Row>
            <Col md={2}>
              <NavItem>
                <Link to="/profile" style={style} className="nav-link" activeclassnamenavlink="nav-item-active">Mis Tuppers</Link>
              </NavItem>
            </Col>
            <Col md={3}>
              <NavItem>
                <Link to="/profile/solEntrantes" style={style} className="nav-link" activeclassnamenavlink="nav-item-active">Solicitudes entrantes</Link>
              </NavItem>
            </Col>
            <Col md={3}>
              <NavItem>
                <Link to="/profile/tuppersOfrecidos" style={style} className="nav-link" activeclassnamenavlink="nav-item-active">Tuppers ofrecidos</Link>
              </NavItem>
            </Col>
            <Col md={2}>
              <NavItem>
                <Link to="/profile/trueques" style={style} className="nav-link" activeclassnamenavlink="nav-item-active">Trueques</Link>
              </NavItem>
            </Col>
            <Col md={2}>
              <NavItem>
                <Link to="/profile/opiniones" style={style} className="nav-link" activeclassnamenavlink="nav-item-active">Opiniones</Link>
              </NavItem>
            </Col>
          </Row>
        </Container>
      </StyledNav>
    </>
  );
}

export default Perfil;