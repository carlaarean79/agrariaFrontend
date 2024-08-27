import { createContext, useEffect, useState } from "react";
import { URL_CATEGORIA, URL_ENTORNO, URL_IMAGENES, URL_PRODUCTOS, URL_USUARIOS } from '../Endpoints/endopints';
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
    refresh: true,
    
  });

  const vaciarCarrito = () => {
    setDatos(prevDatos => ({ ...prevDatos, carrito: [] }));
  };
  
  const editarProducto = async (productoEditado) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${URL_PRODUCTOS}/${productoEditado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productoEditado),
      });
      setDatos(prevDatos => ({
        ...prevDatos,
        productos: prevDatos.productos.map(producto => 
          producto.id === productoEditado.id ? productoEditado : producto
        ),
      }));
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };
  
  const eliminarProducto = async (productoId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${URL_PRODUCTOS}/${productoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      setDatos(prevDatos => ({
        ...prevDatos,
        productos: prevDatos.productos.filter(producto => producto.id !== productoId),
      }));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };
  

  useEffect(() => {
    if (datos.refresh) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const [entorno, categoria, productos, imgEscuela, usuarios] =
          await Promise.all([
            fetchGet(URL_CATEGORIA, token),
            fetchGet(URL_ENTORNO, token),
            fetchGet(URL_PRODUCTOS, token),
            fetchGet(URL_IMAGENES, token),
            fetchGet(URL_USUARIOS, token)
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
    <contexto.Provider value={{ datos, setDatos, agregarAlCarrito, vaciarCarrito, editarProducto, eliminarProducto }}>
      {children}
    </contexto.Provider>
  );
};
