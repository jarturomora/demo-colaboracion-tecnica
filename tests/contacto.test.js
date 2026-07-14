'use strict';

const request = require('supertest');

// Configurar variables de entorno para pruebas
process.env.NODE_ENV = 'test';
process.env.EMAIL_HOST = 'smtp.test.com';
process.env.EMAIL_USER = 'test@test.com';
process.env.EMAIL_PASS = 'testpass';
process.env.EMAIL_TO = 'admin@test.com';
process.env.EMAIL_FROM = 'noreply@test.com';
process.env.SITE_NAME = 'Proyecto de Prueba';

const app = require('../src/app');

describe('API de Formulario de Contacto', () => {
  describe('GET /', () => {
    it('debe devolver el formulario de contacto (200)', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toMatch(/html/);
    });
  });

  describe('GET /gracias', () => {
    it('debe devolver la página de gracias (200)', async () => {
      const res = await request(app).get('/gracias');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toMatch(/html/);
    });
  });

  describe('GET /ruta-inexistente', () => {
    it('debe devolver 404 para rutas no definidas', async () => {
      const res = await request(app).get('/ruta-inexistente');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/contacto', () => {
    const datosValidos = {
      nombre: 'Ana López',
      correo: 'ana@ejemplo.com',
      asunto: 'Consulta sobre servicios',
      mensaje: 'Me gustaría obtener información sobre sus servicios disponibles.',
    };

    it('debe aceptar un formulario válido y devolver éxito (200)', async () => {
      const res = await request(app)
        .post('/api/contacto')
        .send(datosValidos)
        .set('Content-Type', 'application/json');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.mensaje).toBeTruthy();
    });

    it('debe rechazar un formulario sin nombre (400)', async () => {
      const res = await request(app)
        .post('/api/contacto')
        .send({ ...datosValidos, nombre: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errores).toBeInstanceOf(Array);
    });

    it('debe rechazar un correo electrónico inválido (400)', async () => {
      const res = await request(app)
        .post('/api/contacto')
        .send({ ...datosValidos, correo: 'correo-invalido' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('debe rechazar un mensaje demasiado corto (400)', async () => {
      const res = await request(app)
        .post('/api/contacto')
        .send({ ...datosValidos, mensaje: 'Corto' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('debe rechazar cuando faltan todos los campos requeridos (400)', async () => {
      const res = await request(app)
        .post('/api/contacto')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errores.length).toBeGreaterThanOrEqual(4);
    });

    it('debe rechazar un asunto demasiado corto (400)', async () => {
      const res = await request(app)
        .post('/api/contacto')
        .send({ ...datosValidos, asunto: 'OK' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
