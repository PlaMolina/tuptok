import React, { useEffect, useState, useContext } from "react";
import { Container, Row } from "reactstrap";
import styled from "styled-components";
import Context from "../../context/Context";
import TuperController from '../../controller/TuperController';
import OfertasController from "../../controller/OfertasController";
import TokenController from "../../controller/TokenController";

import Perfil from "./Perfil"


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
    margin-left: 10px;
    height: 50px;
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
    overflow: visible; 
    height: 80px;
`;

const TuppersOfrecidos = () => {

  const context = useContext(Context);
  const [listaTupers, setListaTupers] = useState([]);

  useEffect(() => {
    OfertasController.getMyOffers(TokenController.getIdUser(context.token), context.token)
      .then(data => {
        console.log(data);
        if (data.ok === false) {
          setListaTupers([]);
        } else {
          let tupers = data.resp.map((el) => {
            el.tuper.urlFoto = TuperController.getUrlFoto(el.tuper.urlFoto);
            return el;
          })
          setListaTupers(tupers);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const tuppers = listaTupers.length === 0 ? <p>No se han encontrado tupers</p> : listaTupers.map((el) => (
    <Box key={el.id} className="col-lg-3  col-sm-6 col-12">
      <Foto imagSrc={el.tuper.urlFoto} />
      <Info>
        <Title>
          {el.tuper.titulo}
        </Title>
        <Description>
          {el.tuper.descripcion}
        </Description>
      </Info>
    </Box>
  ));

  return (
    <Container>
      <Perfil />
      <Container fluid>
        <Row style={{ paddingTop: "30px" }} className="w-100">
          {tuppers}
        </Row>
      </Container>
    </Container>
  );
}

export default TuppersOfrecidos;
