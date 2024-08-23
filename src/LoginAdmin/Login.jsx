import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexto/AuthContext";
import { contexto } from "../Contexto/Contexto";

function Login() {
  const navigate = useNavigate();
  const { datos, setDatos } = useContext(contexto); // Añadido `setDatos` para actualizar el contexto
  const { login, fetchProfile } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '', role: ''});
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
        userActiv: userProfile
      }));
      
      alert("Iniciaste sesión con éxito");
      navigate('/perfil/admin');
     
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div>
        <h1>Iniciar Sesión</h1>
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
        <button>Iniciar Sesión</button>
      </div>
    </form>
  );
}

export default Login;
