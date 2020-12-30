import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Input, FormGroup, Col, Label, Button, Form } from "reactstrap";
import '../Tupper/NewTupper.css';
import styled from 'styled-components';
import UserController from "../../controller/UserController";
import Context from "../../context/Context";
import AccountController from '../../controller/AccountController';

const Foto = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    background-image: url(${props => props.imagSrc});
    background-size: cover;
    background-position: center; 
    border-radius: 20px 0 0 20px;
`;

const TituloSubirTupper = styled.h2`
    font-size: 30px;
    text-align: center;
    font-family: Londrina Solid;
`;

const Editar = (props) => {

    const [tel, setTel] = useState("");
    const [pass, setPass] = useState("");
    const [urlFoto, setUrlFoto] = useState("https://www.eluniversal.com.mx/sites/default/files/u15544/las_mejores_comidas_del_mundo_menu_el_universal_0.jpg");
    const [fotoFlag, setFotoFlag] = useState(false);
    const [selectedFile, setSelectedFile] = useState(false);
    const context = useContext(Context);

    useEffect(() => {
        let { id } = props.match.params;
        UserController.getUser(id, context.token)
            .then((data) => {
                console.log(data.resp)
                setTel(data.resp.phone);
            })
            .catch(err => console.log(err))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const profilePic = new FormData();
        profilePic.append("file", selectedFile);
        if (fotoFlag) {
            UserController.insertOneFoto(profilePic, context.token)
                .then(data => console.log(data))
                .catch(err => console.log(err))
        }
        if (tel !== "") {
            UserController.updatePhone(tel, context.token)
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
        if (pass !== "") {
            AccountController.changePassword(pass, context.token)
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    }

    const handleImageChange = (event) => {
        let file = event.target.files[0];
        setFotoFlag(true);
        setSelectedFile(file);
        setUrlFoto(URL.createObjectURL(file));
    }

    const FotoOrIcon = () => {
        return fotoFlag ? <Foto imagSrc={urlFoto}/> :
            <FormGroup className="image-upload mt-1 ">
                <Label for="file-input" data-toggle="tooltip" data-placement="top" title="Sube tu foto">
                    <i className="fa fa-camera-retro fa-4x " aria-hidden="true" style={{ color: "#EE5D6E", cursor: "cell" }}/>
                </Label>
                <Input id="file-input" type="file" name="customFile" onChange={(e) => handleImageChange(e)} />
            </FormGroup>;
    }

    return (
        <Container fluid >
            <Form onSubmit={(event) => handleSubmit(event)} >
                <TituloSubirTupper>  <i className="fa fa-pencil" aria-hidden="true" />EDITAR PERFIL</TituloSubirTupper>

                <Row className="justify-content-center ">
                    <Col sm={12} md={6}>
                        <Row className="cuerpoNewTupper"/> 
                        <Row className="mt-2 ">
                            <Col sm={6} >
                                <Row style={{ border: "1px solid #E6F8F7", borderRadius: "20px 0 0 20px" }} className="justify-content-center h-100 align-items-center">
                                    <FotoOrIcon />
                                </Row>
                            </Col>
                            <Col style={{ borderRadius: "0 20px 20px 0 " }} sm={6} className="fondoNewTupper ">
                                <Row>
                                    <FormGroup className="col-12 textoNewTupper" >
                                        <Label for="inputName" >Teléfono</Label>
                                        <Input type="text" name="text" id="inputName" placeholder="Introduce el teléfono" value={tel} onChange={(event) => setTel(event.target.value)} />
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup className="col-12 textoNewTupper" >
                                        <Label for="inputName" >Password</Label>
                                        <Input type="text" name="text" id="inputName" placeholder="Introduce el password" value={pass} onChange={(event) => setPass(event.target.value)} />
                                    </FormGroup>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Button className="col-sm-12 col-md-4 text-center boton mt-2 " style={{ backgroundColor: '#EE5D6E', border: "none", color: "#E6F8F7", fontFamily: "Londrina Solid", textAlign: "center" }}>Guardar</Button>
                            <a className="btn col-sm-12 col-md-4 text-center boton mt-2 " href="/perfil" style={{ backgroundColor: '#5b4dda', border: "none", color: "#E6F8F7", fontFamily: "Londrina Solid", textAlign: "center" }} >Cancelar</a>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Editar;