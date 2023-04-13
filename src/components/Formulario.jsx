import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import Error from "./Error";

import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
    }
`;

const Formulario = ({setMonedas}) => {
  
  const [criptos, setCriptos]= useState([]);
  const [error, setError]= useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Monéda', monedas);  
  const [cripto, SelectCriptos] = useSelectMonedas('Elige tu Criptomoneda', criptos);  

  useEffect(()=>{
    const consultarAPI = async() =>{
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
        const resp = await fetch(url);
        const {Data} = await resp.json();

        const arrayCriptos = Data.map((cripto)=>{
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return objeto;
        })
        setCriptos(arrayCriptos);
    }

    consultarAPI();

  },[]);

  const handleSubmit = (e) =>{
    e.preventDefault();

    if([moneda, cripto].includes('')){
        setError(true);     
        return;
    }

    setError(false);
    setMonedas({
        moneda,
        cripto
    })
  }

  return (
    <>
        {error && <Error error={'Todos los Campos Son Obligatorios'}/>}
        <form
            onSubmit={handleSubmit}
        >

            <SelectMonedas />
            <SelectCriptos />

            <InputSubmit 
                type="submit" value="Cotizar"
            />
        </form>
    </>
  )
}

export default Formulario;
