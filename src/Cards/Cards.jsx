import React, { useState } from 'react';
import './Cards.css';
import Modal from '../Modal/Modal';

function Cards({dato }) {
const [modalOpen, setModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [quantity, setQuantity] = useState(1);

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
  return (
    < div className='cards'>
 
      {dato.map((item, index) => {
        return (
          <div key={index} >
            <div className="cards-item" onClick={() => handleCardClick(item)}>
            <img src={item.imagen} alt={`Imagen ${item.name}`} />
            </div>
            <div className="titulo">
              <h1>{item.name}</h1>
              <p>{item.descripcion}</p>
              <h3>$ {item.price}</h3>
            </div>
          </div>
        );
      })}
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
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
            <div className='desripcion'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem est quam distinctio reiciendis tenetur in libero sed, quis qui amet cupiditate assumenda, impedit praesentium, rerum illum incidunt labore enim laudantium!</p>
            </div>
          </div>
        
        )}
      </Modal>
    </div>
  );
}

export default Cards;
