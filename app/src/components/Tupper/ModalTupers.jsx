import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import TuperController from '../../controller/TuperController';
import Context from "../../context/Context";
import TokenController from '../../controller/TokenController';
import styled from "styled-components";
import OfertasController from '../../controller/OfertasController';

const Foto = styled.div`
    width: 90%;
    height: 200px;
    display: inline-block;
    background-image: url(${props => props.imagSrc});
    background-size: cover;
    background-position: center;
    border-radius: 20px 20px 0 0;
`;

const Title = styled.div`
    margin-Top: 10px;
    font-Size: 25px;
    margin-left: 10px;
    height: 40px;
    font-family: 'Londrina Solid', cursive;
`;

const ModalTupers = (props) => {

  const {
    modal,
    setModal
  } = props;

  const toggle = () => setModal(!modal);
  const [listaTuppers, setListaTupers] = useState([]);
  const [comentario, setComentario] = useState("");
  const context = useContext(Context);

  useEffect(() => {
    let idUsuario = TokenController.getIdUser(context.token);
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
  }, []);

  const TuppersSelect = () => {
    let resultView = listaTuppers.length > 0 ? listaTuppers.map((el) => {
      return (
        <Col key={el.id}>
          <div onClick={() => pagarConTuper(el.id)}>
            <Foto imagSrc={el.urlFoto} />
            <Title>
              {el.titulo}
            </Title>
          </div>
        </Col>
      )
    }) : null;
    return resultView;
  }

  const pagarConTuper = (idTupper) => {
    let oferta = {
      tupers_id_tupers: props.tuperI,
      usuarios_id_usuarios: TokenController.getIdUser(context.token),
      comentario: comentario,
      respuesta: 1,
      trueque_id_punt: 0,
      metodo_pago: 1,
      id_taper_contraoferta: idTupper
    };
    insertaOferta(oferta, context.token);
  }

  const pagarConTokens = () => {
    let oferta = {
      tupers_id_tupers: props.tuperI,
      usuarios_id_usuarios: TokenController.getIdUser(context.token),
      comentario: comentario,
      respuesta: 1,
      trueque_id_punt: props.pago,
      metodo_pago: 0,
      id_taper_contraoferta: 0
    };
    insertaOferta(oferta, context.token);
  }

  const insertaOferta = (oferta, token) => {
    OfertasController.insertOne(oferta, token)
      .then((data) => { if (data.ok) toggle() })
      .catch(err => console.log(err));
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} style={{ backgroundColor: "#E6F8F7", fontFamily: "Londrina Solid" }}>Escoge como pagar</ModalHeader>
      <ModalBody>
        <FormGroup tag="fieldset">
          <Row>
            <TuppersSelect />
          </Row>
          <Row>
            <FormGroup className="col-12 textoNewTupper" >
              <Label for="inputComentario" >Comentario</Label>
              <Input type="text" name="inputComentario" id="inputComentario" placeholder="¿Quieres mandar un mensaje especial?" value={comentario} onChange={(event) => setComentario(event.target.value)} required />
            </FormGroup>
          </Row>
        </FormGroup>
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#E6F8F7" }}>
        <Row className="w-100" >
          <Col className="text-left">
            {props.pago !== 0 ? <Button color="warning" onClick={pagarConTokens}>Pagar con Tokens </Button> : null}
          </Col>
          <Col className="text-right">
            <Button color="danger" onClick={toggle}><i class="fa fa-undo" aria-hidden="true"></i></Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
}

export default ModalTupers;