
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home'
import './index.css'
import NavBar from './NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Footer/Footer';
import Productos from './Productos/Productos';
import Ubicacion from './Ubicacion/Ubicacion';


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
       <Route path='productos' element={<Productos/>} />
       <Route path='contacto' element={<Ubicacion/>} />
       </Routes>
        <Footer />
      </BrowserRouter>


    </>
  )
}

export default App
