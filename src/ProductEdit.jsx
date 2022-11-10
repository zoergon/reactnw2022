import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const ProductEdit = ({setMuokkaustila, setIsPositive, setShowMessage, setMessage, muokattavaProduct }) => {

//komponentin tilan määritys

const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newSupplierID, setNewSupplierID] = useState(muokattavaProduct.productName)
const [newCategoryID, setNewCategoryID] = useState(muokattavaProduct.productName)
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
    setMessage(error)
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
              <label>Product Name: </label>
              <input type='text' value={newProductName} placeholder='Product Name'
                  onChange={({target}) => setNewProductName(target.value)} required />
          </div>
          <div>
              <label>Supplier ID: </label>
              <input type='text' value={newSupplierID} placeholder='Supplier ID'
                  onChange={({target}) => setNewSupplierID(target.value)} />
          </div>
          <div>
              <label>Category ID: </label>
              <input type='text' value={newCategoryID} placeholder='Category ID'
                  onChange={({target}) => setNewCategoryID(target.value)} />
          </div>
          <div>
              <label>Quantity Per Unit: </label>
              <input type='text' placeholder='Quantity Per Unit'
                  value={newQuantityPerUnit} onChange={({target}) => setNewQuantityPerUnit(target.value)} />
          </div>
          <div>
              <label>Unit Price: </label>
              <input type='text' placeholder='Unit Price'
                  value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} />
          </div>
          <div>
              <label>Units In Stock: </label>
              <input type='text' placeholder='Units In Stock'
                  value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} />
          </div>
          <div>
              <label>Units On Order: </label>
              <input type='text' placeholder='Units On Order'
                  value={newUnitsOnOrder} onChange={({target}) => setNewUnitsOnOrder(target.value)} />
          </div>
          <div>
              <label>Reorder Level: </label>
              <input type='text' placeholder='Reorder Level'
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

          <input type='button' value='Cancel' onClick={() => setMuokkaustila(false)} />

        </form>

    </div>
  )
}

export default ProductEdit