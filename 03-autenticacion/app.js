// Importamos la app que configuramos en el paso anterior
import { app } from './firebase-config.js';

// Importamos solo lo que necesitamos de Auth para optimizar (Tree Shaking)
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Inicializamos el servicio de Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Referencias HTML
const viewAuth = document.getElementById('auth-view');
const viewDashboard = document.getElementById('dashboard-view');
const errorMsg = document.getElementById('error-msg');

// --- 1. LÓGICA DE REGISTRO ---
document.getElementById('btn-register').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    errorMsg.textContent = ""; // Limpiar errores previos

    try {
        // Esta función crea el usuario en Firebase y hace login automáticamente
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        console.log("Nuevo socio registrado:", userCredential.user.uid);
    } catch (error) {
        manejarError(error);
    }
});

// --- 2. LÓGICA DE LOGIN (EMAIL) ---
document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    errorMsg.textContent = "";

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        console.log("Login exitoso");
    } catch (error) {
        manejarError(error);
    }
});

// --- 3. LÓGICA DE LOGIN (GOOGLE) ---
document.getElementById('btn-google').addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        manejarError(error);
    }
});

// --- 4. LOGOUT ---
document.getElementById('btn-logout').addEventListener('click', async () => {
    await signOut(auth);
    console.log("Sesión cerrada");
});

// --- 5. OBSERVER DE ESTADO (CRÍTICO) ---
// Esta es la parte más importante para un Backend.
// No gestionamos el estado manualmente, dejamos que Firebase nos avise.
onAuthStateChanged(auth, (user) => {
    if (user) {
        // --- EL USUARIO ESTÁ LOGUEADO ---
        mostrarDashboard(user);
    } else {
        // --- NO HAY USUARIO ---
        mostrarLogin();
    }
});

// Funciones Auxiliares de UI
function mostrarDashboard(user) {
    viewAuth.classList.add('hidden');
    viewDashboard.classList.remove('hidden');

    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-uid').textContent = `ID: ${user.uid}`;
    
    // Si viene de Google, tiene foto. Si no, usamos una por defecto.
    if (user.photoURL) {
        document.getElementById('user-photo').src = user.photoURL;
    }
}

function mostrarLogin() {
    viewDashboard.classList.add('hidden');
    viewAuth.classList.remove('hidden');
    // Limpiamos inputs por seguridad
    document.getElementById('password').value = ""; 
}

function manejarError(error) {
    console.error(error.code);
    let mensaje = "Ocurrió un error inesperado.";
    
    // Mapeo de errores comunes para el usuario final
    switch(error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            mensaje = "Credenciales incorrectas.";
            break;
        case 'auth/email-already-in-use':
            mensaje = "Este correo ya está registrado como socio.";
            break;
        case 'auth/weak-password':
            mensaje = "La contraseña debe tener al menos 6 caracteres.";
            break;
        case 'auth/popup-closed-by-user':
            mensaje = "Se canceló el inicio de sesión con Google.";
            break;
    }
    errorMsg.textContent = mensaje;
}