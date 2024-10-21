import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { onSubmitLoginForm } = useAuth();

  const onSubmit = (data) => {
    onSubmitLoginForm(data); // Llama a la función del contexto
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <p>Email es requerido</p>}

      <input {...register("password", { required: true })} type="password" placeholder="Contraseña" />
      {errors.password && <p>Contraseña es requerida</p>}

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
