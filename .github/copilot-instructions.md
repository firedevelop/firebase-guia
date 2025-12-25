# Firebase Study Guide - AI Assistant Instructions

## Project Overview
This is a Spanish-language Firebase learning guide structured as numbered exercises. Each exercise builds on Firebase services for a "Panadería Rural" (rural bakery) application. Only exercises 01 (introduction) and 02 (initial setup) are currently implemented.

## Architecture Patterns
- **Modular Firebase SDK**: Use Firebase Web SDK v10+ with CDN imports and ES modules
- **Configuration**: Separate `firebase-config.js` with `initializeApp()` and exported `app` instance
- **HTML Structure**: Simple SPA with inline CSS, ES module scripts, and real-time status updates
- **Language**: Spanish for user-facing content, English for code comments and technical docs

## Implementation Guidelines
- **Folder Structure**: Implement each exercise in its numbered folder (03-autenticacion, 04-realtime-database, etc.)
- **README Updates**: Document implementation details, Firebase services used, and execution instructions
- **Code Style**: Follow patterns from `02-configuracion-inicial/` - clean, educational code with console logging
- **Firebase Imports**: Use CDN URLs like `https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js`
- **UI Pattern**: Card-based layout with status indicators (green/red semaphores)

## Key Files to Reference
- `02-configuracion-inicial/firebase-config.js`: Firebase initialization and export pattern
- `02-configuracion-inicial/index.html`: HTML structure, styling, and module import example
- `01-introduccion-a-firebase/README.md`: Example of detailed exercise documentation

## Development Workflow
- **Local Testing**: Use VS Code Live Server extension to serve static files
- **Firebase Console**: Access via https://console.firebase.google.com/ (project: panaderia-backend-test)
- **No Build Tools**: Pure client-side JavaScript, no bundlers or package managers required

## Exercise Progression
1. ✅ Introducción (theory)
2. ✅ Configuración Inicial (connection validation)
3. 🔄 Autenticación (Firebase Auth - SMS/phone login)
4. 🔄 Realtime Database (real-time data sync)
5. 🔄 Firestore (NoSQL database with transactions)
6. 🔄 Storage (file uploads for bakery products)
7. 🔄 Cloud Functions (server-side logic for payments/routes)

When implementing pending exercises, maintain consistency with established patterns and document Firebase service integrations thoroughly.