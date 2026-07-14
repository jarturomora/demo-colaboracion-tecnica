'use strict';

const nodemailer = require('nodemailer');

/**
 * Crea y devuelve un transportador de correo configurado según el entorno.
 * @returns {object} Transportador de Nodemailer
 */
function crearTransportador() {
  if (process.env.NODE_ENV === 'test') {
    // En pruebas, usamos un transportador que no envía correos reales
    return nodemailer.createTransport({ jsonTransport: true });
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Envía el correo de contacto al administrador del sitio.
 * @param {object} datos - Datos del formulario de contacto
 * @param {string} datos.nombre - Nombre del remitente
 * @param {string} datos.correo - Correo del remitente
 * @param {string} datos.asunto - Asunto del mensaje
 * @param {string} datos.mensaje - Cuerpo del mensaje
 * @returns {Promise<object>} Resultado del envío
 */
async function enviarCorreoContacto({ nombre, correo, asunto, mensaje }) {
  const transporter = crearTransportador();
  const siteName = process.env.SITE_NAME || 'Formulario de Contacto';

  const opcionesCorreo = {
    from: `"${siteName}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: `"${nombre}" <${correo}>`,
    subject: `[Contacto] ${asunto}`,
    text: generarTextoPlano({ nombre, correo, asunto, mensaje }),
    html: generarPlantillaHTML({ nombre, correo, asunto, mensaje }),
  };

  return transporter.sendMail(opcionesCorreo);
}

/**
 * Genera el cuerpo del correo en texto plano.
 */
function generarTextoPlano({ nombre, correo, asunto, mensaje }) {
  return `
Nuevo mensaje de contacto recibido
====================================

Nombre:  ${nombre}
Correo:  ${correo}
Asunto:  ${asunto}

Mensaje:
--------
${mensaje}

------------------------------------
Este mensaje fue enviado desde el formulario de contacto del sitio web.
  `.trim();
}

/**
 * Genera la plantilla HTML del correo de contacto.
 */
function generarPlantillaHTML({ nombre, correo, asunto, mensaje }) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo mensaje de contacto</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .contenedor { background: #ffffff; max-width: 600px; margin: 0 auto;
                  border-radius: 8px; overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .encabezado { background: #2563eb; color: #ffffff; padding: 24px 32px; }
    .encabezado h1 { margin: 0; font-size: 20px; }
    .cuerpo { padding: 32px; }
    .campo { margin-bottom: 16px; }
    .etiqueta { font-weight: bold; color: #374151; font-size: 13px;
                text-transform: uppercase; letter-spacing: 0.05em; }
    .valor { margin-top: 4px; color: #1f2937; font-size: 15px; }
    .mensaje-texto { background: #f9fafb; border-left: 4px solid #2563eb;
                     padding: 16px; border-radius: 4px; white-space: pre-wrap; }
    .pie { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="contenedor">
    <div class="encabezado">
      <h1>📧 Nuevo mensaje de contacto</h1>
    </div>
    <div class="cuerpo">
      <div class="campo">
        <div class="etiqueta">Nombre</div>
        <div class="valor">${nombre}</div>
      </div>
      <div class="campo">
        <div class="etiqueta">Correo electrónico</div>
        <div class="valor">${correo}</div>
      </div>
      <div class="campo">
        <div class="etiqueta">Asunto</div>
        <div class="valor">${asunto}</div>
      </div>
      <div class="campo">
        <div class="etiqueta">Mensaje</div>
        <div class="mensaje-texto">${mensaje}</div>
      </div>
    </div>
    <div class="pie">
      Este mensaje fue enviado desde el formulario de contacto del sitio web.
    </div>
  </div>
</body>
</html>
  `.trim();
}

module.exports = { enviarCorreoContacto, generarTextoPlano, generarPlantillaHTML };
