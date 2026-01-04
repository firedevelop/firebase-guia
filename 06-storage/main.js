// 1. Importaciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 2. Tu configuración (Cópiala de la consola de Firebase)
const firebaseConfig = {
  
  apiKey: "AIzaSyBIKv5CHHzVHTjVp_se7B5sRzahOdcoZPQ",
  authDomain: "panaderia-backend-test.firebaseapp.com",
  projectId: "panaderia-backend-test",
  storageBucket: "panaderia-backend-test.firebasestorage.app",
  messagingSenderId: "754449293562",
  appId: "1:754449293562:web:c43eb5a5b36c6c32696943"
};

// 3. Inicializar Firebase y Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Referencias al DOM
const input = document.getElementById('imageInput');
const btn = document.getElementById('uploadBtn');
const gallery = document.getElementById('galleryContainer');

// 4. Función para subir la imagen
btn.addEventListener('click', () => {
    const file = input.files[0];

    if (!file) {
        alert("Por favor selecciona un archivo primero");
        return;
    }

    // A. CREAR REFERENCIA
    // Creamos una referencia a 'imagenes/nombre_archivo.jpg'
    const storageRef = ref(storage, 'imagenes/' + file.name);

    // B. METADATOS 
    // Documentación: https://firebase.google.com/docs/storage/web/file-metadata
    const metadata = {
        contentType: file.type, // Ej: 'image/jpeg'
        customMetadata: {
            'subidoPor': 'Actividad 6'
        }
    };

    // C. SUBIR EL ARCHIVO
    // Documentación: https://firebase.google.com/docs/storage/web/upload-files
    uploadBytes(storageRef, file, metadata)
        .then((snapshot) => {
            console.log('Archivo subido exitosamente!', snapshot);
            
            // D. OBTENER URL Y VISUALIZAR
            // Documentación: https://firebase.google.com/docs/storage/web/download-files
            return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
            console.log('Archivo disponible en:', downloadURL);
            mostrarImagenEnGaleria(downloadURL);
        })
        .catch((error) => {
            console.error('Error al subir:', error);
            alert('Hubo un error al subir la imagen');
        });
});

// Función auxiliar para pintar en el DOM
function mostrarImagenEnGaleria(url) {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = "200px";
    img.style.border = "2px solid #333";
    img.style.borderRadius = "8px";
    
    gallery.appendChild(img);
}