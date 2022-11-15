import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const CustomerEdit = ({setMuokkaustila, setIsPositive, setShowMessage, setMessage, muokattavaCustomer }) => {

//komponentin tilan määritys

const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newCustomer = {
    customerId: newCustomerId,
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
  CustomerService.update(newCustomer)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated new Customer: " + newCustomer.companyName)
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
        <h2>Customer edit</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>CustomerId: </label>
              <input type='text' value={newCustomerId} disabled />
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

          <input type='button' value='Cancel' onClick={() => setMuokkaustila(false)} />

        </form>

    </div>
  )
}

export default CustomerEdit