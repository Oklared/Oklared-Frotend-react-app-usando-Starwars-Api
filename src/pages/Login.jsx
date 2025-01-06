import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Para alternar entre login y registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const validateEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          toast.error("Por favor ingresa un email válido");
          return false;
        }
        return true;
      };

      const validatePassword = () => {
        if (password.length < 6) {
          toast.error("La contraseña debe tener al menos 6 caracteres");
          return false;
        }
        return true;
      };

      if (validateEmail() && validatePassword()) {
        try {
          const user = JSON.parse(localStorage.getItem("user")) || [];
          if (isLogin) {
            if (user && user.email === email && user.password === password) {
              localStorage.setItem("isAuthenticated", true); // Marcar como autenticado
              navigate("/home"); // Redirigir a Home si el login es exitoso
              toast.success("Inicio de sesión exitoso");
            } else {
              throw new Error("Credenciales incorrectas");
            }
          } else if (user && user.email === email) {
            throw new Error("El email ya está registrado");
          } else {
            // Registro: Guardar el nuevo usuario en localStorage
            const newUser = { email, password };
            localStorage.setItem("user", JSON.stringify(newUser)) || [];
            navigate("/"); // Redirigir a Home después de registrar
            toast.success("Registro exitoso");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }

      setLoading(false);
    }, 1000);
  };

  // Lógica para ver el password
  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sección izquierda - Imagen de fondo y estilo */}
      <div className="min-h-screen md:w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/assets/starwars_bg.jpg")' }}>
        <div className="flex justify-center items-center h-full opacity-80 bg-black">
          <h1 className="text-6xl font-bold text-yellow-400">Star Wars</h1>
        </div>
      </div>

      {/* Sección derecha - Contenido principal */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 min-h-screen bg-gray-800 opacity-90">
        {/* Logo en la parte superior */}
        <a href="/" className="mx-auto mb-8">
          <img className="w-44" src={logo} alt="Star Wars Logo" />
        </a>

        {/* Formulario de inicio de sesión o registro */}
        <section className="w-full max-w-sm p-6 space-y-4 bg-gray-700 rounded-lg shadow-2xl border-2 border-yellow-400">
          <h2 className="text-center text-2xl font-semibold text-yellow-300 mb-6">
            {isLogin ? "Log in to continue" : "Sign up to get started"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de entrada de correo electrónico */}
            <div>
              <input
                type="email"
                id="email"
                className="font-normal w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo de entrada de contraseña */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="font-normal w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Password (6+ characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-400"
                  onClick={togglePasswordVisibility}
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Botón para enviar el formulario */}
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-black font-medium text-sm rounded-lg hover:bg-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {/* Enlace para alternar entre login y registro */}
          <div className="text-center mt-5 text-xs text-white">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="text-yellow-400 text-sm hover:underline focus:outline-none"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : " Log in"}
            </button>
          </div>

          {/* Enlace para regresar a Home */}
          <div className="mt-5 text-center">
            <button
              className="text-yellow-400 text-sm hover:underline focus:outline-none"
              onClick={() => navigate("/")}
            >
              Go back to Home
            </button>
          </div>
        </section>
      </div>

      {/* Toast container para mostrar las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default Login;
