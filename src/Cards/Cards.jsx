import React, { useContext, useState } from 'react';
import './Cards.css';
import Modal from '../Modal/Modal';
import { contexto } from '../Contexto/Contexto';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Cards({ dato }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [editedProduct, setEditedProduct] = useState({});
  const { datos, agregarAlCarrito, setDatos} = useContext(contexto);

  if (!Array.isArray(dato)) {
    return <div>No hay productos para mostrar.</div>;
  }

  const handleCardClick = (item) => {
    setSelectedProduct(item);
    setModalOpen(true);
  };



  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      agregarAlCarrito(selectedProduct, quantity);
      setModalOpen(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedProduct(item),
    setEditedProduct(item),
    setEditModalOpen(true),
    console.log('Editar producto:', item);
  };

  const handleEditChange = (e) =>{
e.preventDefault();
const {name, value} = e.target;
setEditedProduct(prev => ({
...prev,[name]: value
}));

  }
  const handleDelete = (item) => {
    eliminarProducto();
    console.log('Eliminar producto:', item);
  };

  const handleSaveEdit = ()=>{
    setDatos(prevDatos => ({
      ...prevDatos,
      productos: prevDatos.productos.map(producto =>
        producto.id === editedProduct.id ? editedProduct : producto
      ),
    }));
    setEditModalOpen(false);
  }
  return (
    <div className='cards'>
    
      {dato.map((item, index) => (
        <div key={index}>
          <div className="cards-item" onClick={() => handleCardClick(item)}>
            <img src={item.imagen} alt={`Imagen ${item.name}`} />
          </div>
          <div className="titulo">
            <h1>{item.name}</h1>
            <p>{item.detalle}</p>
            <h3>$ {item.price}</h3>
            {datos.userActiv && (
              <div className="admin-actions">
                <button onClick={() => handleEdit(item)} className="edit-button">
                  <FaEdit /> Editar
                </button>
                <button onClick={() => handleDelete(item)} className="delete-button">
                  <FaTrash /> Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
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
      <Modal isOpen={editModalOpen} onClose={() => setModalOpen(false)}>
        {editedProduct && (
          <div>
            <h2>Editar Producto</h2>
            <form>
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleEditChange}
              />
              <label>Detalle</label>
              <input
                type="text"
                name="detalle"
                value={editedProduct.detalle}
                onChange={handleEditChange}
              />
              <label>Precio</label>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleEditChange}
              />
              <label>Imagen URL</label>
              <input
                type="text"
                name="imagen"
                value={editedProduct.imagen}
                onChange={handleEditChange}
              />
              <button type="button" onClick={handleSaveEdit}>Guardar Cambios</button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Cards;