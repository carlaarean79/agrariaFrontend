import React from 'react'
import Button from '../Button/Button'
import './NavBar.css'
import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


function NavBar() {
    const navigator = useNavigate();
    const btnClickContacto = (e) => {
        return navigator('/contacto');
    }

    const btnClickLogin = (e) => {
        return navigator('/login');
    }
    return (
        <div className='navBar-container-all'>
            <div className='navBar-container'>
                <div className='logo-navBar'>
                    <NavLink to='/'><img src='https://i.ibb.co/VQ8gBNm/logo-escuela.jpg' className='logo' /> </NavLink>
                    <h1>EESAN°1</h1>
                </div>


                <div className='texto-enlaces'>
                    <NavLink to='/'> <h1>Nuestra Escuela</h1></NavLink>
                    <NavLink to='productos'>  <h1>Productos</h1></NavLink>
                    <NavLink to='carrito'> <h1><FaShoppingCart /></h1></NavLink>

                    <div className='btn-contacto-login'>
                        <Button btn={{ clase: "contactanos", texto: "Contactanos" }} btnClick={btnClickContacto} />
                        <Button btn={{ clase: "login", texto: "Iniciar Sesión" }} btnClick={btnClickLogin} />
                    </div>
                </div>

            </div>
            <div className='banner'>
                <h1>Escuela de Educación Secundaria Agropecuaria N°1</h1>
                <h3>Stella María Ricchiardi de Fiore</h3>
            </div>
        </div>
    )
}

export default NavBar