'use strict';

process.env.NODE_ENV = 'test';

const {
  generarTextoPlano,
  generarPlantillaHTML,
} = require('../src/emailService');

const datosPrueba = {
  nombre: 'Carlos Rodríguez',
  correo: 'carlos@ejemplo.com',
  asunto: 'Solicitud de información',
  mensaje: 'Buenos días, quisiera obtener más información sobre sus servicios.',
};

describe('Servicio de Correo Electrónico', () => {
  describe('generarTextoPlano()', () => {
    it('debe incluir el nombre del remitente', () => {
      const texto = generarTextoPlano(datosPrueba);
      expect(texto).toContain('Carlos Rodríguez');
    });

    it('debe incluir el correo del remitente', () => {
      const texto = generarTextoPlano(datosPrueba);
      expect(texto).toContain('carlos@ejemplo.com');
    });

    it('debe incluir el asunto del mensaje', () => {
      const texto = generarTextoPlano(datosPrueba);
      expect(texto).toContain('Solicitud de información');
    });

    it('debe incluir el cuerpo del mensaje', () => {
      const texto = generarTextoPlano(datosPrueba);
      expect(texto).toContain('Buenos días, quisiera obtener más información');
    });
  });

  describe('generarPlantillaHTML()', () => {
    it('debe devolver HTML válido con DOCTYPE', () => {
      const html = generarPlantillaHTML(datosPrueba);
      expect(html).toContain('<!DOCTYPE html>');
    });

    it('debe incluir los datos del remitente en el HTML', () => {
      const html = generarPlantillaHTML(datosPrueba);
      expect(html).toContain('Carlos Rodríguez');
      expect(html).toContain('carlos@ejemplo.com');
    });

    it('debe incluir el asunto y mensaje en el HTML', () => {
      const html = generarPlantillaHTML(datosPrueba);
      expect(html).toContain('Solicitud de información');
      expect(html).toContain('Buenos días, quisiera obtener más información');
    });

    it('debe incluir estilos CSS en el HTML', () => {
      const html = generarPlantillaHTML(datosPrueba);
      expect(html).toContain('<style>');
    });
  });
});
