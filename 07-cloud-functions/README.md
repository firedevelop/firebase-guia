# Actividad 7: Cloud Functions (Triggers de Autenticación)

## 📋 Descripción
Implementación de una función "Serverless" que reacciona automáticamente a eventos del sistema. En este caso, escuchamos el evento de **Creación de Usuario** en Firebase Authentication.

Este patrón permite ejecutar lógica de backend (como enviar emails, crear perfiles en base de datos o analizar fraudes) sin que el frontend tenga que hacer nada.

## 🛠 Stack Tecnológico
* **Firebase Cloud Functions v2:** Entorno de ejecución Node.js.
* **Identity Triggers:** Evento `onUserCreated`.
* **Firebase Logger:** Sistema de logs en la nube.

## 🚀 Funcionalidades
* **Listener Automático:** La función no requiere ser llamada manualmente; "despierta" cuando alguien se registra.
* **Seguridad:** El código se ejecuta en entorno seguro de Google, no en el navegador del usuario.
* **Simulación de Email:** Registro estructurado de la intención de envío de correo (preparado para integración con SendGrid/Nodemailer).

## ⚠️ Requisitos
* Proyecto en **Plan Blaze** (Pay as you go) de Firebase.
* Node.js instalado localmente.


## 🔧 Despliegue
```bash
firebase deploy --only functions