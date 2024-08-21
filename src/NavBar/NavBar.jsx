import React, { useContext, useState } from 'react';
import Button from '../Button/Button';
import './NavBar.css';
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { contexto } from '../Contexto/Contexto';
import { FaWhatsapp } from "react-icons/fa";

function NavBar() {
    const navigator = useNavigate();
    const { datos } = useContext(contexto);
    const { carrito } = datos;
    const [menuOpen, setMenuOpen] = useState(false);

    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    
    const btnClickContacto = () => {
        navigator('/contacto');
        handleLinkClick();
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false); // Cierra el menú cuando se hace clic en cualquier enlace
    };

    const getPhoneNumber = async () => {
        try {
            const resp = await fetch('http://localhost:3000/whatsapp-send/number');
            const data = await resp.json();
            console.log('Datos recibidos:', data);
            return data.phoneNumber;
        } catch (error) {
            console.error('Error al obtener el número de teléfono:', error);
            return null;
        }
    };
    
      
    const handleSubmitWhatsapp = async (e) => { 
          const phoneNumberData = await getPhoneNumber(); // Obtener el número de teléfono
    
          if (phoneNumberData) { // Asegúrate de que el número se haya obtenido correctamente
            const whatsappLink = `https://wa.me/${phoneNumberData}?text=${encodeURIComponent('Hola quiero realizar la siguiente consulta:')}`;
            window.open(whatsappLink, '_blank');
            
          } else {
              console.error('No se obtuvo el número de teléfono');
          }
      }
    return (
        <nav className='navBar-container-all'>
            <div className='menu-icon' onClick={toggleMenu}>
                {menuOpen ? <FaTimes className='icon-hamb'/> : <FaBars className='icon-hamb'/>}
            </div>

            <ul className={`navBar-container ${menuOpen ? 'open' : ''}`}>
                <li className='logo-navBar'>
                    <NavLink to='/' onClick={handleLinkClick}><img src='https://i.ibb.co/QHKLc2d/1.png' className='logo-nombre' alt="Logo Nombre" /></NavLink>
                </li>

                <div className='texto-enlaces'>
                    <li>
                        <NavLink to='/' onClick={handleLinkClick}> <h1>Nuestra Escuela</h1></NavLink>
                    </li>
                    <li>
                        <NavLink to='productos' onClick={handleLinkClick}>  <h1>Productos</h1></NavLink>
                    </li>
                    <li className="carrito-icon">
                        <NavLink to='carrito' onClick={handleLinkClick}>
                            <h1><FaShoppingCart />
                                {totalProductos > 0 && <span className="carrito-count">{totalProductos}</span>}
                            </h1>
                        </NavLink>
                    </li>
                </div>

                <div className='btn-contacto-login'>
                    <Button btn={{ clase: "contactanos", texto: "Contactanos" }} btnClick={btnClickContacto} />
                    <h1 className='icon-whatsapp'><FaWhatsapp  onClick={handleSubmitWhatsapp}/></h1>
                </div>
            </ul>

            <div className='banner'>
                <h1>Escuela de Educación Secundaria Agropecuaria N°1</h1>
                <h3>Stella María Ricchiardi de Fiore</h3>
            </div>
        </nav>
    );
}

export default NavBar;
