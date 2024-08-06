/* import React, { useContext } from 'react';
import { contexto } from '../Contexto/Contexto';
import './Cards.css';

function Cards() {
  const { datos } = useContext(contexto);

  return (
    <div className='cards'>
      {datos.imgEscuela && datos.imgEscuela.map((imagen, index) => (
        <div key={index} className="cards-item">
          <img src={imagen.url} alt={`Imagen ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default Cards; */
import React from 'react';
import './Cards.css';

function Cards({ images }) {
  return (
    <div className='cards'>
      {images && images.map((image, index) => (
        <div key={index} className="cards-item">
          <img src={image.url} alt={`Imagen ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default Cards;

