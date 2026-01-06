# Actividad 7: Cloud Functions (HTTP Triggers)

## 📋 Descripción
Implementación de una "Serverless Function" activada por peticiones HTTP. Esta función actúa como una **API REST**: recibe datos por la URL y los escribe de forma segura en la base de datos Firestore, sin exponer las credenciales en el frontend.

Este ejercicio demuestra la capacidad de ejecutar lógica de backend (Node.js) en la infraestructura gestionada de Google.

## 🛠 Stack Tecnológico
* **Firebase Cloud Functions (v1):** Entorno de ejecución estable para backend.
* **HTTP Triggers:** La función responde a solicitudes web estándar (`onRequest`).
* **Firebase Admin SDK:** Para interactuar con Firestore con privilegios de administrador.

## 🚀 Funcionalidades
1.  **Endpoint Público:** URL accesible desde cualquier navegador o cliente HTTP (Postman, fetch).
2.  **Escritura en Base de Datos:** Los parámetros de la URL (`?text=...`) se guardan automáticamente en la colección `messages` de Firestore.
3.  **Respuesta JSON:** La API devuelve el ID del documento creado para confirmación.

## ⚠️ Requisitos
* Proyecto en **Plan Blaze** (Pay as you go).
* Node.js instalado localmente.

## 🔧 Uso
Para probar la función, visitar la URL generada tras el despliegue añadiendo el parámetro `text`:
https://us-central1-panaderia-backend-test.cloudfunctions.net/addMessage?text=ProbandoFunciones