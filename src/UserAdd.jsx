import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const UserAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage }) => {

//komponentin tilan määritys
//id-arvo tulee tietokannassa automatic
const [newFirstName, setNewFirstName] = useState('')
const [newLastName, setNewLastName] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')


// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan user-olio, joka poimii stateistä datan
  var newUser = {    
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
    accesslevelId: parseInt(newAccesslevelId),
    username: newUsername,
    password: md5(newPassword) //salataan md5-kirjaston metodilla
  }

  console.log(newUser)

  // uuden userin lisääminen
  UserService.create(newUser)
  .then(response => {
    if (response.status === 200) {
      setMessage(`Added new User: " ${newUser.firstName} ${newUser.lastName}`)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setLisäystila(false)
    }
  })
  .catch(error => {
    setMessage(error)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
}


  return (
    <div id="addNew">        
        <h2>User add</h2>        

        <form onSubmit={handleSubmit}>          
          <div>
              <label>First Name: </label>
              <input type='text' value={newFirstName} placeholder='First Name'
                  onChange={({target}) => setNewFirstName(target.value)} required />
          </div>
          <div>
              <label>Last Name: </label>
              <input type='text' placeholder='Last Name'
                  value={newLastName} onChange={({target}) => setNewLastName(target.value)} required />
          </div>
          <div>
              <label>Email: </label>
              <input type='email' placeholder='Email'
                  value={newEmail} onChange={({target}) => setNewEmail(target.value)} />
          </div>
          <div>
              <label>Access Level: </label>
              <input type='number' placeholder='Access Level'
                  value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} />
          </div>
          <div>
              <label>Username: </label>
              <input type='text' placeholder='Username'
                  value={newUsername} onChange={({target}) => setNewUsername(target.value)} />
          </div>
          <div>
              <label>Password: </label>
              <input type='password' placeholder='Password'
                  value={newPassword} onChange={({target}) => setNewPassword(target.value)} />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setLisäystila(false)} />

        </form>

    </div>
  )
}

export default UserAdd