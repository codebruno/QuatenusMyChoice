import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Cookies from "js-cookie"

// TODO: Estilizar essa página
// TODO: Trocar essa página por um modal

const EditFamily = () => {
  const [name, setName] = useState('')
  const [bannerLink, setBannerLink] = useState('')
  const [qbmCode, setQbmCode] = useState('')
  const [desc, setDesc] = useState('')
  const [canvaLink, setCanvaLink] = useState('')
  const [addInfoLink, setAddInfoLink] = useState('')
  const [products, setProducts] = useState([])
  const [tecInfoLink, setTecInfoLink] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      .then((response) => {
        const { name, bannerLink, qbmCode, desc, canvaLink, addInfoLink, products, tecInfoLink } = response.data

        // Transformando products em um array de objetos com name e values
        const productsArray = products ? Object.keys(products).map((productName) => ({
          name: productName,
          values: products[productName]
        })) : []

        setName(name)
        setBannerLink(bannerLink)
        setQbmCode(qbmCode)
        setDesc(desc)
        setCanvaLink(canvaLink)
        setAddInfoLink(addInfoLink)
        setProducts(productsArray)
        setTecInfoLink(tecInfoLink)
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`)
        console.error(error)
      })
  }, [])

  const handleEditFamily = () => {
    const productsObject = products.reduce((acc, { name, values }) => {
      acc[name] = values
      return acc
    }, {})

    const data = {
      name, bannerLink, qbmCode, desc, canvaLink, addInfoLink, products: productsObject, tecInfoLink
    }

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/families/${id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert(`Oops, algo deu errado!
        - ${error.response.data.message}`)
        console.error(error)
      })
  }

  const handleAddProduct = () => {
    setProducts([...products, { name: '', values: Array(11).fill('') }])
  }

  const handleDeleteProduct = (index) => {
    const newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  const handleProductNameChange = (index, value) => {
    const newProducts = [...products]
    newProducts[index].name = value
    setProducts(newProducts)
  }

  const handleProductValueChange = (productIndex, valueIndex, value) => {
    const newProducts = [...products]
    newProducts[productIndex].values[valueIndex] = value
    setProducts(newProducts)
  }

  return (
    <div className="py-2 bg-light">
      <div className="container">
        <BackButton />
        <h1>EDITAR FAMÍLIA</h1>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Código do QBM</label>
          <input
            type="text"
            value={qbmCode}
            onChange={(e) => setQbmCode(e.target.value)}
          />
        </div>
        <div>
          <label>Link do Banner</label>
          <input
            type="text"
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label>Link do Canva</label>
          <input
            type="text"
            value={canvaLink}
            onChange={(e) => setCanvaLink(e.target.value)}
          />
        </div>
        <div>
          <label>Link da Informação Adicional</label>
          <input
            type="text"
            value={addInfoLink}
            onChange={(e) => setAddInfoLink(e.target.value)}
          />
        </div>
        <div>
          <label>Segmento de Produtos</label>
          {products.map((product, productIndex) => (
            <div key={productIndex}>
              <input
                type="text"
                placeholder="Nome do Produto"
                value={product.name}
                onChange={(e) => handleProductNameChange(productIndex, e.target.value)}
              />
              {product.values.map((value, valueIndex) => (
                <input
                  key={valueIndex}
                  type="text"
                  placeholder={
                    valueIndex === 0 ? "Código do Produto" :
                    valueIndex === 1 ? "Descrição" :
                    valueIndex === 2 ? "Adesão" : 
                    valueIndex === 3 ? "12 meses" : 
                    valueIndex === 4 ? "24 meses" : 
                    valueIndex === 5 ? "36 meses" : 
                    valueIndex === 6 ? "12 meses S/A" : 
                    valueIndex === 7 ? "24 meses S/A" : 
                    valueIndex === 8 ? "36 meses S/A" : 
                    valueIndex === 9 ? "48 meses S/A" : 
                    valueIndex === 10 ? "60 meses S/A" : 
                    "Valor"}
                  value={value}
                  onChange={(e) => handleProductValueChange(productIndex, valueIndex, e.target.value)}
                />
              ))}
              <button onClick={() => handleDeleteProduct(productIndex)}>Excluir</button>
            </div>
          ))}
          <button onClick={handleAddProduct}>Adicionar Produto</button>
        </div>
        <div>
          <label>Link da Informação Técnica</label>
          <input
            type="text"
            value={tecInfoLink}
            onChange={(e) => setTecInfoLink(e.target.value)}
          />
        </div>
        <button onClick={handleEditFamily}>Salvar</button>
      </div>
    </div>
  )
}

export default EditFamily
