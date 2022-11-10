// import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';
import Laskuri from './Laskuri'
// import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import ProductList from './ProductList'
import Message from './Message'

import UserList from './UserList'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Login'

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
const [loggedInUser, setLoggedInUser] = useState('')

const [accesslevelId, setAccesslevelId] = useState('2')

// const huomio = () => {
//   alert("Huomio.")
// }

// if (showLaskuri === true)

// {

// }

// käyttäjän "uudelleen sisään kirjaaminen" local storagesta
useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
}, [])

// accesslevelin hakeminen local storagesta
useEffect(() => {
  let storedAccesslevelId = localStorage.getItem("accesslevelId")
  if (storedAccesslevelId !== null) {
    setAccesslevelId(storedAccesslevelId)
  }
}, [])

// logout napin tapahtumakäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
  setAccesslevelId('2')
}

  return (
    <div className="App">
      {/* <h1>hellou from react</h1> */}

      {/* jos ei loggedin niin   */}
      {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}  setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

{/* jos loggedin niin */}
{ loggedInUser &&

      <Router>

        {/* nämä linkit vaihtelevat osoiterivin tekstiä selaimessa */}
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href={'/Customers'} className='nav-link'>Customers</Nav.Link>
            <Nav.Link href={'/Products'} className='nav-link'>Products</Nav.Link>
            { accesslevelId === '1' && <Nav.Link href={'/Users'} className='nav-link'>Users</Nav.Link>}
            <Nav.Link href={'/Laskuri'} className='nav-link'>Laskuri</Nav.Link>
            <Nav.Link href={'/Posts'} className='nav-link'>Typicode posts</Nav.Link>
            <button onClick={() => logout()}>Logout</button>
          </Nav>
        </Navbar>

        <h2>Northwind Traders</h2>

        {showMessage && <Message message={message} isPositive={isPositive} /> }

        {/* sen mukaan mitä routessa lukee, niin renderöidään sen mukainen komponentti */}
        <Switch>
          <Route path="/Customers"> <CustomerList setIsPositive={setIsPositive} setMessage={setMessage}
          setShowMessage={setShowMessage} /></Route>
          <Route path="/Products"> <ProductList setIsPositive={setIsPositive} setMessage={setMessage}
          setShowMessage={setShowMessage} /></Route>

          { accesslevelId === '1' && <Route path="/Users"> <UserList setIsPositive={setIsPositive} setMessage={setMessage}
          setShowMessage={setShowMessage} /></Route>}

          <Route path="/Laskuri"> <Laskuri /></Route>
          <Route path="/Posts"> <Posts /></Route>
        </Switch>

      </Router>

}

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
