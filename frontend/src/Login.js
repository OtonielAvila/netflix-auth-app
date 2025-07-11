import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegistering
      ? "http://localhost:8000/api/register/"
      : "http://localhost:8000/api/login/";

    try {
      const res = await axios.post(url, { username, password });

      if (isRegistering) {
        setMsg("Registro exitoso. Inicia sesión.");
        setIsRegistering(false);
      } else {
        setMsg("Sesión iniciada.");
        localStorage.setItem("access", res.data.access);   // guarda token
        localStorage.setItem("refresh", res.data.refresh);
      }
    } catch (err) {
      setMsg("Error. Verifica tus datos.");
    }
  };

  return (
    <div className="App">
      <h1 className="cecyflix-logo">CECYFLIX</h1>
      <h2>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isRegistering ? "Registrarse" : "Ingresar"}
        </button>
      </form>

      <p>{msg}</p>
      <p>
        {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <span
          style={{ color: "#e50914", cursor: "pointer" }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Inicia sesión" : "Regístrate"}
        </span>
      </p>
    </div>
  );
};

export default Login;