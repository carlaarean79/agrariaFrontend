import React, { useContext, useState } from 'react';
import { contexto } from '../Contexto/Contexto';
import './GaleriaImg.css'


const GaleriaImg = () => {
  const { datos } = useContext(contexto);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  // Calcula el total de pag. divide la cant. de img del contexto por las que quiero mostrar
  //math.ceil: redondea redondea hacia arriba al número entero más cercano.
  //Por ejemplo, si tienes 20 imágenes y 6 imágenes por página, el resultado de 20 / 6 es aproximadamente 3.33, 
  //y Math.ceil(3.33) redondea a 4, indicando que necesitas 4 páginas para mostrar todas las imágenes.
  const totalPages = Math.ceil(datos.imgEscuela.length / imagesPerPage);

  // obtiene la cant de img en la pag actual
  //  (currentPage - 1) * imagesPerPage: Esto calcula el índice inicial de las imágenes para la página actual. Por ejemplo, si estás en la página 2 y
  // tienes 6 imágenes por página, el cálculo sería (2 - 1) * 6, que es 6.
  const currentImages = datos.imgEscuela.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  //manejo del cambio de pag
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container-all-galery'>
      <div className="image-gallery">
        {currentImages.map((imgEscuela, index) => (
          <img key={index} src={imgEscuela.url} alt={imgEscuela.name} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GaleriaImg;
