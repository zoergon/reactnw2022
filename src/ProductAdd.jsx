import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const ProductAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage }) => {

//komponentin tilan määritys

const [newProductName, setNewProductName] = useState('')
const [newSupplierID, setNewSupplierID] = useState('')
const [newCategoryID, setNewCategoryID] = useState('')
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState('')

const [newUnitsInStock, setNewUnitsInStock] = useState('')
const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
const [newReorderLevel, setNewReorderLevel] = useState('')

const [newDiscontinued, setNewDiscontinued] = useState('')
const [newImageLink, setNewImageLink] = useState('')

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan product-olio, joka poimii stateistä datan
  var newProduct = {
    productName: newProductName,
    supplierID: newSupplierID,
    categoryID: newCategoryID,
    quantityPerUnit: newQuantityPerUnit,
    unitPrice: newUnitPrice,
    unitsInStock: newUnitsInStock,
    unitsOnOrder: newUnitsOnOrder,
    reorderLevel: newReorderLevel,
    discontinued: newDiscontinued,
    imageLink: newImageLink
  }

  // uuden productin lisääminen
  ProductService.create(newProduct)
  .then(response => {
    if (response.status === 200) {
      setMessage("Added new Product: " + newProduct.productName)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setLisäystila(false)
      // yllä oleva pois jos setTimeoutin kautta määritellään setLisäystila falseksi
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
        <h2>Product add</h2>        

        <form onSubmit={handleSubmit}>
          <div>
              <label>ProductName: </label>
              <input type='text' value={newProductName} placeholder='Product Name'
                  onChange={({target}) => setNewProductName(target.value)} required />
          </div>
          <div>
              <label>Supplier ID: </label>
              <input type='number' value={newSupplierID} placeholder='Supplier ID'
                  onChange={({target}) => setNewSupplierID(target.value)} />
          </div>
          <div>
              <label>Category ID: </label>
              <input type='number' value={newCategoryID} placeholder='Category ID'
                  onChange={({target}) => setNewCategoryID(target.value)} />
          </div>
          <div>
              <label>Quantity Per Unit: </label>
              <input type='text' placeholder='Quantity Per Unit'
                  value={newQuantityPerUnit} onChange={({target}) => setNewQuantityPerUnit(target.value)} />
          </div>
          <div>
              <label>Unit Price: </label>
              <input type='number' placeholder='Unit Price'
                  value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} />
          </div>
          <div>
              <label>Units In Stock: </label>
              <input type='number' placeholder='Units In Stock'
                  value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} />
          </div>
          <div>
              <label>Units On Order: </label>
              <input type='number' placeholder='Units On Order'
                  value={newUnitsOnOrder} onChange={({target}) => setNewUnitsOnOrder(target.value)} />
          </div>
          <div>
              <label>Reorder Level: </label>
              <input type='number' placeholder='Reorder Level'
                  value={newReorderLevel} onChange={({target}) => setNewReorderLevel(target.value)} />
          </div>
          <div>
              <label>Discontinued: </label>
              <input type='text' placeholder='Discontinued'
                  value={newDiscontinued} onChange={({target}) => setNewDiscontinued(target.value)} required />
          </div>
          <div>
              <label>Image Link: </label>
              <input type='text' placeholder='Image Link'
                  value={newImageLink} onChange={({target}) => setNewImageLink(target.value)} />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setLisäystila(false)} />

        </form>

    </div>
  )
}

export default ProductAdd