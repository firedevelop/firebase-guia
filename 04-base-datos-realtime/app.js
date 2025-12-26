import { app } from './firebase-config.js';
import { 
    getDatabase, 
    ref, 
    set, 
    onValue, 
    get 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 1. Inicializar la Base de Datos
const db = getDatabase(app);

// 2. Crear una REFERENCIA (Como una ruta de carpetas en tu PC)
// Vamos a guardar el número en la ruta: /gimnasio/aforo_actual
const aforoRef = ref(db, 'gimnasio/aforo_actual');

// Elementos del DOM
const counterElement = document.getElementById('counter');
const btnInc = document.getElementById('btn-inc');
const btnDec = document.getElementById('btn-dec');

// --- LECTURA EN TIEMPO REAL (La magia) ---
// onValue se dispara AUTOMÁTICAMENTE cada vez que el dato cambia en la nube.
// No importa quién lo cambie (tú, tu jefe, o un usuario en China).
onValue(aforoRef, (snapshot) => {
    const data = snapshot.val();
    
    // Si data es null (base de datos vacía), asumimos 0
    const currentAforo = data || 0;
    
    // Actualizamos el HTML
    counterElement.textContent = currentAforo;
    
    // Efecto visual de color
    if (currentAforo >= 20) counterElement.style.color = '#c0392b'; // Rojo (lleno)
    else counterElement.style.color = '#2c3e50'; // Normal
});


// --- ESCRITURA DE DATOS ---
// Función para modificar el aforo
async function actualizarAforo(cambio) {
    // 1. Leemos el valor actual una sola vez (get)
    const snapshot = await get(aforoRef);
    const actual = snapshot.val() || 0;
    
    const nuevoValor = actual + cambio;
    
    // Evitar números negativos
    if (nuevoValor < 0) return;

    // 2. Guardamos el nuevo valor (set)
    set(aforoRef, nuevoValor)
        .then(() => console.log("Aforo actualizado"))
        .catch((err) => console.error("Error:", err));
}

// Event Listeners
btnInc.addEventListener('click', () => actualizarAforo(1));
btnDec.addEventListener('click', () => actualizarAforo(-1));