import './App.css'
import React, {useState} from 'react'

// props nimetty customeriksi
const Customer = ({customer}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='customerDiv'>
        
        <h4 onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        >
            {customer.companyName}
        </h4>

        {showDetails && <div className='customerDetails'>
            <table>
                <thead>
                    <tr>
                        <th>Contact Person</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                    </tr>
                </tbody>
            </table></div>}
    </div>
  )
}

export default Customer