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
import PrivateRoute from './LoginAdmin/PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            {/* Rutas protegidas por el rol de admin */}
              <Route path="auth/login" element={<Login />} />
          {/*   <Route path="perfil/admin" element={<PrivateRoute roles={['admin']} />}> */}
              <Route path="perfil/admin" element={<Perfil />} />
           {/*  </Route> */}

            {/* Rutas Públicas */}
            <Route path='/' element={<Home />} />
            <Route path='productos' element={<Productos />} />
            <Route path='contacto' element={<ContactUs />} />
            <Route path='carrito' element={<Carrito />} />
            <Route path='carrito/pedido' element={<RealizarPedido />} />

          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
