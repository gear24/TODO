import React, { createContext, useContext, useState } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config'; 
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // pa guardar la info del usuario
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate = useNavigate(); // lo de navegacion
  const [notes, setNotes] = useState([]); // inicializar notas aquí

  // Función de logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setNotes([]); // Limpiar notas al cerrar sesión
        navigate("/"); // Redirigir a la página principal
      })
      .catch((error) => {
        console.error("Error durante el cierre de sesión: ", error);
      });
  };

  // Función para iniciar sesión
  const onSubmitLoginForm = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      setUser(user); // Guardamos el usuario en el estado
      alert("Inicio de sesión con éxito");
      
      // Llamar a getNotes después de iniciar sesión
      await getNotes(user.email); // Cargar las notas del nuevo usuario
      navigate("/todos"); // Redirige a Todos
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales."); 
    }
  };

  // Funciones para navegar a diferentes rutas
  const goToTodoForm = () => navigate("/form");
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");
  const goBack = (route) => navigate(`/${route}`);
  const goToTodos = () => {navigate('/todos')}

  // Función para registro
  const onSubmitRegisterForm = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      setUser(user); // Guarda el usuario logueado
      alert("Registro exitoso");
      navigate("/todos"); // Redirige a Todos
    } catch (error) {
      console.error("Error al registrarse: ", error);
      setErrorMessage("Error al registrarse. Verifica los datos."); 
    }
  };

  // Función para obtener notas
  const getNotes = async (userEmail) => {
    const notesCollection = await getDocs(collection(db, "notes"));
    const userNotes = notesCollection.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((note) => note.email === userEmail); // Filtramos por email
    setNotes(userNotes); // Actualiza el estado de notas
  };
  
  // Función para agregar una nueva nota
  const addNote = async (data) => {
    const { nota, prioridad } = data;
    if (nota && prioridad) {
      const response = await addDoc(collection(db, "notes"), {
        nota,
        prioridad,
        completa: false,
        fechaCreacion: new Date(),
        fechaActu: new Date(),
        email: user.email // Guardar el email del usuario también
      });
      // Actualizar el estado local de notas
      setNotes((prevNotes) => [...prevNotes, { ...data, id: response.id }]);
      navigate("/todos"); // Redirige a Todos después de agregar
    } else {
      console.error("Faltan datos para agregar la nota:", data);
    }
  };

  // Función para actualizar una nota
  const updateNote = async (data) => {
    const docRef = doc(db, 'notes', data.id);
    await updateDoc(docRef, {
      nota: data.nota,
      prioridad: data.prioridad,
      completa: data.completa,
      fechaActu: new Date(), // Actualiza la fecha de última modificación
    });
    navigate("/todos"); // Redirige a Todos después de actualizar
  };

  // Función para eliminar una nota
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Actualiza el estado de notas
  };

  return (
    <AuthContext.Provider value={{ 
      user,logout, onSubmitLoginForm, onSubmitRegisterForm, errorMessage,notes, setNotes, goToTodoForm, goBack, 
      getNotes, addNote, updateNote, deleteNote, goToLogin, goToRegister , goToTodos
    }}>        
      {children}
    </AuthContext.Provider>
  );
};

// Contexto? aca ta
export const useAuth = () => useContext(AuthContext);
