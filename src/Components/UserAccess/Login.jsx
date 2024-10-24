import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext';
import "beercss";
import "material-dynamic-colors";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const { onSubmitLoginForm, goToRegister, goToTodos } = useAuth(); 

  const onSubmit = (data) => {
    onSubmitLoginForm(data); // pa a la función de inicio de sesión
  };

  return (
    <>
    <nav className="bottom">    
      {/* Link para redirigir al formulario de registro */}
      <a href="#" onClick={(e) => { e.preventDefault(); goToRegister(); }}>
        <i>person</i>
        <div>Crea tu cuenta</div>
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); goToTodos(); }}>
        <i>list</i>
        <div>Ver Todos</div>
      </a>
    </nav>

    <main className="responsive">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="small-space"></div>
        <h1>Inicio de sesion</h1>
        <fieldset>
          <legend>Ingresa tus credenciales</legend>
          
          
          <div className="field border label">
            <input {...register("email", { required: true })} />
            {errors.email && <p>Email es requerido</p>} 
            <label>Correo electronico</label>
          </div>

          
          <div className="field border label">
            <input {...register("password", { required: true })} type="password" />
            {errors.password && <p>Contraseña es requerida</p>} 
            <label>Contrasena</label>
          </div>

          
          <div className="middle-align center-align">
            <button type="submit" className="responsive">Ingresar <i>login</i></button>
          </div>
        </fieldset>
      </form>
    </main>
    </>
  );
};

export default Login;
