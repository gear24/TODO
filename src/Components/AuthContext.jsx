import React, { createContext, useContext, useState } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config'; // Asegúrate de tener la ruta correcta

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guardamos la info del usuario
  const navigate = useNavigate(); // Usar hook para navegación

  // Función de logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error durante el cierre de sesión: ", error);
      });
  };

  // Función para iniciar sesión
  const onSubmitLoginForm = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password) // Usar solo email y password para login
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        alert("Inicio de sesión con éxito");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión: ", error);
      });
  };

  // Función para registro
  const onSubmitRegisterForm = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password) // Usar solo email y password para registro
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user); // Guarda el usuario logueado si quieres
        alert("Registro exitoso");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al registrarse: ", error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, logout, onSubmitLoginForm, onSubmitRegisterForm }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
