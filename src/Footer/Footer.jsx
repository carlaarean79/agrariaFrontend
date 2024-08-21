import React from 'react'
import './Footer.css'
import { FaSquareFacebook, FaSquareWhatsapp } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoGmail } from "react-icons/bi";

function Footer() {
  return (
    <div className='container-all-footer'>
      <div className="contacto">
        <div className="seguinos">
          <p>Contacto</p>
        </div>
        <div className="redes">
          <p><BiLogoGmail /> agrariaLF@gmail.com</p>
          <p><FaSquareWhatsapp /> 2244405588</p>
        </div>


      </div>
      <div className='logo-footer'>
        <img src='https://i.ibb.co/VQ8gBNm/logo-escuela.jpg' className='logo' />
        {/*  <img src='https://i.ibb.co/QHKLc2d/1.png' className='logo-nombre' /> */}
      </div>
      <div className="texto-redes">
        <div className="seguinos">
          <p>Seguinos en nuestras redes</p>
        </div>
        <div className="redes">
          <p><FaSquareFacebook /> @agrariaLF</p>
          <p><RiInstagramFill /> Escuela Agraria Las Flores</p>
        </div>
      </div>



    </div>
  )
}

export default Footer