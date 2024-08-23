import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contexto } from './Contexto';
import { URL_AUTH_LOGIN_ADMIN, URL_AUTH_PROFILE_ADMIN } from '../Endpoints/endopints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const { datos, setDatos } = useContext(contexto);
  const [auth, setAuth] = useState({ 
    token: localStorage.getItem('token') || null,
    user: null
  });

  useEffect(() => {
    if (auth.token) {
      fetchProfile(auth.token);
    }
  }, [auth.token]);

  const login = async (email, password, role) => {
    const response = await fetch(URL_AUTH_LOGIN_ADMIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el inicio de sesión');
    }

    const data = await response.json();
    console.log(data);
    
    localStorage.setItem('token', data.access_token);
    setAuth({ token: data.access_token, user: null });
    await fetchProfile(data.access_token);
  /*   navigate('/perfil/admin');  */   
  };

  const fetchProfile = async (token) => {
    const response = await fetch(URL_AUTH_PROFILE_ADMIN, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setAuth((prevAuth) => ({ ...prevAuth, user: data })); 
    setDatos((prev) => ({
      ...prev,
      userActiv: data,
      refresh: true
    }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    setDatos((prev) => ({
      ...prev,
      userActiv: null,
      token: null,
      refresh: true
    }));
    navigate('/ ');  
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, fetchProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
