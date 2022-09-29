// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import Laskuri from './Laskuri'
import Viesti from './Viesti'

// function App() {
const App = () => {

//app komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio.")
}

// if (showLaskuri === true)

// {

// }

  return (
    <div className="App">
      <h1>hellou from react</h1>

      {showLaskuri && <Laskuri huomio={huomio} />}
      {showLaskuri === true ? <Laskuri  /> : <button>näytä</button>}
      {/* jotain häikkää tässä yläpuolella olevassa lauseessa, kts käytännössä erot toiminnassa */}

      {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

      {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

      <Viesti teksti="tervehdys app komponentitsta" />

    </div>
  );
}

export default App;
