import { createContext, useEffect, useState } from "react";
import { URL_CATEGORIA, URL_ENTORNO, URL_IMAGENES, URL_PRODUCTOS, URL_USUARIOS } from '../Endpoints/endopints'
import { fetchGet } from "../funcionesFetch/FuntionsFetch";

export const contexto = createContext({});

export const ProviderContext = ({ children }) => {
  const [datos, setDatos] = useState({
    imgEscuela: [],
    entorno: [],
    categoria: [],
    productos: [],
    carrito:[],
    usuarios:[],
    refresh: true,
  });


  const vaciarCarrito = () => {
    setDatos(prevDatos => ({ ...prevDatos, carrito: [] }));
  };
 
  useEffect(() => {
    if (datos.refresh) {
      const fetchData = async () => {
        try {
          const [entorno, categoria, productos, imgEscuela, usuarios] =
            await Promise.all([

              fetchGet(URL_CATEGORIA),
              fetchGet(URL_ENTORNO),
              fetchGet(URL_PRODUCTOS),
              fetchGet(URL_IMAGENES),
              fetchGet(URL_USUARIOS)
           ]);
            

          setDatos(prev => ({
            ...prev,
            imgEscuela,
            entorno,
            categoria,
            productos,
            usuarios,
            refresh: false,
          }));

        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [datos.refresh]);


  const agregarAlCarrito = (producto, cantidad) => {
    setDatos(prevDatos => {
      const productoExistente = prevDatos.carrito.find(item => item.id === producto.id);

      if (productoExistente) {
        return {
          ...prevDatos,
          carrito: prevDatos.carrito.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        };
      } else {
        return {
          ...prevDatos,
          carrito: [...prevDatos.carrito, { ...producto, cantidad }]
        };
      }
    });
  };


  return (
    <contexto.Provider value={{ datos, setDatos, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </contexto.Provider>
  );
};
