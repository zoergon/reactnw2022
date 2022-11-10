import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

// props nimetty Productiksi
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove Product ${product.productName}`)

    if(vastaus === true) {
        
    ProductService.remove(product.productId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Succesfully removed product ${product.productName}`)
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
    <div className='productDiv'>
        
        <h4 onClick={() => setShowDetails(!showDetails)}>
            {product.productName}
        </h4>

        {showDetails && <div className='productDetails'>
            <h3>{product.productName}</h3>
            <button onClick={() => editProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product)}>Delete</button>
            <table>
                <thead>
                    <tr>
                        <th>Supplier</th>
                        <th>Category</th>
                        <th>Quantity Per Unit</th>
                        <th>Unit Price</th>
                        <th>Units In Stock</th>
                        <th>Units On Order</th>
                        <th>Reorder Level</th>
                        <th>Discontinued</th>
                        <th>Image Link</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.supplierId}</td>
                        <td>{product.categoryId}</td>
                        <td>{product.quantityPerUnit}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.unitsInStock}</td>
                        <td>{product.unitsOnOrder}</td>
                        <td>{product.reorderLevel}</td>
                        <td>{product.discontinued}</td>
                        <td>{product.imageLink}</td>
                    </tr>
                </tbody>
            </table></div>}
    </div>
  )
}

export default Product