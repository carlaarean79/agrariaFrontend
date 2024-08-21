
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home'
import './index.css'
import NavBar from './NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Footer/Footer';
import Productos from './Productos/Productos';
import Ubicacion from './Ubicacion/Ubicacion';
import Carrito from './Carrito/Carrito';
import RealizarPedido from './PedidoRealizado/RealizarPedido';
import FormContacto from './FormContacto/FormContacto';
import ContactUs from './FormContacto/FormContacto';


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
       <Route path='productos' element={<Productos/>} />
     <Route path='contacto' element={<ContactUs />} />
      <Route path='carrito' element={<Carrito/>} />
       <Route path= 'carrito/pedido' element={<RealizarPedido />} />

       </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}

export default App
