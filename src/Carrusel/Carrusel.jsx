import { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { contexto } from '../Contexto/Contexto'; 
import './Carrusel.css';

function ExampleCarouselImage({ src, alt }) {
  return <img className="carousel-image" src={src} alt={alt} />;
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const { datos } = useContext(contexto);
  const [interval, setInterval] = useState(2500); // Controla la velocidad de deslizamiento

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel interval={interval} // Establece el intervalo de tiempo
    slide={true} //activa la animación
    Index={index} 
    onSelect={handleSelect}
     className="custom-carousel">
      {datos.imgEscuela.map((img, idx) => (
        <Carousel.Item key={idx}>
          <ExampleCarouselImage src={img.url} alt={`Slide ${idx + 1}`} />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
