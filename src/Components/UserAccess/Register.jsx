import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { onSubmitRegisterForm, goToLogin,goToTodos } = useAuth(); 

    const onSubmitForm = (data) => {
        console.log(data); // Solo para debugging, muestra los datos ingresados
        onSubmitRegisterForm(data); // Llama a la función de registro con los datos del formulario
    };

    return (
    <>
    <nav className="bottom">
      {/* Link para volver al formulario de login */}
      <a href="#" onClick={(e) => { e.preventDefault(); goToLogin(); }}>
        <i>login</i>
        <div>Ingresa</div>
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); goToTodos(); }}>
        <i>list</i>
        <div>Ver Todos</div>
      </a>
    </nav>

    <main className="responsive">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="small-space"></div>
        <h1>Creacion de cuenta</h1>
        <fieldset>
          {/* Campos adicionales para nombre y apellido (comentados por ahora) */}
          {/* 
          <label>Nombre</label>
          <input type="text" {...register('name', { required: true })} placeholder="Primer nombre" />
          {errors.name && <p>Nombre es requerido</p>}
          
          <label>Apellido</label>
          <input type="text" {...register('lastname', { required: true })} placeholder="Primer apellido" />
          {errors.lastname && <p>Apellido es requerido</p>} 
          */}

          <legend>Ingresa tus credenciales</legend>
          
          
          <div className="field border label">
            <input type="email" {...register('email', { required: true })} />
            {errors.email && <p>Email es requerido</p>}
            <label>Digite su correo electronico</label>
          </div>

          
          <div className="field border label">
            <input type="password" {...register('password', { required: true })} />
            {errors.password && <p>Contraseña es requerida</p>}
            <label>Contrasena</label>
          </div>

          
          <div className="field border label">
            <input type="password" {...register('password2', { required: true })} />
            {errors.password2 && <p>Confirmación de contraseña es requerida</p>}
            <label>Confirme su contrasena</label> 
          </div>

          <div className="middle-align center-align">
            
            <button type="submit" className="responsive">Crear cuenta<i>create</i></button>
          </div>
        </fieldset>
      </form>
    </main>
    </>
    );
};

export default Register;
