// CAMBIO IMPORTANTE: Usamos la URL completa para que funcione sin instalar nada extra
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  
  apiKey: "AIzaSyBIKv5CHHzVHTjVp_se7B5sRzahOdcoZPQ",
  authDomain: "panaderia-backend-test.firebaseapp.com",
  projectId: "panaderia-backend-test",
  storageBucket: "panaderia-backend-test.firebasestorage.app",
  messagingSenderId: "754449293562",
  appId: "1:754449293562:web:c43eb5a5b36c6c32696943"
};

// Inicializamos la app
const app = initializeApp(firebaseConfig);

// Exportamos para usar en el HTML
export { app };