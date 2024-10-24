import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext'; 
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import Login from './Components/UserAccess/Login';
import Register from './Components/UserAccess/Register';
import { useAuth } from './Components/AuthContext';

// mini compnente para navegacion solo si esta logueado
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Usa el contexto de autenticación para verificar el usuario
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router> 
      <AuthProvider>
        <Routes>
          {/* Ruta para el login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para el registro */}
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas protegidas no aptas para libre navegacion, pero ahorita no jalan */}
          <Route
            path="/todos"
            element={
              // <PrivateRoute>
                <TodoList />
              /* </PrivateRoute> */
            }
          />

          <Route
            path="/form"
            element={
              // <PrivateRoute>
                <TodoForm />
              /* </PrivateRoute> */
            }
          />


          {/* Redirecciona cualquier ruta no definida al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
// Se comento la parte de <PrivateRoute> debido a los errores dados en firebase
// esperando la v2 para descomentarlos