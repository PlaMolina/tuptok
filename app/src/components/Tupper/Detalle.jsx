import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import styled from 'styled-components';
import icono from '../Profile/images/icono.png';
import imagen from '../Profile/images/images.jpg';

import Modal from './ModalTupers';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TuperController from "../../controller/TuperController";
import Context from "../../context/Context";
import PacmanLoader from "react-spinners/PacmanLoader";
import moneda from "../imgAler/moneda.png";

// ----- iconos alergias ----//
import Vegan from "../imgAler/vegan.png";
import Vegetarian from "../imgAler/vegetarian.png";
import LactosaFree from "../imgAler/lactosaFree.png";
import SinGluten from "../imgAler/sinGluten.png";
import PeanutFree from "../imgAler/peanutFree.png";

const Chip = styled.div`
    display: inline-block;
    padding: 0 25px;                                                                    
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-radius: 25px;
    background-color: #EE5D6E;
    color: white;
`;

const Imagen = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    background-image: url(${props => props.imagSrc});
    background-size: cover;
    background-position: center;
    border-radius: 20px 0 0 0;
`;

const FotoUser = styled.img`
    float: left;
    margin: 0 10px 0 -25px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: solid 1px #EE5D6E;
`;

const TituloSubirTupper = styled.h2`
    font-size: 30px;
    text-align: center;
    font-family: Londrina Solid;
`;

const AnadirTupper = styled.h3`
    font-family: Londrina Solid;
    font-size: 20px;
    color: #EE5D6E;
    text-align: center;
`;

const Nombre = styled.h4`
    font-size: 20px;
    font-family: Londrina Solid;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const NombreIng = styled.h4`
    font-size: 20px;
    font-family: Londrina Solid;
    font-weight: bold;
    margin-top: 10px;
    justify-content: flex-center;
`;

const Descripcion = styled.h4`
    font-size: 17px;
    font-family: Londrina Solid;
    text-align: justify;
`;

const Precio = styled.h4`
    font-size: 17px;
    font-family: Londrina Solid;
    margin-right: 5px;
    margin-bottom: 0;
`;

const Ingredientes = styled.h4`
    font-size: 17px;
    font-family: Londrina Solid;
    margin: 10px;
    margin-left: 20px;
`;

const FechaTuper = styled.h4`
    font-size: 15px;
    font-family: Londrina Solid;
    color: #EE5D6E;
`;

const ofrecerTupperButton = {
    backgroundColor: '#EE5D6E',
    border: "none",
    color: "#E6F8F7",
    fontFamily: "Londrina Solid",
    textAlign: "center",
    height: "50px",
    borderRadius: "30px"
}

const ofrecerTupperRow = {
    backgroundColor: "#E6F8F7",
    postition: "relative",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-between"
}

const Iconos = styled.div`
    text-align: center;
`;

const Detalle = (props) => {

    const [tuper, setTuper] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const context = useContext(Context);

    const DefaultIcon = Leaflet.icon({
        iconUrl: icono,
        iconSize: [40, 40]
    });

    Leaflet.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        let { id } = props.match.params;
        TuperController.getOne(id, context.token)
            .then(data => {
                if (data.ok) {
                    let tap = (data.resp);
                    let obj = {
                        titulo: tap.titulo,
                        desc: tap.descripcion,
                        url: tap.urlFoto,
                        lat: tap.latitud,
                        lon: tap.longitud,
                        valor: tap.valor_tamano,
                        nombreUsuario: tap.usuario.email.split('@')[0],
                        fotoUsuario: tap.usuario.fotoURL,
                        ingredientes: tap.ingredientes.split(", "),
                        fecha: tap.cooking_date,
                        vegetarian: tap.vegetarian,
                        vegan: tap.vegan,
                        gluten: tap.hasGluten,
                        frutosSecos: tap.hasFrutosSecos,
                        lactosa: tap.hasLactosa
                    }
                    setTuper(obj);
                }
            })
            .then(() => setLoading(false))
            .catch(err => console.log(err));
    }, [])

    if (loading) {
        return (
            <Container fluid className="mt-5 justify-content-center d-flex pt-5">
                <Col sm={9}>
                    <PacmanLoader
                        size={75}
                        color={"#ff0070"}
                    />
                </Col>
            </Container>
        );
    }

    const Mapa = () => {
        let posicion = [tuper.lat, tuper.lon];
        return (
            <MapContainer style={{ height: '100%', borderRadius: "20px" }} center={posicion} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'}
                    id="mapbox/light-v10"
                />
                <Marker position={posicion} />
            </MapContainer>
        )
    }

    return (
        <Container fluid >
            <TituloSubirTupper><i class="fa fa-info-circle" aria-hidden="true" />DETALLE TUPPER </TituloSubirTupper>
            <AnadirTupper>Todo sobre el tupper </AnadirTupper>
            <Row className="justify-content-center w-100">
                <Col md={10}>
                    <Row className="p-1" style={ofrecerTupperRow}>
                        <Chip>
                            <FotoUser src={tuper.fotoUsuario !== null ? tuper.fotoUsuario : imagen} width="96" height="96" />
                            <span>{tuper.nombreUsuario}</span>
                        </Chip>
                        <Button onClick={toggle} style={ofrecerTupperButton}>Ofrecer tupper</Button>
                    </Row>
                    <Row>
                        <Col md={6} className="order-2 order-lg-1 mt-2 mb-3 mh-100 h-100">
                            <Row >
                                <Col md={6} className={'p-0'} style={{ backgroundColor: "#E6F8F7", borderRadius: "20px 0 0 0" }} >
                                    <Imagen imagSrc={TuperController.getUrlFoto(tuper.url)}></Imagen>
                                </Col>
                                <Col md={6} style={{ backgroundColor: "#E6F8F7", borderRadius: "0 20px 0 0", textAlign: "end" }}>
                                    <Row style={{ "height": "20%" }} className={"p-2"}><Nombre>{tuper.titulo}</Nombre></Row>
                                    <Row style={{ "height": "20%" }} className={"p-2"}><Descripcion>{tuper.desc} </Descripcion></Row>
                                    <Row className="flex-row p-2" style={{ "height": "60%", "align-items": "flex-end" }}>
                                        {/* ------iconos alergias------- */}
                                        <Iconos className="col-9">
                                            {tuper.vegetarian ? <img style={{ width: "25px", height: "25px", marginRight: "3px" }} src={Vegetarian} alt="Vegetarian" /> : null}
                                            {tuper.vegan ? <img style={{ width: "25px", height: "25px", marginRight: "3px" }} src={Vegan} alt="Vegan" /> : null}
                                            {tuper.gluten ? <img style={{ width: "25px", height: "25px", marginRight: "3px" }} src={SinGluten} alt="SinGluten" /> : null}
                                            {tuper.lactosa ? <img style={{ width: "25px", height: "25px", marginRight: "3px" }} src={LactosaFree} alt="LactosaFree" /> : null}
                                            {tuper.frutosSecos ? <img style={{ width: "25px", height: "25px", marginRight: "3px" }} src={PeanutFree} alt="PeanutFree" /> : null}
                                        </Iconos>
                                        <Col sm={3} className="p-0">
                                            <Precio>{tuper.valor} <img style={{ width: "30px", height: "30px" }} src={moneda} alt="moneda"/></Precio>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mt-2" >
                                <Col md={12} style={{ backgroundColor: "#E6F8F7", borderRadius: "0 0 20px 20px" }}>
                                    <Ingredientes>
                                        <NombreIng>INGREDIENTES:</NombreIng>
                                        <ul>
                                            {
                                                tuper.ingredientes.map((el) => {
                                                    return <li key={el}>{el}</li>;
                                                })
                                            }
                                        </ul>
                                        <div className="d-flex align-items-end justify-content-end">
                                            <FechaTuper>Este tupper se creo el {tuper.fecha}</FechaTuper>
                                        </div>
                                    </Ingredientes>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="order-1 order-lg-2 mt-2 mb-3">
                            <Mapa />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {modal && <Modal modal={modal} setModal={setModal} pago={tuper.valor} tuperI={props.match.params.id} />}
        </Container >
    );
}

export default Detalle;