import React, { useState, useEffect, useContext } from "react";
import { MDBCol } from "mdbreact";
import { Container, Collapse, Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Col } from "reactstrap";
import { BrowserRouter, Switch, Route, NavLink, Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import UserController from "./controller/UserController";
import PacmanLoader from "react-spinners/PacmanLoader";
import Tupper from "./components/Tupper/Tupper";
import NewTupper from "./components/Tupper/NewTupper";
import ModTupper from "./components/Tupper/ModTupper";
import Detalle from "./components/Tupper/Detalle";
import MisTuppers from "./components/Profile/MisTuppers";
import Editar from "./components/Profile/Editar";
import SolEntrantes from "./components/Profile/SolEntrantes";
import TuppersOfrecidos from "./components/Profile/TuppersOfrecidos";
import Trueques from "./components/Profile/Trueques";
import Opiniones from "./components/Profile/Opiniones";
import NotFound from "./components/P404";
import styled from "styled-components";
import Context from "./context/Context";
import imagen from './components/Profile/images/images.jpg';
import TokenController from "./controller/TokenController";
import ContainerLogin from "./components/Login/ContainerLogin";
import Logo from './img/logo.png'

const FotoPerfilNav = styled.div`
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: inline-block;
    background-size: cover;
    background-position: center;
    background-image: url( ${props => props.imgSrc});
`;

const App = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [fotoUser, setFotoUser] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const { cookies } = props;
  
    useEffect(() => {
      authenticateToken();
    }, [authenticated]);

    const authenticateToken = () => {
      let token = cookies.get('token');
      if (token !== undefined && token !== null && token !== "") {
        TokenController.authenticateToken(token)
          .then(data => {
            if (data.ok !== false) {
              context.setToken(token);
              UserController.getUser(TokenController.getIdUser(token), token)
                .then((user) => {
                  if (user.ok) {
                    if (user.resp.fotoURL !== null) user.resp.fotoURL = UserController.getUrlFoto(user.resp.fotoURL);
                    setFotoUser(user.resp.fotoURL);
                  };
                })
                .catch(err => console.log(err));
              setAuthenticated(true);
            } else {
              cookies.remove('token', false);
            }
          })
          .catch(error => console.log(error));
      }
    }

    const logout = () => {
      setLoading(true);
      UserController.logout(cookies.get('token'))
        .then(data => {
          cookies.remove('token');
          context.setToken('');
        })
        .then(() => {
          setAuthenticated(false);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        })
    }

    const Inicio = () => {
      if (authenticated && context.token === cookies.get('token')) {
        return (
          <Container fluid>
            <Navbar className="fixed-top p-0 navbarBgColor" light expand="md">
              <Link to="/">
                <div className="ml-3 tuptok" style={{ height: "25px", width: "100px", display: "flex", marginRight: "20px" }}>
                  <img style={{ height: "100%", width: "100%", objectFit: "fill" }} src={Logo} />
                </div>
              </Link>
              <NavLink to="/tupper/newTupper">
                <i className="fa fa-plus-circle fa-2x" aria-hidden="true" style={{ color: "#E6F8F7" }} />
              </NavLink>
              <Collapse navbar>
                <Nav className="ml-auto" navbar >
                  <MDBCol className="d-flex align-items-center">
                    <Input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                  </MDBCol>
                  <UncontrolledDropdown nav className="text-left mr-1">
                    <DropdownToggle nav caret><FotoPerfilNav imgSrc={fotoUser !== null ? fotoUser : imagen}></FotoPerfilNav> </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem><Link to="/profile">Mis tuppers</Link> </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem><Link to={"/profile/editar/" + TokenController.getIdUser(context.token)}>Editar</Link> </DropdownItem>
                      <DropdownItem onClick={() => logout()}>Cerrar sesión</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
            <div style={{ height: "80px" }}/>
            <Switch>
              <Route exact path="/" component={Tupper} />
              <Route exact path="/tupper/newTupper" component={NewTupper} />
              <Route exact path="/tupper/modTupper/:id" component={ModTupper} />
              <Route exact path="/tupper/detalle/:id" component={Detalle} />
              <Route exact path="/profile" component={MisTuppers} />
              <Route exact path="/profile/editar/:id" component={Editar} />
              <Route exact path="/profile/solEntrantes" component={SolEntrantes} />
              <Route exact path="/profile/tuppersOfrecidos" component={TuppersOfrecidos} />
              <Route exact path="/profile/trueques" component={Trueques} />
              <Route exact path="/profile/opiniones" component={Opiniones} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        )
      } else {
        return <ContainerLogin onLogin={(value) => setAuthenticated(value)} />
      }
    }

    if (loading) {
      return (
        <Container fluid className="mt-5 justify-content-center d-flex pt-5">
          <Col sm={9}>
            <PacmanLoader
              size={75}
              color={"#ff0080"}
            />
          </Col>
        </Container>
      );
    }

    return (
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    );
}

export default withCookies(App);