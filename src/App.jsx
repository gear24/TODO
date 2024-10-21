import React from 'react';

import { AuthProvider } from './Components/AuthContext'; //contexto
// import TodoForm from './components/TodoForm'; 
// import TodoList from './components/TodoList'; 

const App = () => {
  return (
    <AuthProvider>
      <div>
        <TodoForm />  {/* Manejo de autenticación */}
        <TodoList />  {/* Mostrar notas o mensaje si no hay */}
      </div>
    </AuthProvider>
  );
};

export default App;
