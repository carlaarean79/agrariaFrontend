import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contexto } from './Contexto';
import { URL_AUTH_LOGIN_ADMIN, URL_AUTH_PROFILE_ADMIN, URL_USUARIOS } from '../Endpoints/endopints';
import { fetchGet, fetchPost } from '../funcionesFetch/FuntionsFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const { datos, setDatos } = useContext(contexto);
  const [auth, setAuth] = useState({ 
    token: localStorage.getItem('token') || null,
    user: null
  });
  useEffect(()=>{
    if(auth.token){
      fetchProfile(auth.token)
    }
  },[]);

  useEffect(() => {
      actualizarPerfil()
  }, [auth.user]);

  const login = async (email, password, role) => {
    try {
      const user = { email, password, role };
      console.log("Datos de usuario a enviar:", user);
  
      const data = await fetchPost(URL_AUTH_LOGIN_ADMIN, user);
      
      if (data) {
        localStorage.setItem('token', data.access_token);
        setAuth({ token: data.access_token, user: null });
        fetchProfile(data.access_token);
      }
    } catch (error) {
      console.log("Error en login:", error);
    }
  };
  
  

  const fetchProfile = async (token) => {
    try {
      const data = await fetchGet(URL_AUTH_PROFILE_ADMIN,token)
      if (data) {
        setAuth((prevAuth) => ({ ...prevAuth, user: data })); 
      }
    } catch (error) {
      console.log(error);
    }
    }
const actualizarPerfil = async () => {
  if (auth.user) {
    try {
      const perfilActual = await fetchGet(`${URL_USUARIOS}/${auth.user.sub}`, localStorage.getItem('token'));  
      if (perfilActual) {
        setDatos(prevDatos => ({
          ...prevDatos,
          perfil: perfilActual,
        }));
        navigate('/perfil/admin');
      }
    } catch (error) {
      console.error("Error al recargar el perfil:", error);
    }
  } else {
    console.log(auth.user);
    setDatos(prevDatos => ({
      ...prevDatos,
      perfil: null,
    }));    
  }
}

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    navigate('/');
  };
  

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, fetchProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
