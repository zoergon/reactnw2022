// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'

// function App() {
const App = () => {

//app komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
const [showPosts, setShowPosts] = useState(false)

const huomio = () => {
  alert("Huomio.")
}

// if (showLaskuri === true)

// {

// }

  return (
    <div className="App">
      <h1>hellou from react</h1>

      <CustomerList />

      {/* <Posts /> */}      
      {showPosts && <button onClick={() => setShowPosts(!showPosts)}>Piilota postit</button>}
      {!showPosts && <button onClick={() => setShowPosts(!showPosts)}>Näytä postit</button>}

      {showLaskuri && <Laskuri huomio={huomio} />}
      {/* {showLaskuri === true ? <Laskuri  /> : <button>näytä</button>} */}
      {/* jotain häikkää tässä yläpuolella olevassa lauseessa, kts käytännössä erot toiminnassa */}

      {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

      {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

      <Viesti teksti="tervehdys app komponentitsta" />

      {showPosts && <Posts />}

    </div>
  );
}

export default App;
