import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const UserEdit = ({setMuokkaustila, setIsPositive, setShowMessage, setMessage, muokattavaUser }) => {

//komponentin tilan määritys
const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)

const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)
const [newUsername, setNewUsername] = useState(muokattavaUser.username)
const [newPassword, setNewPassword] = useState(muokattavaUser.password)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newUser = {
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
    accesslevelId: parseInt(newAccesslevelId),
    username: newUsername,
    password: md5(newPassword)
  }

  // userin muokkaaminen
  UserService.update(muokattavaUser.userId, newUser)
  .then(response => {
    if (response.status === 200) {
      setMessage(`Updated User: ${newUser.firstName} ${newUser.lastName}`)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setMuokkaustila(false)
      // yllä oleva pois jos setTimeoutin kautta määritellään setLisäystila falseksi
    }
  })
  .catch(error => {
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })

}


  return (
    <div id="edit">        
        <h2>User edit</h2>        

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
              <label>Accesslevel: </label>
              <input type='number' placeholder='Accesslevel'
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

          <input type='button' value='Cancel' onClick={() => setMuokkaustila(false)} />

        </form>

    </div>
  )
}

export default UserEdit