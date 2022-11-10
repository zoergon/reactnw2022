import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

//komponentin tilan määritys
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

// bäkend vaatii tokenin, jotta users-lista saadaan näkyville
useEffect(() => {

  const token = localStorage.getItem('token')
        UserService
              .setToken(token)

  UserService.getAll()
  .then(data => {
    setUsers(data)
  })
},[lisäystila, reload, muokkaustila]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

//hakukentän funktio
const handleSearchInputChange = (event) => {  
    setSearch(event.target.value.toLowerCase())
}

//edit-funktio
const editUser = (user) =>  {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

//delete-user
const deleteUser = (user) => {
  let vastaus = window.confirm(`Remove User ${user.lastName}`)

  if(vastaus === true) {
      
  UserService.remove(user.userId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed user ${user.lastName}`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          // Ilmoituksen piilotus
          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
            reloadNow(!reload)
      }
  })
  .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollaa ylös ruudun

      setTimeout(() => {
        setShowMessage(false)
      }, 6000)
    })

  } // Jos poisto perutaan, annetaan ilmoitus onnistuneesta perumisesta.
  else {
      setMessage('Poisto peruttu.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
  }
}

  return (
    <>  
        <h1><nobr>Users</nobr>

        {/* jos lisäystila = tosi, renderöidään UserAdd */}
        {lisäystila && <UserAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
        
        {/* jos lisäystila = false */}
        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}
        </h1>

        {!lisäystila && !muokkaustila &&
          <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
        }

        {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaUser={muokattavaUser}
        />}

        {/* jos lisäystila ja muokkaustila == false, niin näytetään taulukko */}
        {!lisäystila && !muokkaustila &&
        <table id="userTable">
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>AccessLevel</th>
                </tr>                
            </thead>
            <tbody>

            {users && users.map(u => 
            {
              const lowerCaseName = u.lastName.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(                  
                    <tr key={u.userId}>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.email}</td>
                        <td>{u.accesslevelId}</td>                        
                        <td><button onClick={() => editUser(u)}>Edit</button></td>
                        <td><button onClick={() => deleteUser(u)}>Delete</button></td>
                    </tr>                    
                )
              }
            }
            )
            }

            </tbody> 
        </table>
        }
    </>
  )
}

export default UserList