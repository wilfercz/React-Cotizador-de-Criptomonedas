import { useEffect, useState } from "react"
import styled from "@emotion/styled";

import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

import ImgCripto from './img/imagen-criptos.png';

const Heading = styled.h2`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem; 
  }
`;

const ImagenCripto = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

function App() {

  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
        const cotizarCripto = async() =>{
            setCargando(true);
            setCotizacion({});
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.cripto}&tsyms=${monedas.moneda}`;
            const resp = await fetch(url);
            const {DISPLAY} = await resp.json();

            setCotizacion(DISPLAY[monedas.cripto][monedas.moneda]);
            setCargando(false);
        }

        cotizarCripto();
    }
  },[monedas]);

  return (
    <Contenedor>
      <ImagenCripto
        src={ImgCripto}
        alt="Imágenes Criptomonedas"
      />
      <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario 
              setMonedas = {setMonedas}
          />
          
          {cargando && <Spinner />}

          {cotizacion.PRICE && <Resultado cotizacion={cotizacion}/>}
      </div>
    </Contenedor>
  )
}

export default App
