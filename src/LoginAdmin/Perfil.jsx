import { useContext, useEffect } from "react";
import { useAuth } from "../Contexto/AuthContext";
import { useNavigate } from "react-router-dom";
import { contexto } from "../Contexto/Contexto";
import { FiLogOut } from 'react-icons/fi';

function Perfil() {
    const { datos, perfilReload } = useContext(contexto);
    const { userActiv, perfil } = datos || {}; // Verifica si datos es undefined
    const { logout } = useAuth();

    useEffect(() => {
        if (userActiv) {
            perfilReload(); // Llama al método perfilReload del contexto
        }
    }, [userActiv]);

    return (
        <div className="containerAll-Form-perfil">
            {perfil ? (
                <>
                    <div className="perfil">
                        <h1>BIENVENIDO </h1>
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
