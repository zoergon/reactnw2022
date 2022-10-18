import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

//komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)

useEffect(() => {
  CustomerService.getAll()
  .then(data => {
    setCustomers(data)
  })
},[lisäystila, reload, muokkaustila]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

//edit-funktio
const editCustomer = (customer) =>  {
  setMuokattavaCustomer(customer)
  setMuokkaustila(true)
}

  return (
    <>        
        {/* <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>
        
        {/* jos lisäystila = false */}
        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}
        </h1>

        {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaCustomer={muokattavaCustomer}
        />}

        {
            showCustomers && customers && customers.map(c => (
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
                />
            )
            )
        }

    </>
  )
}

export default CustomerList