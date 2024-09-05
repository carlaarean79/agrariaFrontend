import React, { useContext, useState } from 'react';
import { contexto } from '../Contexto/Contexto';
import { useNavigate } from 'react-router-dom';
import './PedidoRealizado.css';
import { fetchPost } from '../funcionesFetch/FuntionsFetch';
import { URL_PEDIDO, URL_USUARIOS } from '../Endpoints/endopints';

function RealizarPedido() {
  const { datos, vaciarCarrito } = useContext(contexto);
  const { carrito } = datos;
  const [formData, setFormData] = useState({ name: '', lastname: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const savePedido = async (userPrueba) => {
    try {
      console.log(typeof userPrueba.id)
      const data = {
        fecha: new Date(),  
        detalle: carrito.map(producto => `Cantidad: ${producto.cantidad} Producto: ${producto.name} `).join(', '),
        user: {
          id: userPrueba.id, 
        },
        pedidoProducto: carrito.map(producto => ({
          producto: {
            id: producto.id  // Asegúrate de que esto coincida con la estructura esperada en PedidoProductoDto
          },
          cantidad: producto.cantidad
        })),
      };
  
      console.log('Datos del pedido:', data);
  
      const response = await fetchPost(URL_PEDIDO, data); 
      return response;
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      throw error;
    }
  };
  

  const saveUsuario = async () => {
    try {
      const body = {
        name: formData.name,
        lastname: formData.lastname,
      };

    
      const response = await fetch(URL_USUARIOS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json(); // Asegúrate de convertir a JSON
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };
  const getPhoneNumber = async () => {
    try {
      const resp = await fetch('http://localhost:3000/whatsapp-send/number');
      const data = await resp.json();
      return data.phoneNumber;
    } catch (error) {
      console.error('Error al obtener el número de teléfono:', error);
      return null;
    }
  };

  function generarMensajePedido(pedido, datos) {
    const productos = pedido.map(producto => `Cantidad: ${producto.cantidad}
       Producto: ${producto.name} Precio:${producto.price} Detalle: ${producto.detalle }`).join('\n');
    return `Hola! Me gustaría realizar el siguiente pedido:\n ${productos}\n\nDatos del usuario:\nNombre: ${datos.name} ${datos.lastname}`;

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Obtener datos del usuario
      const usuarioData = await saveUsuario();
      if (!usuarioData) {
        console.error('No se obtuvo información del usuario');
        return;
      }
  
      // Crear el pedido
      const pedidoData = await savePedido(usuarioData);
      if (!pedidoData) {
        console.error('No se pudo guardar el pedido');
        return;
      }
  
      // Obtener el número de teléfono
      const phoneNumberData = await getPhoneNumber();
      if (!phoneNumberData) {
        console.error('No se obtuvo el número de teléfono');
        return;
      }
  
      // Generar el mensaje y abrir el enlace de WhatsApp
      const mensajePedido = generarMensajePedido(carrito, formData);
      const whatsappLink = `https://wa.me/${phoneNumberData}?text=${encodeURIComponent(mensajePedido)}`;
      window.open(whatsappLink, '_blank');
 
      // Redirigir y limpiar
      navigate('/');
      vaciarCarrito();
      setFormData({ name: '', lastname: '' });
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    }
  };
  
  
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
              <ul key={index}>
              <li> Cantidad: {producto.cantidad}</li>
              <li >Producto: {producto.name}</li>
              </ul>
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
