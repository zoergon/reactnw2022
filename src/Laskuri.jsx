import './App.css';
import React, {useState} from 'react'

//tässä props ensiksi määritelty, ja myöhemmin viittaus props.huomio
// const Laskuri = (props) => {
//tässä props otettu vastaan suoraan nimellä ja props. -voidaan jättää myöhemmin kokonaan pois
const Laskuri = ({huomio}) => {

//komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>

        <button onClick={() => setLuku(luku + 1)}>+</button>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        {/* <button onClick={() => setLuku(luku => 0)}>C</button> */}
        <button onClick={() => setLuku(0)}>C</button>

        {/* <button onClick={props.huomio}>huomio</button> */}
        <button onClick={huomio}>huomio</button>

    </>
  );
}

export default Laskuri;