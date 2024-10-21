import React, { useState } from 'react';
import { useAuth } from '../AuthContext';  // Importamos nuestro contexto

const TodoForm = () => {
  const { user, login, logout } = useAuth();  // Accedemos al contexto global
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular autenticación (aquí vendría tu lógica con Firebase Auth)
    const userInfo = { uid: '123', email }; // Dummy user
    login(userInfo);  // Guardamos al usuario en el contexto
  };

  return (
    <div>
      {!user ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Bienvenido, {user.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
