import { Col, Container, Row } from 'reactstrap';
import Login from "./Login";
import Registro from "./Registro";
import styled from 'styled-components';

const Or = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #EE5D6E;
    margin-top: 77px;
    color: #E6F8F7;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
`;

const ContainerLogin = (props) => {

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col sm={4} >
                    <Registro onLogin={(value) => props.onLogin(value)} />
                </Col>
                <Or >
                    OR
                </Or>
                <Col sm={4} >
                    <Login onLogin={(value) => props.onLogin(value)} />
                </Col>
            </Row>
        </Container>
    );
}

export default ContainerLogin;