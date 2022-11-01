// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import Laskuri from './Laskuri'
// import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'

import UserList from './UserList'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

// browserrouter aliasoitu routeriksi
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// function App() {
const App = () => {

//app komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
const [showPosts, setShowPosts] = useState(false)
// statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

// const huomio = () => {
//   alert("Huomio.")
// }

// if (showLaskuri === true)

// {

// }

  return (
    <div className="App">
      {/* <h1>hellou from react</h1> */}

      <Router>

        {/* nämä linkit vaihtelevat osoiterivin tekstiä selaimessa */}
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href={'/Customers'} className='nav-link'>Customers</Nav.Link>
            <Nav.Link href={'/Users'} className='nav-link'>Users</Nav.Link>
            <Nav.Link href={'/Laskuri'} className='nav-link'>Laskuri</Nav.Link>
            <Nav.Link href={'/Posts'} className='nav-link'>Typicode posts</Nav.Link>
          </Nav>
        </Navbar>

        <h2>Northwind Traders</h2>

        {showMessage && <Message message={message} isPositive={isPositive} /> }

        {/* sen mukaan mitä routessa lukee, niin renderöidään sen mukainen komponentti */}
        <Switch>
          <Route path="/Customers"> <CustomerList setIsPositive={setIsPositive} setMessage={setMessage}
          setShowMessage={setShowMessage} /></Route>

          <Route path="/Users"> <UserList setIsPositive={setIsPositive} setMessage={setMessage}
          setShowMessage={setShowMessage} /></Route>

          <Route path="/Laskuri"> <Laskuri /></Route>
          <Route path="/Posts"> <Posts /></Route>
        </Switch>

      </Router>

      {/* {showPosts && <button onClick={() => setShowPosts(!showPosts)}>Piilota postit</button>}
      {!showPosts && <button onClick={() => setShowPosts(!showPosts)}>Näytä postit</button>}

      {showLaskuri && <Laskuri huomio={huomio} />} */}
      {/* {showLaskuri === true ? <Laskuri  /> : <button>näytä</button>} */}
      {/* jotain häikkää tässä yläpuolella olevassa lauseessa, kts käytännössä erot toiminnassa */}

      {/* {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

      {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

      <Viesti teksti="tervehdys app komponentitsta" />

      {showPosts && <Posts />} */}

    </div>
  );
}

export default App;
