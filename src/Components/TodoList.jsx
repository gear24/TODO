import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import TodoItem from './TodoItem';  // Importa el componente para mostrar las notas

const TodoList = () => {
  const { user, notes, setNotes } = useAuth();

  useEffect(() => {
    if (user) {
      // Aquí se haría la lógica para obtener las notas del usuario con Firebase
      // Simulamos obtener algunas notas desde el backend
      const fetchedNotes = [
        { id: 1, content: 'Comprar leche' },
        { id: 2, content: 'Terminar proyecto' }
      ];
      setNotes(fetchedNotes); // Guardar las notas en el contexto
    }
  }, [user, setNotes]);

  return (
    <div>
      {user ? (
        notes.length > 0 ? (
          notes.map(note => <TodoItem key={note.id} note={note} />)
        ) : (
          <p>No tienes notas aún.</p>
        )
      ) : (
        <p>Por favor inicia sesión para ver tus notas.</p>
      )}
    </div>
  );
};

export default TodoList;
