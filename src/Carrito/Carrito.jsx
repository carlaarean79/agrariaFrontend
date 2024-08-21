import React, { useContext } from 'react';
import { contexto } from '../Contexto/Contexto';
import './Carrito.css'; // Asegúrate de crear un archivo CSS para el estilo del carrito
import { useNavigate } from 'react-router-dom';

function Carrito() {
  const { datos, vaciarCarrito } = useContext(contexto); // Accede al carrito desde el contexto
  const { carrito } = datos;
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return <div className='carrito-empty'><p>Tu carrito está vacío</p></div>;
  }

  const handleRealizarPedido = () => {
    navigate('pedido');
  };

  const handleCancel =  () => {
    navigate('/productos'); // Regresa a la página anterior
  

  };

  const handleEnpty = () =>{
    vaciarCarrito();
  }

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      <table className="carrito-tabla">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Detalle</th>
            <th>Precio por unidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((producto, index) => (
            <tr key={index}>
              <td><img src={producto.imagen} alt={producto.name} className="carrito-item-imagen" /></td>
              <td>{producto.name}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.detalle}</td>
              <td>$ {producto.price}</td>
              <td>$ {producto.price * producto.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="carrito-total">
        <h3>
          Total a pagar: 
        </h3>
         <h3>$ {carrito.reduce((total, item) => total + item.price * item.cantidad, 0)}
        </h3>
      </div>
      <div className='container-button'>
      <button className='btn-pedido-carrito' onClick={handleRealizarPedido}>Realizar Pedido</button>
      <button className='btn-enpty-cart' type="button" onClick={handleEnpty}>Vaciar Carrito</button>
      <button className='btn-seguir-compra' type="button" onClick={handleCancel}>Seguir comprando</button>
      </div>
    </div>
  );
}

export default Carrito;
