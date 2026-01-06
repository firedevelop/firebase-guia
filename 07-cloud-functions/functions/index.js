// Usamos explícitamente la versión 1 (más estable para pruebas)
const functions = require('firebase-functions/v1');
const admin = require("firebase-admin");

// Inicializamos la app (obligatorio)
admin.initializeApp();

// Función HTTP: Se activa visitando una URL
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // 1. Coge el texto de la URL (?text=Hola)
  const original = req.query.text;

  // 2. Lo guarda en Firestore
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });

  // 3. Responde al navegador
  res.json({ result: `Mensaje guardado con ID: ${writeResult.id}` });
});