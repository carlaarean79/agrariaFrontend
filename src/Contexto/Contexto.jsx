import { createContext, useEffect, useState } from "react";
import { URL_CATEGORIA, URL_ENTORNO, URL_IMAGENES, URL_PEDIDO, URL_PRODUCTOS, URL_USUARIOS } from '../Endpoints/endopints';
import { fetchGet } from "../funcionesFetch/FuntionsFetch";

export const contexto = createContext({});

export const ProviderContext = ({ children }) => {
  const [datos, setDatos] = useState({
    imgEscuela: [],
    entorno: [],
    categoria: [],
    productos: [],
    carrito: [],
    usuarios: [],
    perfil:[],
    pedidos: [],
    refresh: true,
    
  });

  const vaciarCarrito = () => {
    setDatos(prevDatos => ({ ...prevDatos, carrito: [] }));
  };
  
 
  
  

  useEffect(() => {
    if (datos.refresh) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const [entorno, categoria, productos, imgEscuela, usuarios, pedidos] =
          await Promise.all([
            fetchGet(URL_CATEGORIA, token),
            fetchGet(URL_ENTORNO, token),
            fetchGet(URL_PRODUCTOS, token),
            fetchGet(URL_IMAGENES, token),
            fetchGet(URL_USUARIOS, token),
            fetchGet(URL_PEDIDO,token)
          ]);
          
          setDatos(prev => ({
            ...prev,
            imgEscuela,
            entorno,
            categoria,
            productos,
            usuarios,
            pedidos,
            refresh: false,
          }));
          
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [datos.refresh]);  

  const actualizarPedidos = async () => {
    try {
      const token = localStorage.getItem('token');
      const pedidos = await fetchGet(URL_PEDIDO, token);
      setDatos(prevDatos => ({
        ...prevDatos,
        pedidos,
        refresh: false,
      }));
    } catch (error) {
      console.error('Error al actualizar los pedidos:', error);
    }
  };

  
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
    <contexto.Provider value={{ datos, setDatos, agregarAlCarrito, vaciarCarrito, actualizarPedidos }}>
      {children}
    </contexto.Provider>
  );
};
