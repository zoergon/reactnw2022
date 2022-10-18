// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'

// function App() {
const App = () => {

//app komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
const [showPosts, setShowPosts] = useState(false)
// statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

const huomio = () => {
  alert("Huomio.")
}

// if (showLaskuri === true)

// {

// }

  return (
    <div className="App">
      <h1>hellou from react</h1>

      {showMessage && <Message message={message} isPositive={isPositive} /> }

      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />

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
