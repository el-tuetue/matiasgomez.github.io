// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKgO43M_emm-nOTAyz7POoqLsKMF2GwVM",
    authDomain: "plants-vs-zombies-3e21f.firebaseapp.com",
    projectId: "plants-vs-zombies-3e21f",
    storageBucket: "plants-vs-zombies-3e21f.appspot.com",
    messagingSenderId: "497857449451",
    appId: "1:497857449451:web:8e84a77137c96239905dae"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es una función que retorna la base de datos para su utilización
const db = getFirestore(app);
//export permite exportar solo las funciones que desean utilizar
//función para guardar los datos en la db
export const save = (plantas) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que recibe la base de datos y el nombre de la colección
    addDoc(collection(db, 'plantas'), plantas)
}

//función para traer los documentos de la colección 
export const getAll = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'plantas'), data)
}
//función para eliminar el documento seleccionado
export const remove = (id) => {
    //deleteDoc es una función de firestore que permite la eliminación de un documento
    //doc es una función firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'plantas', id))
}

//función para seleccionar un elemento 
//getDoc es una función de firestore que permite retornar un documento
export const selectOne = (id) => getDoc(doc(db, 'plantas', id))

//función para editar un registro
export const edit = (id, plantas) => {
    //función de firestore que permite actualizar el documento seleccionado 
    updateDoc(doc(db, 'plantas', id), plantas)
}