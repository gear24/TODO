import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const { user, notes, getNotes, deleteNote, logout, setNotes } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     const userEmail = user.email; // Accede al email del usuario
  //     getNotes(userEmail); // Llama a getNotes con el email
  //   } else {
  //     setNotes([]); // Limpiar las notas si no hay usuario
  //   }
  // }, [getNotes, user, setNotes]); // setNotes empezo a dar problemas desde la desconeccion de firebase
  
  //opcion secundaria para que funcione bien con lo de un usuario
  useEffect(() => {
    const fakeUser = { email: "fakeuser@test.com" }; // Simula un usuario temporal para pruebas
    if (user || fakeUser) {
      const userEmail = (user || fakeUser).email;
      getNotes(userEmail);
    } else if (notes.length > 0) {
      setNotes([]);
    }
  }, [user, getNotes,setNotes]);
  

  const handleEdit = (note) => {
    navigate('/form', { state: { note } });
  };

  const handleAddNote = () => {
    navigate('/form');
  };

  return (
    <div className='responsive'>
      <h2>Lista de Notas</h2>
      <button onClick={handleAddNote}>Agregar Nueva Nota</button>
      <button onClick={logout}>Cerrar sesión</button>
      <div className="grid small-space">
        <div className="s10">
          {notes.length === 0 ? (
            <p>No tienes notas aun</p>
          ) : (
            notes.map((note) => (
              <article className="border round" key={note.id}>
                {/* <h5>Title</h5> */}
                <p>{note.nota}</p>
                <nav>
                  <button onClick={() => handleEdit(note)}><i>edit</i></button>
                  <button onClick={() => deleteNote(note.id)}><i>delete</i></button>
                  <p>Estado : {note.completa ? '✅' : '❌'}</p>
                  <p>Importancia: {note.prioridad}</p>
                </nav>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
