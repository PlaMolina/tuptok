import React, { useContext } from "react";
import Context from "../../context/Context";
import styled from 'styled-components';
import Star from "../Star";

const Formulario = styled.div`
    width: 600px;
    height: 60px;
    display: flex;
    justify-content: space-between;
`;

const Contenedor = styled.div`
    width: 300px;
`;

const Estrellas = styled.div`
    width: 100px;
`;

const Opinion = () => {
  
  const context = useContext(Context);

  return (
    <Formulario>
      <Contenedor>
        {context.name}
      </Contenedor>
      <Estrellas>
        <Star valor={context.rating} />
      </Estrellas>
    </Formulario>
  );
};

export default Opinion;