const { onUserCreated } = require("firebase-functions/v2/identity");
const { logger } = require("firebase-functions");

// Esta función se dispara AUTOMÁTICAMENTE cuando un usuario se registra en Firebase Auth
exports.enviarEmailBienvenida = onUserCreated((event) => {
  // 1. Obtenemos los datos del usuario recién creado
  const usuario = event.data;
  const email = usuario.email;
  const uid = usuario.uid;

  // 2. Aquí iría la lógica de envío real (SendGrid, Nodemailer, etc.)
  // Como no tenemos servidor de correo configurado, simulamos el envío en los logs.
  
  logger.info(`✨ NUEVO USUARIO DETECTADO: ${email}`);
  logger.info(`📧 Enviando email de bienvenida a ${email}...`);
  logger.info(`✅ Email enviado correctamente al usuario ${uid}`);

  // En un caso real, aquí usaríamos:
  // await transporter.sendMail({ from: "admin@gym.com", to: email, subject: "¡Hola!"... })
});