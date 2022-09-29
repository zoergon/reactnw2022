import './App.css';
import React, {useState} from 'react'

const Laskuri = (props) => {

//komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>

        <button onClick={() => setLuku(luku + 1)}>+</button>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <button onClick={() => setLuku(luku => 0)}>C</button>

        <button onClick={props.huomio}>huomio</button>

    </>
  );
}

export default Laskuri;