import React, { useContext, useState } from 'react';
import { contexto } from '../Contexto/Contexto';
import { useNavigate } from 'react-router-dom';
import './PedidoRealizado.css'

function RealizarPedido() {
  const { datos, vaciarCarrito } = useContext(contexto);
  const { carrito } = datos;
  const [formData, setFormData] = useState({ name: '', lastname: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const savePedido = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: new Date(),
          detalle: carrito.map(producto => `${producto.name}: ${producto.cantidad}`).join(', '),
          user: formData, // Asegúrate de que este sea el usuario correcto
          pedidosProducto: carrito.map(producto => ({
            producto: producto.id,
            cantidad: producto.cantidad,
          })),
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el pedido');
      }
  
      const data = await response.json();
      console.log('Pedido guardado:', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  

  const saveUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
       
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }

      const data = await response.json();
      console.log('usuario guardado:', data);
      return data;
    } catch (error) {
      console.error(error);
    }
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioData = await saveUsuario();
    if(usuarioData){
      const pedidoData = await savePedido();

      if (pedidoData ) {
        const phoneNumberData = await getPhoneNumber(); // Obtener el número de teléfono
        
        if (phoneNumberData) { // Asegúrate de que el número se haya obtenido correctamente
          const mensajePedido = generarMensajePedido(carrito, formData);
          const whatsappLink = `https://wa.me/${phoneNumberData}?text=${encodeURIComponent(mensajePedido)}`;
          window.open(whatsappLink, '_blank');
          navigate('/');
          vaciarCarrito(); // Vaciar el carrito después de enviar el pedido
          setFormData({ name: '', lastname: ''}); // Vaciar el formulario
        } else {
          console.error('No se obtuvo el número de teléfono');
        }
      } 
    }
  };



  function generarMensajePedido(pedido, datos) {
    const productos = pedido.map(producto => `${producto.cantidad}  ${producto.name}: ${producto.price} ${producto.detalle }`).join('\n');
    return `Hola! Me gustaría realizar el siguiente pedido:\n${productos}\n\nDatos del usuario:\nNombre: ${datos.name} ${datos.lastname}`;

  }

  const handleCancel = () => {
    vaciarCarrito();
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div>
      <h2 className='h2-form-pedido'>Realizar Pedido</h2>
      <form onSubmit={handleSubmit} className='form-pedido'>
        <div className='input-form'>
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
  
          <label>Apellido:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div className='detalle-producto'>
          <h3>Tu pedido</h3>
          <ul className='detalle-producto-ul'>
            {carrito.map((producto, index) => (
              <li key={index}>{producto.name} - Cantidad: {producto.cantidad}</li>
            ))}
          </ul>
        </div>
        <div className='container-btn'>
          <button className='btn-pedido' type="submit">Enviar por WhatsApp</button>
          <button className='btn-cancelar' type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
  
}

export default RealizarPedido;
