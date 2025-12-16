#!/bin/bash

# Nombre del repositorio (carpeta raíz)
REPO_NAME="formacion-backend-firebase"

echo "🚀 Iniciando configuración del repositorio: $REPO_NAME..."

# 1. Crear carpeta principal y entrar
mkdir -p $REPO_NAME
cd $REPO_NAME

# 2. Inicializar Git
git init
echo "✅ Git inicializado."

# 3. Crear el .gitignore MAESTRO (Vital para no subir basura)
cat <<EOT >> .gitignore
# Dependencias
node_modules/
dist/
lib/

# Firebase & Entorno
.firebase/
firebase-debug.log
.env
*.local
.DS_Store
EOT
echo "✅ .gitignore creado."


# 5. Loop para crear las carpetas numeradas
# Array con los nombres exactos
carpetas=(
  "01-introduccion-a-firebase"
  "02-configuracion-inicial"
  "03-autenticacion"
  "04-realtime-database"
  "05-firestore"
  "06-storage"
  "07-cloud-functions"
)

for carpeta in "${carpetas[@]}"; do
  mkdir -p "$carpeta"
  # Crear un README vacío dentro de cada una para que git las detecte (git no sube carpetas vacías)
  echo "# $carpeta" > "$carpeta/README.md"
done

echo "✅ Estructura de carpetas creada."
echo "🎉 ¡Todo listo! Entra con: cd $REPO_NAME"