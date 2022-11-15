import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const ProductEdit = ({setMuokkaustila, setIsPositive, setShowMessage, setMessage, muokattavaProduct }) => {

//komponentin tilan määritys

const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newSupplierID, setNewSupplierID] = useState(muokattavaProduct.supplierID)
const [newCategoryID, setNewCategoryID] = useState(muokattavaProduct.categoryID)
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)

const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)

const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan Product-olio, joka poimii stateistä datan
  var newProduct = {
    productId: newProductId,
    productName: newProductName,
    supplierID: parseInt(newSupplierID),
    categoryID: parseInt(newCategoryID),
    quantityPerUnit: newQuantityPerUnit,
    unitPrice: parseFloat(newUnitPrice),
    unitsInStock: parseInt(newUnitsInStock),
    unitsOnOrder: parseInt(newUnitsOnOrder),
    reorderLevel: parseInt(newReorderLevel),
    discontinued: newDiscontinued,
    imageLink: newImageLink
  }

  // uuden customerin lisääminen
  ProductService.update(newProduct)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated new Product: " + newProduct.productName)
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
        <h2>Product edit</h2>        

        <form onSubmit={handleSubmit}>
        <div>
            <label>ProductId: </label>
              <input type='text' value={newProductId} disabled />
          </div>
          <div>
              <label>ProductName: </label>
              <input type='text' value={newProductName} placeholder='Product Name'
                  onChange={({target}) => setNewProductName(target.value)} required />
          </div>
          <div>
              <label>Supplier ID: </label>
              <input type='number' value={newSupplierID}
                  onChange={({target}) => setNewSupplierID(target.value)} />
          </div>
          <div>
              <label>Category ID: </label>
              <input type='number' value={newCategoryID}
                  onChange={({target}) => setNewCategoryID(target.value)} />
          </div>
          <div>
              <label>Quantity Per Unit: </label>
              <input type='text' placeholder='Quantity Per Unit'
                  value={newQuantityPerUnit} onChange={({target}) => setNewQuantityPerUnit(target.value)} />
          </div>
          <div>
              <label>Unit Price: </label>
              <input type='number' step='0.01' placeholder='Unit Price'
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
              <input                  
                  type="radio"
                  checked={newDiscontinued}
                  onChange={e => setNewDiscontinued(e.target.checked)} required />
          </div>
          <div>
              <label>Image Link: </label>
              <input type='text' placeholder='Image Link'
                  value={newImageLink} onChange={({target}) => setNewImageLink(target.value)} />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setMuokkaustila(false)} />

        </form>

    </div>
  )
}

export default ProductEdit