# Actividad: Identificar 3 proyectos donde Firebase sería útil

### 1\. App eBook Reader (Sincronización Multi-dispositivo)

  * **Descripción:** Capacidad de Firebase de sincronizar datos entre web y móvil en tiempo real.

  * **El problema:** Guardar archivos pesados (libros/audio) y que si leo hasta la página 50 en el móvil, aparezca en la página 50 en el ordenador.
  * **Tecnologías Firebase a usar:**
      * **Firebase Authentication:** Para el login unificado en web y móvil.
      * **Cloud Storage:** Aquí es donde **realmente** se guardan los archivos PDF y MP3 (blob storage).
      * **Cloud Firestore:** Base de datos NoSQL para guardar los metadatos del libro (título, autor) y, lo más importante, el **progreso de lectura** del usuario en tiempo real.
      * **Firebase Hosting:** Para desplegar la versión web de la aplicación.
      * **Remote config:** Personalizar themes y experiencias para los diferentes usuarios.

### 2\. App Booking (Gestión de Estado en Tiempo Real)

  * **Descripción:** Manejo de concurrencia (que no se vendan más plazas de las que hay).

  * **El problema:** El aforo es limitado. Si quedan 1 plaza y 2 personas pulsan "reservar" a la vez, el sistema no debe fallar.
  * **Tecnologías Firebase a usar:**
      * **Cloud Firestore:** Usando **Transacciones**. Esto es clave en backend. Una transacción asegura que el contador de aforo solo baje si realmente hay sitio.
      * **Cloud Functions:** Lógica de backend que se ejecuta cuando alguien reserva (por ejemplo, verificar si el usuario tiene la cuota pagada antes de confirmar).
      * **Firebase Cloud Messaging:** Para enviar notificaciones push ("Tu clase empieza en 1 hora").

### 3\. App Panadería (Geolocalización y Lógica de Negocio)

  * **Descripción:** Autenticación via SMS y pagos.

  * **El problema:** Rutas dinámicas, pagos y gestión de usuarios recurrentes.
  * **Tecnologías Firebase a usar:**
      * **Firebase Authentication:** Login con número de teléfono (muy útil para gente mayor o zonas rurales).
      * **Cloud Functions:** Aquí conectarías con la API de Google Maps para calcular rutas y con la API de Bizum/Stripe para verificar los pagos (webhooks). **Nota:** Como backend, todo lo que sea pagos o secretos, se maneja en el servidor (Functions), nunca en el frontend.
      * **Firestore:** Guardar los pedidos y las coordenadas (GeoPoint) de las casas.

