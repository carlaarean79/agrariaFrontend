import { createContext, useEffect, useState } from "react";
import {URL_IMAGENES} from '../Endpoints/endopints'
import { fetchGet } from "../funcionesFetch/FuntionsFetch";

export const contexto = createContext({});

export const ProviderContext = ({ children }) => {
  const [datos, setDatos] = useState({
    imgEscuela: [],
    refresh: true,
  });

  useEffect(() => {
    if (datos.refresh) {
      const fetchImagenes = async () => {
        try {
          const res = await fetchGet(URL_IMAGENES);
          if (res) {
            setDatos(prev => ({
              ...prev,
              imgEscuela: res,
              refresh: false,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchImagenes();
    }
  }, [datos.refresh]);

  return (
    <contexto.Provider value={{ datos, setDatos }}>
      {children}
    </contexto.Provider>
  );
};
