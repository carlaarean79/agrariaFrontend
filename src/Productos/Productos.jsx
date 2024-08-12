import React, { useContext, useEffect, useState } from 'react';
import './Productos.css';
import { contexto } from '../Contexto/Contexto';
import Cards from '../Cards/Cards';

function Productos({categoria}) {
  const {datos, setDatos} = useContext(contexto);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
     const productsInOrderPerCategory = (productos) => {

      if (!Array.isArray(productos)) {
        return []; // Devuelve un array vacío si productos no es un array
      }

      return productos.sort((a, b) => {
        const nameA = a.categoria.name.toLowerCase();
        const nameB = b.categoria.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }; 

    const groupProductsPerCategory = (productos) => {
      return productos.reduce((acc, producto) => {
        const nameCategory =  producto.categoria.name;
console.log(productos);

        if (!acc[nameCategory]) {
          acc[nameCategory] = [];
        }

        acc[nameCategory].push(producto);
        return acc;
      }, {});
    };

    const orderProducts = productsInOrderPerCategory(datos.productos);
    const productPerCategory = groupProductsPerCategory(orderProducts);
    setOrderProducts(productPerCategory); 

  }, [datos.productos, categoria]);

  return (
    <div className='container-all-productos'>
       <div className="banner-productos">
        <div className="caption-productos">
          <p className='titulo'>Nuestros Productos</p>
        </div>
      </div>
      <div className="productos">
        {Object.keys(orderProducts).map((categoria) => (
          <div className="categorias" key={categoria}>
            <h2>{categoria}</h2>
            <div>
              {orderProducts[categoria].length > 0 ? (
                <Cards dato={orderProducts[categoria]} />
              ) : (
                <p>No hay productos en esta categoría.</p>
              )}
            </div>
          </div>
        ))}
      </div> 
        
    </div>
  );
}

export default Productos;
