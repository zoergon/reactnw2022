import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const CustomerAdd = ({setLisäystila}) => {

//komponentin tilan määritys

const [newCustomerId, setNewCustomerId] = useState('')
const [newCompanyName, setNewCompanyName] = useState('')
const [newContactName, setNewContactName] = useState('')
const [newContactTitle, setNewContactTitle] = useState('')

const [newCountry, setNewCountry] = useState('')
const [newAddress, setNewAddress] = useState('')
const [newCity, setNewCity] = useState('')

const [newPostalCode, setNewPostalCode] = useState('')
const [newPhone, setNewPhone] = useState('')
const [newFax, setNewFax] = useState('')

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newCustomer = {
    customerId: newCustomerId.toUpperCase(),
    companyName: newCompanyName,
    contactname: newContactName,
    contactTitle: newContactTitle,
    country: newCountry,
    address: newAddress,
    city: newCity,
    postalCode: newPostalCode,
    phone: newPhone,
    fax: newFax
  }

  // uuden customerin lisääminen
  CustomerService.create(newCustomer)
  .then(response => {
    if (response.status === 200) {
      alert("Added new Customer: " + newCustomer.companyName)
      setLisäystila(false)
      // yllä oleva pois jos setTimeoutin kautta määritellään setLisäystila falseksi
    }
  })
  .catch(error => {
    alert(error)
  })

  // setTimeout(() => {
  //   setLisäystila(false)
  // }, 500)
}


  return (
    <div id="addNew">        
        <h2>Customer add</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>CustomerId: </label>
              <input type='text' value={newCustomerId} placeholder='ID with 5 capital letters' maxLength="5" minLength="5"
                  onChange={({target}) => setNewCustomerId(target.value)} required />
          </div>
          <div>
              <label>CompanyName: </label>
              <input type='text' value={newCompanyName} placeholder='Company Name'
                  onChange={({target}) => setNewCompanyName(target.value)} required />
          </div>
          <div>
              <label>ContactName: </label>
              <input type='text' placeholder='Contact Name'
                  value={newContactName} onChange={({target}) => setNewContactName(target.value)} />
          </div>
          <div>
              <label>ContactTitle: </label>
              <input type='text' placeholder='Contact Title'
                  value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} />
          </div>
          <div>
              <label>Address: </label>
              <input type='text' placeholder='Address'
                  value={newAddress} onChange={({target}) => setNewAddress(target.value)} />
          </div>
          <div>
              <label>City: </label>
              <input type='text' placeholder='City'
                  value={newCity} onChange={({target}) => setNewCity(target.value)} />
          </div>
          <div>
              <label>PostalCode: </label>
              <input type='text' placeholder='Postal Code'
                  value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} />
          </div>
          <div>
              <label>Country: </label>
              <input type='text' placeholder='Country'
                  value={newCountry} onChange={({target}) => setNewCountry(target.value)} />
          </div>
          <div>
              <label>Phone: </label>
              <input type='text' placeholder='Phone'
                  value={newPhone} onChange={({target}) => setNewPhone(target.value)} />
          </div>
          <div>
              <label>Fax: </label>
              <input type='text' placeholder='Fax'
                  value={newFax} onChange={({target}) => setNewFax(target.value)} />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setLisäystila(false)} />

        </form>

    </div>
  )
}

export default CustomerAdd