import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from "styled-components";
import StarFixed from "../StarFixed";
import Context from "../../context/Context";
import TuperController from '../../controller/TuperController';
import OfertasController from "../../controller/OfertasController";
import TokenController from "../../controller/TokenController";

import Perfil from "./Perfil";


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
    margin: 10px;
    font-Size: 13px; 
    text-align: justify;
    font-weight: bold; 
    height: 50px;
`;

const Usuario = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5px; 
    font-Size: 13px;
    color: #EE5D6E;
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

const Separador = styled.div`
    height: 5px;
    background-color: white;
`;

const SolEntrantes = () => {

  const context = useContext(Context);
  const [listaTupers, setListaTupers] = useState([]);
  const [tradeFlag, setTradeFlag] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (tradeFlag) setTradeFlag(false);
    OfertasController.getMyOfertas(TokenController.getIdUser(context.token), context.token)
      .then(data => {
        if (data.ok === false) {
          setListaTupers([]);
        } else {
          console.log(data);
          let tupers = data.resp.filter((el) => el.respuesta === 1).map((el) => {
            el.urlFoto = TuperController.getUrlFoto(el.tuper.urlFoto);
            return el;
          })
          setListaTupers(tupers);
        }
      })
      .catch(err => console.log(err));
  }, [tradeFlag]);

  const tuppers = listaTupers.length === 0 ? null : listaTupers.map((el) => (
    <Box key={el.id} className="col-lg-3 col-sm-6 col-12">
      <Foto imagSrc={el.urlFoto} />
      <Info>
        <Title>
          {el.tuper.titulo}
          <a onClick={toggle}><i className="fa fa-eye " aria-hidden="true" style={{ color: "#EE5D6E", marginLeft: "10px", cursor: "pointer" }}/></a>
        </Title>
        <Usuario >
          <span style={{ marginRight: '5px' }}>{el.usuario.email.split('@')[0]}</span>
          <StarFixed valor={el.id_ranking} />
          <b><i>{el.comentario}</i></b>
        </Usuario>
        <Description>
          {el.tuper.descripcion}
        </Description>
        <Separador />
        <Botones>
          <div onClick={() => refreshTupers(el.id, 2)}><i class="fa fa-thumbs-o-up fa-2x" aria-hidden="true" style={{ color: "#EE5D6E", cursor: "pointer" }}/></div>
          <Divider />
          <div onClick={() => refreshTupers(el.id, 0)}><i class="fa fa-thumbs-o-down fa-2x" aria-hidden="true" style={{ color: "#EE5D6E", cursor: "pointer" }}/></div>
        </Botones>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{el.tuper.titulo}</ModalHeader>
          <ModalBody>
            <p>{el.tuper.descripcion}</p>
            <h6>Ingredientes:</h6>
            <p>{el.tuper.ingredientes}</p>
            <h6>El plato fue preparado el:</h6>
            <p>{el.tuper.cooking_date}</p>
            <h6>Información nutricional:</h6>
            {el.tuper.hasFrutosSecos && <p>Tiene frutos secos {el.tuper.hasFrutosSecos}</p>}
            {el.tuper.hasGluten && <p>Tiene gluten {el.tuper.hasGluten}</p>}
            {el.tuper.hasLactosa && <p>Tiene gluten {el.tuper.hasLactosa}</p>}
            {el.tuper.vegan && <p>Apta para veganos {el.tuper.vegan}</p>}
            {el.tuper.vegetarian && <p>Apta para vegetarianos {el.tuper.vegetarian}</p>}
          </ModalBody>
        </Modal>
      </Info>
    </Box>
  ));

  const refreshTupers = (id, resp) => {
    OfertasController.responderOferta(id, resp, context.token)
      .then(data => {
        if (data.ok) {
          setTradeFlag(true);
        } else {
          console.log("Ha habido un error");
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <Container>
      <Perfil />
      <br />
      <Container fluid>
        <Row className="w-100">
          {tuppers}
        </Row>
      </Container>
    </Container>
  );
}

export default SolEntrantes;
