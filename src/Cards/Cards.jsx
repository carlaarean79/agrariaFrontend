import React, { useContext, useState } from 'react';
import './Cards.css';
import Modal from '../Modal/Modal';
import { contexto } from '../Contexto/Contexto';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { fetchDelete, fetchPut } from '../funcionesFetch/FuntionsFetch';
import { URL_PRODUCTOS } from '../Endpoints/endopints';
import AlertProducto from '../AlertProducto/AlertProducto';

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
    stock:0
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

    // Asegura que el valor sea un número válido cuando el nombre es 'price'
    setEditProducto((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };



  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      console.log('Datos que se envían:', editProducto);
      const response = await fetchPut(`${URL_PRODUCTOS}/${producto.id}`, editProducto, localStorage.getItem('token'));
      console.log('Respuesta del servidor:', response);
      if (response) {
        setDatos((prev) => ({ ...prev, refresh: true }));
        setIsEditing(false); // Cerrar el modal de edición después de guardar
      }
    } catch (error) {
      console.error('Error al editar:', error);
      throw new Error(error.message + ' Error al editar');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProducto = () => {
    setAlerta({
      estado: true, tipo: 'eliminar',
      idTexto: 'eliminar', mensaje: '¿Seguro que quiere eliminar esta sucursal?'
    });
  };

  const handleAlertAction = async (action) => {
    switch (action) {
      case 'editar':
        setIsEditing(true); // Abrir el modal si se confirma la edición
        setAlerta({ estado: false, tipo: '', idTexto: '' });
        break;
      case 'eliminar':
        try {
          const response = await fetchDelete(`${URL_PRODUCTOS}/${producto.id}`, localStorage.getItem('token'));
          if (response) {
            setDatos((prev) => ({ ...prev, refresh: true }));
            setAlerta({ estado: false, tipo: '', idTexto: '' });
          }
        } catch (error) {
          throw new Error("Error al eliminar");
        }
        break;
      case 'cancelar':
      default:
        setAlerta({ estado: false, tipo: '', idTexto: '' });
        break;
    }
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
      
      // Aquí puedes agregar la lógica para agregar al carrito
      agregarAlCarrito({ ...selectedProduct, price: selectedProduct.price }, quantity);
  
      // Decrementar el stock en el backend
      try {
        const response = await fetch(`${URL_PRODUCTOS}/${selectedProduct.id}/stock`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ stock: selectedProduct.stock - quantity }) // Decrementar stock
        });
  
        if (response.ok) {
          // Actualizar la vista del producto con el nuevo stock
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
      // Realiza una solicitud PUT para actualizar el stock
      const response = await fetch(`${URL_PRODUCTOS}/${producto.id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ stock: editProducto.stock }) // Enviar el nuevo stock
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
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
    <div >
      {isEditing && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          {isSaving ? (
            <h1>Cargando...</h1>
          ) : (
            <div>
              <h2>Editar Producto</h2>
              <form>
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
                <label>Imagen URL</label>
                <input
                  type="text"
                  name="imagen"
                  value={editProducto.imagen}
                  onChange={handleEditChange}
                />
                <button type="button" onClick={handleSaveStock}>Guardar Cambios</button>
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

      <div className="cards">
        <div className="cards-container">
          <div className="cards-stock">
            <h1>{producto.name}</h1>
          </div>

          <div className="cards-item" onClick={handleProductClick}>
            <img src={producto.imagen} alt={`Imagen ${producto.name}`} />
          </div>
      
          <div className="titulo">
            <p>Stock: {producto.stock}</p>
            <p>{producto.detalle}</p>
            <h3>$ {producto.price}</h3>
        
          </div>
          {datos.perfil && datos.perfil.role === 'admin' && (
            <div className="admin-actions">
              <button onClick={startEditing} className="edit-button">
                <FaEdit /> Editar
              </button>
              <button onClick={deleteProducto} className="delete-button">
                <FaTrash /> Eliminar
              </button>
            </div>
          )}
          </div>
      </div>

      {alerta.estado && (
        <AlertProducto
          setAlerta={setAlerta}
          idTexto={alerta.idTexto}
          handleAlertAction={handleAlertAction}
          mensaje={alerta.mensaje}
        />
      )}
    </div>
  );
}

export default Cards;
