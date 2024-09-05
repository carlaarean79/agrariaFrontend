import React, { useContext, useState } from 'react';
import './Cards.css';
import Modal from '../Modal/Modal';
import { contexto } from '../Contexto/Contexto';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetchDelete } from '../funcionesFetch/FuntionsFetch';
import { URL_PRODUCTOS } from '../Endpoints/endopints';
import Alerta from '../AlertProducto/AlertProducto';
import Button from '../Button/Button';

function Cards({ producto }) {
  if (!producto) {
    return <div>Producto no disponible</div>;
  }

  const { setDatos, datos, agregarAlCarrito } = useContext(contexto);
  const [alerta, setAlerta] = useState({
    estado: false, tipo: '', idTexto: '', mensaje: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editProducto, setEditProducto] = useState({
    name: '',
    imagen: '',
    price: '',
    detalle: '',
    stock: 0
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const startEditing = () => {
    setEditProducto({
      name: producto.name,
      imagen: producto.imagen,
      price: producto.price,
      detalle: producto.detalle,
      stock: producto.stock
    });
    setIsEditing(true); // Abrir el modal de edición
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProducto((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const deleteProducto = () => {
    setAlerta({
      estado: true, 
      tipo: 'eliminar',
      idTexto: 'eliminar', 
      mensaje: '¿Seguro que quiere eliminar este producto?'
    });
  };

  const handleAlertAction = async (action) => {
    if (action === 'eliminar') {
      try {
        const response = await fetchDelete(`${URL_PRODUCTOS}/${producto.id}`, localStorage.getItem('token'));
        if (response) {
          setDatos((prev) => ({ ...prev, refresh: true }));
        }
      } catch (error) {
        console.error("Error al eliminar el producto", error);
      }
    }
    setAlerta({ estado: false, tipo: '', idTexto: '', mensaje: '' });
  };

  const handleProductClick = () => {
    setSelectedProduct(producto);
    setModalOpen(true); // Abrir el modal con detalles del producto
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (selectedProduct) {
      if (quantity > selectedProduct.stock) {
        alert('La cantidad solicitada excede el stock disponible.');
        return;
      }

      agregarAlCarrito({ ...selectedProduct, price: selectedProduct.price }, quantity);

      try {
        const response = await fetch(`${URL_PRODUCTOS}/${selectedProduct.id}/stock`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ stock: selectedProduct.stock - quantity }) 
        });

        if (response.ok) {
          setDatos((prev) => ({ ...prev, refresh: true }));
          setModalOpen(false);
        } else {
          throw new Error('Error al actualizar el stock');
        }
      } catch (error) {
        console.error('Error al actualizar el stock:', error);
      }
    }
  };

  const handleSaveStock = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch(`${URL_PRODUCTOS}/${producto.id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ stock: editProducto.stock })
      });

      if (response.ok) {
        setDatos((prev) => ({ ...prev, refresh: true }));
        setIsEditing(false);
      } else {
        throw new Error('Error al actualizar el stock');
      }
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='cards'>
      {isEditing && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          {isSaving ? (
            <h1>Cargando...</h1>
          ) : (
            <div className='container-all-input-edit'>
              <h2>Editar Producto</h2>

              <form className='form-modal-edit'>
                <div className="img-modal-edit">
                  <img src={editProducto.imagen} />
                </div>
                <div className="input-img-modal-edit">
                  <label>Imagen URL</label>
                  <input
                    type="text"
                    name="imagen"
                    value={editProducto.imagen}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="inputs-modal-edit">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={editProducto.name}
                    onChange={handleEditChange}
                  />
                  <label>Detalle</label>
                  <input
                    type="text"
                    name="detalle"
                    value={editProducto.detalle}
                    onChange={handleEditChange}
                  />
                  <label>Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={editProducto.price}
                    onChange={handleEditChange}
                  />
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={editProducto.stock}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <button className="add-to-cart-button" type="button" onClick={handleSaveStock}>
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      )}

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {selectedProduct && (
            <div>
              <div className="modal-product-details">
                <div className="img">
                  <img src={selectedProduct.imagen} alt={selectedProduct.name} className="modal-product-image" />
                </div>
                <div className="modal-product-info">
                  <h1>{selectedProduct.name}</h1>
                  <h3>$ {selectedProduct.price}</h3>
                  <div className="quantity-control">
                    <p>Cantidad</p>
                    <button className="circle-button" onClick={handleDecrease}>-</button>
                    <span className="quantity-value">{quantity}</span>
                    <button className="circle-button" onClick={handleIncrease}>+</button>
                  </div>
                  <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al Carrito</button>
                </div>
              </div>
              <div className='descripcion'>
                <p>Descripción del producto.</p>
              </div>
            </div>
          )}
        </Modal>
      )}

      <div className="cards-container">
        <div className="cards-stock">
          <h1>{producto.name}</h1>
        </div>
        <img className={'cards-item'} src={producto.imagen} alt={`Imagen ${producto.name}`} onClick={handleProductClick} />
        <div className="titulo">
          <p>Stock: {producto.stock}</p>
          <p className='detalle'>{producto.detalle}</p>
          <h3>$ {producto.price}</h3>
        </div>

        {datos.perfil && datos.perfil.role === 'admin' && (
          <div className="admin-actions">
            <button onClick={startEditing} className="edit-button">
              <FaEdit />
            </button>
            <button onClick={deleteProducto} className="delete-button">
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {alerta.estado && (
  <Alerta
    isOpen={alerta.estado}
    texto={alerta.mensaje}
    proceso={alerta.tipo}
    onConfirm={() => handleAlertAction(alerta.idTexto)}  // Aquí llamas a la función cuando se confirme
    onCancel={() => setAlerta({ estado: false, tipo: '', idTexto: '', mensaje: '' })}  // Aquí manejas la cancelación
  />
)}

    </div>
  );
}

export default Cards;
