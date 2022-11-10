import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({ setIsPositive, setShowMessage, setMessage, setLoggedInUser }) => {

//komponentin tilan määritys
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan user-olio, joka poimii stateistä datan
  var userForAuth = {
    username: username,
    password: md5(password) //salataan md5-kirjaston metodilla
  }

  //console.log(userForAuth)

  // uuden userin lisääminen
  // response.data.token antaa pelkän tokenin datasta
  LoginService.authenticate(userForAuth)
  .then(response => {
      if (response.status === 200) {
        
        // console.log(response.data.token)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)

        setLoggedInUser(response.data.username)
        window.location.reload()

      setMessage(`Logged in as: ${userForAuth.username}`)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  })
  .catch(error => {
    // alert(error.message)
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
}

// kenttien tyhjennys
const emptyFields = () => {
    setUsername("")
    setPassword("")
}

  return (
    <div id="loginWindow">        
        <h2>Login</h2>        

        <form onSubmit={handleSubmit}>                    
          <div>
              <label>Username: </label>
              <input type='text' placeholder='Username'
                  value={username} onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
              <label>Password: </label>
              <input type='password' placeholder='Password'
                  value={password} onChange={({target}) => setPassword(target.value)} />
          </div>
          
          <input type='submit' value='Login' />

          <input type='button' value='Empty'onClick={() => emptyFields()} />

        </form>

    </div>
  )
}

export default Login
