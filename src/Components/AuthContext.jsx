import React, { createContext, useContext, useState } from 'react';

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Guardamos la info del usuario (UID, email, etc.)
  const [notes, setNotes] = useState([]);  // Guardamos las notas

  // Función para login y registro (dummy por ahora)
  const login = (userInfo) => setUser(userInfo);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, notes, setNotes }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
