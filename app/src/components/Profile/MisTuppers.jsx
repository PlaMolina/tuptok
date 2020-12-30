import React, { useEffect, useState, useContext } from "react";
import { Container, Row } from "reactstrap";
import styled from "styled-components";
import TuperController from '../../controller/TuperController';
import Context from "../../context/Context";
import TokenController from "../../controller/TokenController";

import Perfil from "./Perfil"
import { Link } from "react-router-dom";

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

const MisTuppers = () => {

  const [listaTupers, setListaTupers] = useState([]);
  const [removeFlag, setRemoveFlag] = useState(false);
  const context = useContext(Context);

  useEffect(() => {
    let idUsuario = TokenController.getIdUser(context.token);
    if (removeFlag === true) setRemoveFlag(false);
    TuperController.getMyTuppers(idUsuario, context.token)
      .then(data => {
        if (data.ok === false) {
          setListaTupers([]);
        } else {
          let tupers = data.resp.map((el) => {
            el.urlFoto = TuperController.getUrlFoto(el.urlFoto);
            return el;
          })
          setListaTupers(tupers);
        }
      })
      .catch(err => console.log(err));
  }, [removeFlag]);

  const deleteTupper = (idTuper) => {
    TuperController.removeOne(idTuper, context.token)
      .then(data => {
        if (data.ok) {
          setRemoveFlag(true);
        }
      })
      .catch(err => console.log(err))
  }

  const tuppers = listaTupers.length === 0 ? <p>No se han encontrado tupers</p> : listaTupers.map((el) => (
    <Box key={el.id} className="col-lg-3  col-sm-6 col-12">
      <Foto imagSrc={el.urlFoto} />
      <Info>
        <Title>
          {el.titulo}
        </Title>
        <Description>
          {el.descripcion}
        </Description>
        <Separador />
        <Botones>
          <Link to={"/tupper/modTupper/" + el.id}><i className="fa fa-pencil fa-2x" aria-hidden="true" style={{ color: "#EE5D6E", cursor: "pointer" }}/></Link>
          <Divider />
          <div onClick={() => deleteTupper(el.id)}><i className="fa fa-trash fa-2x" aria-hidden="true" style={{ color: "#EE5D6E", cursor: "pointer" }}/></div>
        </Botones>
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

export default MisTuppers;
