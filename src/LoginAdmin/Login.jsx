import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexto/AuthContext";
import { contexto } from "../Contexto/Contexto";
import './Login.css';
function Login() {
  const navigate = useNavigate();
  const { datos, setDatos } = useContext(contexto); // Añadido `setDatos` para actualizar el contexto
  const { login, fetchProfile } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '', role: '' });
  const { email, password, role } = loginData;

  const onChan = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password, role].includes("")) {
      alert("Los campos deben completarse");
      return;
    }

    try {
      const token = await login(email, password, role);
      const userProfile = await fetchProfile(token);

      setDatos(datos => ({
        ...datos,
        userActiv: userProfile,
        refresh: true
      }));
      navigate('/perfil/admin');


    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='container-all-login'>
      <form onSubmit={handleSubmit} className="form-login">
        <h2 className='h2-form-login'>INICIAR SESIÓN</h2>
        <div className='input-form-login'>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={onChan}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={onChan}
          />
          <input
            type="text"
            name="role"
            placeholder="Rol"
            value={role}
            onChange={onChan}
          />
        </div>
        <div className='container-btn-login'>
          <button className='btn-login' >Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
