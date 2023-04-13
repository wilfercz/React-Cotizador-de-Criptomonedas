import styled from "@emotion/styled";

const Result = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`;

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`;

const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`;

const Imagen = styled.img`
    width: 120px;
    display: block;
`;


const Resultado = ({cotizacion}) => {
  
  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = cotizacion;

  return (
    <Result>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Criptomoneda" />
        <div>
            <Precio>El Precio es de: <span>{PRICE}</span></Precio>
            <Texto>Precio Más Alto del Día: <span>{HIGHDAY}</span></Texto>
            <Texto>Precio Más Bajo del día: <span>{LOWDAY}</span></Texto>
            <Texto>Variación Últimas 24 Horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Result>
  )
}

export default Resultado;
