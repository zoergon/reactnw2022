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
const [search, setSearch] = useState("")

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

//hakukentän funktio
const handleSearchInputChange = (event) => {
  setShowCustomers(true)
  setSearch(event.target.value.toLowerCase())
}

  return (
    <>        
        {/* <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>        
        
        {/* jos lisäystila = false */}
        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}
        </h1>

        {/* hakukenttä */}
        {/* jos !lisäyst && !muokkaust (=false) niin näytetään: */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {!lisäystila && !muokkaustila &&
          <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
        }

        {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaCustomer={muokattavaCustomer}
        />}

        {
          // viimeinen && jälkeen se mitä tehdään
          // kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // ensimmäiset !lisäys && !muokk && - poistavat listauksen näkyvistä alta lisäystilassa
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => 
            {
              const lowerCaseName = c.companyName.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
                />
            )
              }
            }
            )
        }

    </>
  )
}

export default CustomerList