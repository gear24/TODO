import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext'; 
import { useLocation } from 'react-router-dom';

const TodoForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user, addNote, updateNote, goBack } = useAuth();
  const location = useLocation();
  const noteToEdit = location.state?.note; // pa la nota a editar si existe

  // set valores si estan under edition
  useEffect(() => {
    if (noteToEdit) {
      setValue('nota', noteToEdit.nota);
      setValue('prioridad', noteToEdit.prioridad);
      setValue('completa', noteToEdit.completa);
    }
  }, [noteToEdit, setValue]);

  const onSubmit = (data) => {
    const currentDate = new Date(); 
    const noteData = {
      ...data,
      email: user.email, 
      fechaActu: currentDate,
      fechaCreacion: noteToEdit ? noteToEdit.fechaCreacion : currentDate, // Mantener la fecha de creación si se está editando
      id: noteToEdit ? noteToEdit.id : undefined // Añadir el ID solo si está editando
    };

    if (noteToEdit) {
      updateNote(noteData); // Llama a la función de actualización
    } else {
      //addNote({ ...noteData, completa: false }); 
      addNote({ ...noteData, email: user.email }); 

    }
    reset(); // Reiniciar el formulario
  };


  return (

    <main className='responsive'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{noteToEdit ? 'Edite su nota ' : 'Agregue una nota'}</h1>

      <fieldset>
        <legend>Completa todos los campos</legend>
        <div className="field border label textarea">
          <textarea {...register('nota', { required: true })}></textarea>

          <label>Ingrese su nota</label>
        </div>
        <div className="field border label">
          <select {...register('prioridad', { required: true })}>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <label>Prioridad</label>
        </div>
        <label className="checkbox">
          <input type="checkbox" {...register('completa')} />
          <span>Completada</span>
        </label>
        <div className="middle-align center-align">
          <button className="responsive" type="submit">{noteToEdit ? <>Actualizar Nota <i>update</i></> :
            <> Agregar Nota <i>save</i></>}</button>
        </div>
      </fieldset>
      <div className="large-space"></div>
      <button onClick={() => {goBack('todos')}}><i>arrow_back</i> Ir atras</button>
      </form>
</main>










  );
};

export default TodoForm;