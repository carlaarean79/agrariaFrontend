// ContactMe.js
import React, { useEffect, useState } from 'react';

function ContactMe({ pedido }) {
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    const getPhoneNumber = async () => {
      try {
        const resp = await fetch('http://localhost:3000/whatsapp-send/number')
        const data = await resp.json();
        setPhoneNumber(data);  
      } catch (error) {
        console.error('No se pudo obterner el número de telefono', error);
      }
      console.log(resp);
      

    };
    getPhoneNumber();
  }, []);

  function generarMensajePedido(pedido) {
    // Aquí puedes formatear el mensaje del pedido según tus necesidades
    const productos = pedido.map(producto => `${producto.name}: ${producto.price}`).join('\n');
    return `Hola! Me gustaría realizar el siguiente pedido:\n${productos}`;
  }

  function handleIniciarChatClick() {
    const mensajePedido = generarMensajePedido(pedido);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensajePedido)}`;
    window.open(whatsappLink, '_blank');
    console.log('whatsapplink' + whatsappLink);
    

  }

  return (
    <button onClick={handleIniciarChatClick}>Iniciar Chat</button>
  );
}

export default ContactMe;




