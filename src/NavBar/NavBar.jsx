import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import './NavBar.css';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { contexto } from '../Contexto/Contexto';
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from '../Contexto/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import { NavDropdown } from 'react-bootstrap';
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineAddModerator } from "react-icons/md";
function NavBar() {
    const navigator = useNavigate();
    const { datos, perfilReload } = useContext(contexto);
    const { userActiv, perfil } = datos || {};
    const { carrito } = datos;
    const [menuOpen, setMenuOpen] = useState(false);
    const { handleLogout } = useAuth();
    const [clicked, setClicked] = useState(false);
    const [menuDropdow, setMenuDropdow] = useState(false);

    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    useEffect(() => {
        if (userActiv && !perfil) {
            perfilReload();
        }
       
    }, [userActiv, perfil])

    useEffect(() => {
        if (!clicked) {
            setMenuDropdow(false)
        }
    }, [clicked])

    const menuDropdowClose = () => setMenuDropdow(false);

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
                {menuOpen ? <FaTimes className='icon-hamb' /> : <FaBars className='icon-hamb' />}
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
                {userActiv ? (
                    <div className="carrito-icon">
                        <h5><GrUserAdmin className='icon-user' /></h5>
                    </div>
                ) : null}
                {userActiv && userActiv.role === 'admin' ? (
                    <NavDropdown
                        id='menu-dropDown'
                        title='Administración'
                        menuVariant='grey'
                        onToggle={() => setMenuDropdow(!menuDropdow)}
                        show={menuDropdow}
                        className="dropdown-side"
                    >
                        <li>
                            <NavLink className='drop-item' to={'productos'} onClick={() => { menuDropdowClose(); setClicked(false) }}><MdOutlineAddModerator /> Administrar productos</NavLink>
                        </li>
                        <li>
                            <NavLink className='drop-item' to={'perfil/admin'} onClick={() => { menuDropdowClose(); setClicked(false) }}><FaUser /> Perfil</NavLink>
                        </li>
                       {/*  <li>
                            <NavLink ><FiLogOut onClick={handleLogout} /> Cerrar sesión</NavLink>
                        </li> */}
                    </NavDropdown>

                ) : null}

                <div className='btn-contacto-login'>
                    <Button btn={{ clase: "contactanos", texto: "Contactanos" }} btnClick={btnClickContacto} />
                    <h1 className='icon-whatsapp'><FaWhatsapp onClick={handleSubmitWhatsapp} /></h1>
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
