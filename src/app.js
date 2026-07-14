'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { body, validationResult } = require('express-validator');
const emailService = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Seguridad: cabeceras HTTP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
  })
);

// Límite de peticiones para prevenir abuso
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: {
    success: false,
    mensaje: 'Demasiadas solicitudes. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/gracias', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/gracias.html'));
});

// Validadores del formulario de contacto
const validadoresContacto = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido.')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.')
    .escape(),

  body('correo')
    .trim()
    .notEmpty()
    .withMessage('El correo electrónico es requerido.')
    .isEmail()
    .withMessage('Por favor, ingresa un correo electrónico válido.')
    .normalizeEmail(),

  body('asunto')
    .trim()
    .notEmpty()
    .withMessage('El asunto es requerido.')
    .isLength({ min: 5, max: 200 })
    .withMessage('El asunto debe tener entre 5 y 200 caracteres.')
    .escape(),

  body('mensaje')
    .trim()
    .notEmpty()
    .withMessage('El mensaje es requerido.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('El mensaje debe tener entre 10 y 2000 caracteres.')
    .escape(),
];

// Endpoint de envío del formulario de contacto
app.post('/api/contacto', limiter, validadoresContacto, async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      success: false,
      errores: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
    });
  }

  const { nombre, correo, asunto, mensaje } = req.body;

  try {
    await emailService.enviarCorreoContacto({ nombre, correo, asunto, mensaje });

    return res.status(200).json({
      success: true,
      mensaje: '¡Tu mensaje ha sido enviado correctamente! Te responderemos pronto.',
    });
  } catch (error) {
    console.error('Error al enviar correo:', error.message);
    return res.status(500).json({
      success: false,
      mensaje:
        'Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Manejo de errores globales
app.use((err, req, res, _next) => {
  console.error('Error interno del servidor:', err.stack);
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor.',
  });
});

// Iniciar servidor solo si no estamos en modo de prueba
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📧 Entorno: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
