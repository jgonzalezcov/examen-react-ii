import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductProvider from './context/ProductsProvider'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Product from './views/Product'
import ShoppingCart from './views/ShoppingCart'
import NotFount from './views/NotFount'
function App() {
  return (
    <div className="App">
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/carro" element={<ShoppingCart />} />
            <Route path="*" element={<NotFount />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </div>
  )
}

export default App
