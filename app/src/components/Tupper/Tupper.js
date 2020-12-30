import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, FormGroup, Label, CustomInput } from "reactstrap";
import Context from "../../context/Context";
import { Link } from "react-router-dom";

import styled from "styled-components";
import StarFixed from "../StarFixed";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TuperController from '../../controller/TuperController';
import './NewTupper.css';
import TokenController from "../../controller/TokenController";

// ----- iconos alergias ----//
import Vegan from "../imgAler/vegan.png";
import Vegetarian from "../imgAler/vegetarian.png";
import LactosaFree from "../imgAler/lactosaFree.png";
import SinGluten from "../imgAler/sinGluten.png";
import PeanutFree from "../imgAler/peanutFree.png";

const Foto = styled.div`
    width: 90%;
    height: 200px;
    display: inline-block;
    background-image: url(${props => props.imagSrc});
    background-size: cover;
    background-position: center;
    border-radius: 20px 20px 0 0;
`;

const Box = styled.div`
    display: flex;
    flex-flow: column wrap;
    width: 100vw;
    max-height: 150vh;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    margin-Top: 10px;
    font-Size: 25px;
    margin-left: 20px;
    font-family: 'Londrina Solid', cursive;
`;

const Info = styled.div`
    font-family: Trispace, sans-serif;
    background-color: #E6F8F7;
    width: 90%;
    margin-bottom: 15px;
    border-radius: 0 0 20px 20px;
`;

const Description = styled.div`
    font-Size: 13px; 
    text-align: justify;
    font-weight: bold;
    overflow: visible; 
    height: 80px;
    padding: 10px;
`;

const Usuario = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5px; 
    font-Size: 13px;
    color: #EE5D6E;
`;

const Separador = styled.div`
    height: 5px;
    background-color: white;
`;

const Divider = styled.div`
    border-left: 3px solid #EE5D6E;
`;

const Botones = styled.div`
    display: flex;
    justify-Content: space-around;
    margin-Bottom: 20px;
    margin-top: 20px;
`;

const Titulo = styled.h2`
    font-Family: 'Londrina Solid', cursive;
`;

const TupperParaTi = styled.h2`
    font-Family: 'Londrina Solid', cursive;
    margin-top: 20px;
    text-align: center;
`;

const Iconos = styled.div`
    text-align: right;
    margin-bottom: 10px;
    margin-right: 10px;
`;

const Tupper = () => {

    const context = useContext(Context);
    const [listaTupers, setListaTupers] = useState([]);
    const [filtroAlergias, setFiltroAlergias] = useState("false");
    const [filtroTok, setFiltroTok] = useState("false");

    useEffect(() => {
        let idUsuario = TokenController.getIdUser(context.token);
        TuperController.getAll(context.token)
            .then(data => {
                if (data.ok === false) {
                    setListaTupers([]);
                } else {
                    let tupers = data.resp.filter((el) => el.usuarios_id_usuarios !== idUsuario).map((el) => {
                        el.urlFoto = TuperController.getUrlFoto(el.urlFoto);
                        return el;
                    })
                    if (filtroAlergias !== "false") tupers = tupers.filter(el => el[filtroAlergias] === true);
                    if (filtroTok !== "false") tupers = tupers.filter(el => el.valor_tamano === parseInt(filtroTok));
                    setListaTupers(tupers);
                }
            })
            .catch(err => console.log(err));

    }, [filtroAlergias, filtroTok]);

    //del Range----------------------- Slider
    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });

    function valuetext(value) {
        return `${value}°C`;
    }

    const classes = useStyles();

    //------------------------------------
    const tuppers = listaTupers.length === 0 ? <p>No se han encontrado tupers</p> : listaTupers.map((el) => (
        <Box key={el.id} className="col-lg-3  col-sm-6 col-12">
            <Foto imagSrc={el.urlFoto} />
            <Info>
                <Title>
                    {el.titulo}
                </Title>
                <Usuario>
                    <p style={{ marginRight: '5px' }}>{el.usuario.email.split('@')[0]}</p>
                    <StarFixed valor={1 + (Math.random() * (5 - 1))} />
                </Usuario>
                <Description>
                    {el.descripcion}
                </Description>
                {/* ------iconos alergias------- */}
                <Iconos>
                    {el.vegetarian ? <img style={{ width: "25px", height: "25px", marginRight: "5px" }} src={Vegetarian} alt="Vegetarian"/> : null}
                    {el.vegan ? <img style={{ width: "25px", height: "25px", marginRight: "5px" }} src={Vegan} alt="Vegan"/> : null}
                    {el.hasGluten ? <img style={{ width: "25px", height: "25px", marginRight: "5px" }} src={SinGluten} alt="SinGluten"/> : null}
                    {el.hasLactosa ? <img style={{ width: "25px", height: "25px", marginRight: "5px" }} src={LactosaFree} alt="LactosaFree"/> : null}
                    {el.hasFrutosSecos ? <img style={{ width: "25px", height: "25px", marginRight: "5px" }} src={PeanutFree} alt="PeanutFree"/> : null}
                </Iconos>
                <Separador />
                <Botones>
                    <Link to={"/tupper/detalle/" + el.id}>
                        <i className="fa fa-eye fa-2x" aria-hidden="true" style={{ color: "#EE5D6E", cursor: "pointer" }}/>
                    </Link>
                    <Divider />
                    <i className="fa fa-heart-o fa-2x" aria-hidden="true" style={{ color: "#EE5D6E", cursor: "pointer" }}/>
                </Botones>
            </Info>
        </Box>
    ));
    return (
        <Container fluid >
            <Row>
                <Titulo>Quiero mi tupper:</Titulo>
            </Row>
            <Row className="filtros Justify-content-around">
                <Col className="col-md-4 col-sm-12 col-12 text-center p-3" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Londrina Solid " }}>
                    <FormGroup>
                        <Label for="exampleCustomSelect">Apto para:</Label>
                        <CustomInput type="select" onChange={(e) => setFiltroAlergias(e.target.value)} id="exampleCustomSelect" name="customSelect" style={{ backgroundColor: '#EE5D6E', border: "none", color: "#E6F8F7", borderRadius: "5px" }}>
                            <option value="false">Sin Filtro</option>
                            <option value="vegan">Vegano</option>
                            <option value="vegetarian">Vegetariano</option>
                            <option value="hasFrutosSecos">Sin Frutos Secos</option>
                            <option value="hasLactosa">Sin Lactosa</option>
                            <option value="hasGluten">Sin Gluten</option>
                        </CustomInput>
                    </FormGroup>
                </Col>
                <Col className="col-md-4 col-sm-12 col-12 text-center" style={{ fontFamily: "Londrina Solid " }}>
                    <FormGroup onChange={(e) => setFiltroTok(e.target.value)}>
                        <Label for="customRadio" />
                        <div>
                            <CustomInput type="radio" value={1} id="exampleCustomRadio1" name="customRadio" label="1 Tok" inline />
                            <CustomInput type="radio" value={2} id="exampleCustomRadio2" name="customRadio" label="2 Tok" inline />
                            <CustomInput type="radio" value={3} id="exampleCustomRadio3" name="customRadio" label="3 Tok" inline />
                            <CustomInput type="radio" value={0} id="exampleCustomRadio4" name="customRadio" label="Solo acepto Tup" inline />
                            <CustomInput type="radio" value={false} id="exampleCustomRadio5" name="customRadio" label="Sin filtro" inline />
                        </div>
                    </FormGroup>
                </Col>
                <Col className="col-md-3 col-sm-12 col-12 d-flex align-items-center text-center "  >
                    <div className={classes.root}>
                        <Typography id="discrete-slider" gutterBottom>
                            Distancia
                        </Typography>
                        <Slider
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={110}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <TupperParaTi>Tuppers para ti:</TupperParaTi>
            </Row>
            <Row style={{ paddingTop: "10px" }} className="w-100">
                {tuppers}
            </Row>
        </Container >
    );
}

export default Tupper;