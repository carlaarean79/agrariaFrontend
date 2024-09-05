import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home'
import './index.css'
import NavBar from './NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Footer/Footer';
import Productos from './Productos/Productos';
import Carrito from './Carrito/Carrito';
import RealizarPedido from './PedidoRealizado/RealizarPedido';
import ContactUs from './FormContacto/FormContacto';
import Login from './LoginAdmin/Login';
import Perfil from './LoginAdmin/Perfil';
import { AuthProvider } from './Contexto/AuthContext';
import Pedidos from './PedidosRecibidos/Pedidos';
import TablaPedidos from './PedidosRecibidos/Pedidos';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
                       <Route path="auth/login" element={<Login />} />
                     <Route path="perfil/admin" element={<Perfil />} />
                    <Route path='/' element={<Home />} />
            <Route path='productos' element={<Productos />} />
            <Route path='contacto' element={<ContactUs />} />
            <Route path='carrito' element={<Carrito />} />
            <Route path='carrito/pedido' element={<RealizarPedido />} />
           <Route path='pedidosRealizados' element={<TablaPedidos />} />

          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
