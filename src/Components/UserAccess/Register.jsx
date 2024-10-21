import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext'; // Asegúrate de que este import esté disponible

export const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { onSubmitRegisterForm } = useAuth(); // Obtén la función de registro del contexto

    const onSubmitForm = (data) => {
        console.log(data);
        onSubmitRegisterForm(data); // Llama a la función del contexto para registrar
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                {/* <label>Nombre</label>
                <input type="text" {...register('name', { required: true })} placeholder="Primer nombre" />
                {errors.name && <p>Nombre es requerido</p>}
                
                <label>Apellido</label>
                <input type="text" {...register('lastname', { required: true })} placeholder="Primer apellido" />
                {errors.lastname && <p>Apellido es requerido</p>} */}
                
                <label>Email</label>
                <input type="email" {...register('email', { required: true })} placeholder="example@mail.com" />
                {errors.email && <p>Email es requerido</p>}
                
                <label>Contraseña</label>
                <input type="password" {...register('password', { required: true })} placeholder="Ingrese su contraseña" />
                {errors.password && <p>Contraseña es requerida</p>}
                
                <label>Confirmar Contraseña</label>
                <input type="password" {...register('password2', { required: true })} placeholder="Confirme su contraseña" />
                {errors.password2 && <p>Confirmación de contraseña es requerida</p>}
                
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};
