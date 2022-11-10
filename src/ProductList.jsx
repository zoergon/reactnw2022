import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

//komponentin tilan määritys
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
// local storagesta token, jotta saadaan tuotteet näkyviin & päästään niiden CRUD:eihin käsiksi
useEffect(() => {

  const token = localStorage.getItem('token')
        ProductService
              .setToken(token)

ProductService.getAll()
  .then(data => {
    setProducts(data)
  })
},[lisäystila, reload, muokkaustila]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

//edit-funktio
const editProduct = (products) =>  {
  setMuokattavaProduct(products)
  setMuokkaustila(true)
}

//hakukentän funktio
const handleSearchInputChange = (event) => {
  setShowProducts(true)
  setSearch(event.target.value.toLowerCase())
}

  return (
    <>
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowProducts(!showProducts)}>Products</nobr>        
        
        {/* jos lisäystila = false */}
        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}
        </h1>

        {/* hakukenttä */}
        {/* jos !lisäyst && !muokkaust (=false) niin näytetään: */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {!lisäystila && !muokkaustila &&
          <input placeholder="Search by product name" value={search} onChange={handleSearchInputChange} />
        }

        {lisäystila && <ProductAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattavaProduct={muokattavaProduct}
        />}

        {
          !lisäystila && !muokkaustila && showProducts && products && products.map(p => 
            {
              const lowerCaseName = p.productName.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editProduct={editProduct}
                />
            )
              }
            }
            )
        }

    </>
  )
}

export default ProductList