import { db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Referencias al HTML
const input = document.getElementById('task-input');
const select = document.getElementById('category-select');
const btnAdd = document.getElementById('btn-add');
const list = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Referencia a la "Tabla" (Colección) en Firestore
const tareasRef = collection(db, "tareas");

// ----------------------------------------------------
// 1. FUNCIÓN PARA CREAR TAREA (addDoc)
// ----------------------------------------------------
async function crearTarea() {
    const texto = input.value;
    const categoria = select.value;

    if (texto === '') return;

    try {
        // Añadimos un documento a la colección "tareas"
        // Firestore genera el ID automáticamente
        await addDoc(tareasRef, {
            titulo: texto,
            categoria: categoria,
            fecha: serverTimestamp() // Marca de tiempo del servidor
        });
        
        input.value = ''; // Limpiar input
    } catch (error) {
        console.error("Error al crear:", error);
    }
}

// ----------------------------------------------------
// 2. SISTEMA DE FILTRADO Y LECTURA (query + onSnapshot)
// ----------------------------------------------------
let unsubscribe; // Variable para guardar el "escuchador" y poder apagarlo

function activarEscucha(filtro) {
    // Si ya hay un escuchador activo, lo apagamos para no tener duplicados
    if (unsubscribe) {
        unsubscribe();
    }

    let q;

    // A. Construimos la QUERY (La Pregunta)
    if (filtro === "todos") {
        // Dame todas, ordenadas por fecha
        q = query(tareasRef, orderBy("fecha", "desc"));
    } else {
        // Dame SOLO las que coincidan con la categoría (WHERE)
        q = query(tareasRef, where("categoria", "==", filtro), orderBy("fecha", "desc"));
    }

    // B. Activamos el listener con esa Query específica
    unsubscribe = onSnapshot(q, (snapshot) => {
        list.innerHTML = ""; // Limpiamos la lista visual

        snapshot.forEach((doc) => {
            const tarea = doc.data(); // Los datos (titulo, categoria...)
            const id = doc.id;        // El ID del documento (ej. 8s7d6f8sd)

            // Pintamos el HTML
            const colorClase = tarea.categoria === 'Trabajo' ? 'bg-trabajo' : 'bg-personal';
            
            list.innerHTML += `
                <li>
                    <span>
                        <span class="badge ${colorClase}">${tarea.categoria}</span>
                        ${tarea.titulo}
                    </span>
                    <span class="btn-delete" id="${id}">🗑️</span>
                </li>
            `;
        });

        // Re-asignamos los eventos de borrar a los nuevos botones
        activarBotonesBorrar();
    });
}

// ----------------------------------------------------
// 3. BORRAR TAREA (deleteDoc)
// ----------------------------------------------------
function activarBotonesBorrar() {
    const botones = document.querySelectorAll('.btn-delete');
    botones.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.id;
            // Para borrar, necesitamos la referencia EXACTA al documento: db/tareas/ID
            await deleteDoc(doc(db, "tareas", id));
        });
    });
}

// ----------------------------------------------------
// 4. EVENTOS DE INTERFAZ
// ----------------------------------------------------
btnAdd.addEventListener('click', crearTarea);

// Lógica de los botones de filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 1. Quitar clase active a todos
        filterBtns.forEach(b => b.classList.remove('active'));
        // 2. Poner active al pulsado
        e.target.classList.add('active');
        
        // 3. Recargar datos con el nuevo filtro
        const filtroSeleccionado = e.target.getAttribute('data-filter');
        activarEscucha(filtroSeleccionado);
    });
});

// Iniciamos cargando todo
activarEscucha("todos");