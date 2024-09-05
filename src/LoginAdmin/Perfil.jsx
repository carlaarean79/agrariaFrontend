import { useContext, useState } from "react";
import { useAuth } from "../Contexto/AuthContext";
import { contexto } from "../Contexto/Contexto";
import { FiLogOut } from 'react-icons/fi';
import './Perfil.css';
import { FaAddressBook, FaThList } from "react-icons/fa";
import { URL_PEDIDO } from "../Endpoints/endopints";
import { useNavigate } from 'react-router-dom';
import TablaPedidos from "../PedidosRecibidos/Pedidos";
import Modal from "../Modal/Modal";

function Perfil() {
    const { datos } = useContext(contexto);
    const perfil = datos.perfil;
    const { logout } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const getPedido = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(URL_PEDIDO, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Error al obtener los pedidos');
            }

            const data = await res.json();
            return data;

        } catch (error) {
            console.error('Se produjo un error al obtener los pedidos:', error);
            throw error;
        }
    };

    const handleClick = async () => {
        if (!isModalOpen) {
            try {
                const pedidosData = await getPedido();
                setPedidos(pedidosData);
                setIsModalOpen(true);
            } catch (error) {
                console.error('Se produjo un error al hacer clic:', error);
                alert('Hubo un problema al obtener los pedidos. Inténtalo de nuevo más tarde.');
            }
        } else {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="containerAll-Form-perfil">
            {perfil && (
                <>
                    <div className="container-perfil">
                        <h1>BIENVENIDO</h1>
                        <h3 className="h3-nombre-perfil">{`${perfil.name} ${perfil.lastname}`}</h3>
                        <ul className="ul-perfil">
                            <li><h3>Email: {perfil.email}</h3></li>
                            <li><h3>Password: {perfil.password}</h3></li>
                            <li><h3>Rol: {perfil.role}</h3></li>
                        </ul>
                        <div className="button-cerrarsesion">
                            <button className="logout" onClick={logout}>
                                <FiLogOut /> Cerrar Sesión
                            </button>
                            {perfil.role === 'admin' && (
                                <button className="logout" onClick={handleClick}>
                                    <FaThList /> Ver pedidos
                                </button>
                            )}
                            <button className="logout" onClick={logout}>
                                <FaAddressBook /> Ver clientes
                            </button>
                        </div>
                    </div>
                </>
            )}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TablaPedidos pedidos={pedidos} />
                </Modal>
            )}
        </div>
    );
}

export default Perfil;
