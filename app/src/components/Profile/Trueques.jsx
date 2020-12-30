import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import styled from 'styled-components';
import imagen from './images/images.jpg';
import Perfil from "./Perfil";
import Comentario from "./Comentario";
import OfertasController from "../../controller/OfertasController";
import TuperController from '../../controller/TuperController';
import Context from "../../context/Context";
import TokenController from "../../controller/TokenController";

const Chip = styled.div`
    display: inline-block;
    padding: 0 25px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-radius: 25px;
    background-color: black;
    color: white;
`;

const Imagen = styled.img`
    float: left;
    margin: 0 10px 0 -25px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
`;

const Contenedor = styled.div`
    border: 2px solid #ccc;
    background-color: #eee;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
`;

const Review = styled.div`  
    display: flex;
    justify-content: space-between;
    margin-right: 15%;
`;

const Trueques = () => {

  const [listaTupers, setListaTupers] = useState([]);
  const context = useContext(Context);

  useEffect(() => {
    OfertasController.getMyOffers(TokenController.getIdUser(context.token), context.token)
      .then(data => {
        console.log(data);
        if (data.ok === false) {
          setListaTupers([]);
        } else {
          let tupers = data.resp.filter((el) => el.respuesta === 2).map((el) => {
            el.tuper.usuario.urlFoto = TuperController.getUrlFoto(el.tuper.usuario.urlFoto);
            return el;
          })
          console.log(tupers);
          setListaTupers(tupers);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const display = listaTupers.length > 0 ? listaTupers.map((el) => (
    <Contenedor key={el.id}>
      <Chip>
        <Imagen src={el.tuper.usuario.fotoURL !== null ? el.tuper.usuario.fotoURL : imagen} width="96" height="96" />
        <span>{el.tuper.usuario.email.split('@')[0]}</span>
      </Chip>
      <Review>
        <span className="p-2">Tupper: {el.tuper.titulo}</span>
        <Comentario idOferta={el.id} />
      </Review>
    </Contenedor>
  )) : <p>No hay trueques por finalizar</p>;

  return (
    <Container>
      <Perfil />
      <div>
      </div>
      <br />
      {display}
    </Container>
  );
}

export default Trueques;

