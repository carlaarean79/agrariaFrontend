
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../Contexto/AuthContext";
import { useNavigate } from "react-router-dom";
import { contexto } from "../Contexto/Contexto";
import { fetchGet } from "../funcionesFetch/FuntionsFetch";
import { URL_USUARIOS } from "../Endpoints/endopints";
import { FiLogOut } from 'react-icons/fi';

function Perfil() {
    const { datos } = useContext(contexto);
    const { userActiv } = datos || {}; // Verifica si datos es undefined
    const { logout } = useAuth();
    const [perfil, setPerfil] = useState(null);
    const navigate = useNavigate();

    const perfilReload = async () => {
        try {
            const perfilActual = await fetchGet(URL_USUARIOS + '/' + userActiv?.sub, localStorage.getItem('token'));
            console.log("usuario activo" + userActiv.role);
                
            if (perfilActual) {
                setPerfil(perfilActual);
                
            }
            
        } catch (error) {
            console.error("Error al recargar el perfil:", error);
        }
    };

    useEffect(() => {
        if (userActiv) {
            perfilReload();
        
        }
    }, [userActiv]);

   

    return (
        <div className="containerAll-Form-perfil">
            {perfil ? (
                <>
                    <div className="perfil">
                        <h1>BIENVENIDO : {userActiv.name} {userActiv.lastname}</h1>
                        <ul>
                            <li><h3>{`${perfil.name} ${perfil.lastname}`}</h3></li>
                            <li><h3>Email: {perfil.email}</h3></li>
                            <li><h3>Password: {perfil.password}</h3></li>
                            <li><h3>Rol: {perfil.role}</h3></li>
                        </ul>
                        <button className="logout" onClick={logout}>
                            <FiLogOut /> Cerrar Sesión
                        </button>
                    </div>
                </>
            ) : (
                <h1>Espere por favor...</h1>
            )}
        </div>
    );
}

export default Perfil;
