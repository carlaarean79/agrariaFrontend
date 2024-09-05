import React, { useContext, useState } from 'react';
import './Pedidos.css';
import { FaTrash } from "react-icons/fa";
import { contexto } from "../Contexto/Contexto";
import { fetchDelete } from '../funcionesFetch/FuntionsFetch';
import { URL_PEDIDO } from '../Endpoints/endopints';
import Alerta from '../AlertProducto/AlertProducto';
import Button from '../Button/Button';


const TablaPedidos = ({ pedidos }) => {
  const { datos, setDatos, actualizarPedidos } = useContext(contexto);
  const perfil = datos.perfil;
  const [alerta, setAlerta] = useState({ estado: false, tipo: '', idTexto: '', mensaje: '', idPedido: null });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Cambia el formato según tus necesidades
  };

  const handleDelete = async () => {
    const id = alerta.idPedido; // Usamos el id almacenado en la alerta
    if (!id) return;

    try {
      const response = await fetchDelete(`${URL_PEDIDO}/${id}`, localStorage.getItem('token'));

      if (response) {
        actualizarPedidos();
        setDatos((prev) => ({
          ...prev,
          refresh: true,
        }));
        setAlerta({ estado: false, tipo: '', idTexto: '', mensaje: '', idPedido: null });
      }
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };

  const confirmDelete = (id) => {
    setAlerta({
      estado: true,
      tipo: 'eliminar',
      idTexto: 'eliminar',
      mensaje: '¿Seguro que quiere eliminar este pedido?',
      idPedido: id, // Almacenar el ID del pedido que se va a eliminar
    });
  };

  return (
    <div>
     {alerta.estado && (
  <Alerta
    isOpen={alerta.estado}
    texto={alerta.mensaje}
    proceso={alerta.tipo === 'eliminar'}
    onClose={() => setAlerta({ estado: false, tipo: '', idTexto: '', mensaje: '', idPedido: null })}
  >
    {/* Botón para confirmar la acción */}
    <Button btn={{ id: "confirmar", clase: "confirmar", texto: "Confirmar" }} btnClick={() => handleDelete()} />
  </Alerta>
)}

      <table className='table-pedidos'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Detalle</th>
            <th>Cliente</th>
            {perfil && perfil.role === 'admin' && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{formatDate(pedido.fecha)}</td>
                <td>{pedido.detalle}</td>
                <td>{pedido.user?.name || ''} {pedido.user?.lastname || ''}</td>
                {perfil && perfil.role === 'admin' && (
                  <td>
                    <button className="delete-button" onClick={() => confirmDelete(pedido.id)}>
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay pedidos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPedidos;
