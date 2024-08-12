import { createContext, useEffect, useState } from "react";
import { URL_CATEGORIA, URL_ENTORNO, URL_IMAGENES, URL_PRODUCTOS } from '../Endpoints/endopints'
import { fetchGet } from "../funcionesFetch/FuntionsFetch";

export const contexto = createContext({});

export const ProviderContext = ({ children }) => {
  const [datos, setDatos] = useState({
    imgEscuela: [],
    entorno: [],
    categoria: [],
    productos: [],
    refresh: true,
  });



 
  useEffect(() => {
    if (datos.refresh) {
      const fetchData = async () => {
        try {
          const [entorno, categoria, productos, imgEscuela] =
            await Promise.all([

              fetchGet(URL_CATEGORIA),
              fetchGet(URL_ENTORNO),
              fetchGet(URL_PRODUCTOS),
              fetchGet(URL_IMAGENES)]);
            

          setDatos(prev => ({
            ...prev,
            imgEscuela,
            entorno,
            categoria,
            productos,
            refresh: false,
          }));

        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [datos.refresh]);

  return (
    <contexto.Provider value={{ datos, setDatos }}>
      {children}
    </contexto.Provider>
  );
};
