# 📝 Historial de Cambios (Changelog)

Todos los cambios notables de este proyecto están documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue el [Versionado Semántico](https://semver.org/lang/es/).

---

## [1.0.0] – 2024-03-15 🚀 Lanzamiento Oficial

### ✨ Nuevo
- Integración de `helmet` para configuración de cabeceras de seguridad HTTP.
- Limitación de peticiones con `express-rate-limit` (máximo 10 envíos cada 15 minutos).
- Página de error 404 personalizada con diseño consistente.
- Atributos ARIA en el formulario para mejorar la accesibilidad (WCAG 2.1 AA).
- Variables de entorno documentadas con `.env.example`.
- Suite de pruebas automatizadas con Jest y Supertest (cobertura del 85%).

### 🔧 Mejorado
- Plantilla HTML del correo rediseñada con soporte para clientes de correo modernos.
- Mensajes de validación más claros y descriptivos en español.
- Optimización del CSS: reducción del 20% en tamaño del archivo con variables CSS.
- Mejora en la accesibilidad del formulario (etiquetas `aria-live`, `role="alert"`).
- Documentación completa: README, CONTRIBUTING y CHANGELOG.

### 🐛 Corregido
- Corrección del error al enviar mensajes con caracteres especiales (tildes, ñ) en el asunto.
- El campo de mensaje ahora muestra correctamente el límite de 2000 caracteres.
- El botón de envío quedaba deshabilitado indefinidamente si el servidor no respondía.

### 🔒 Seguridad
- Sanitización de todas las entradas del formulario con `express-validator`.
- Protección contra inyección de cabeceras de correo (`header injection`).

---

## [0.3.0] – 2024-02-20 ✅ Validación Mejorada

### ✨ Nuevo
- Validación en tiempo real del formulario en el cliente mientras el usuario escribe.
- Contador de caracteres dinámico en el campo de mensaje.
- Indicadores visuales de validez/invalidez en cada campo (borde verde/rojo).
- Mensajes de error individuales por campo con animación de aparición.
- Alerta de éxito/error global al enviar el formulario.

### 🔧 Mejorado
- Refactorización del código JavaScript del cliente con patrón modular IIFE.
- La validación del servidor ahora devuelve errores detallados por campo.
- El formulario se limpia automáticamente tras un envío exitoso.

### 🐛 Corregido
- El formulario permitía envíos múltiples antes de recibir respuesta del servidor.
- La validación del correo electrónico no detectaba dominios sin TLD.

---

## [0.2.0] – 2024-01-25 🎨 Diseño Responsivo

### ✨ Nuevo
- Diseño responsivo completo para dispositivos móviles, tabletas y escritorio.
- Variables CSS personalizadas para una gestión centralizada del tema visual.
- Página de confirmación (`gracias.html`) al enviar exitosamente el formulario.
- Animaciones sutiles en botones y campos de entrada.
- Soporte para el modo oscuro del sistema operativo (prefers-color-scheme).

### 🔧 Mejorado
- Rediseño completo de la interfaz usando metodología BEM para las clases CSS.
- El encabezado ahora usa un degradado de color azul corporativo.
- Los campos del formulario tienen retroalimentación visual al recibir el foco.

### 🐛 Corregido
- El formulario se desbordaba horizontalmente en pantallas pequeñas (< 400px).
- Los textos de error tenían contraste insuficiente para usuarios con discapacidad visual.

---

## [0.1.0] – 2024-01-10 🏗️ Versión Inicial

### ✨ Nuevo
- Estructura base del proyecto con Node.js y Express.
- Formulario HTML con campos: Nombre, Correo electrónico, Asunto y Mensaje.
- Ruta `POST /api/contacto` para procesar el formulario.
- Servicio de envío de correo electrónico usando Nodemailer y SMTP.
- Validación básica de campos en el servidor con `express-validator`.
- Plantilla de correo en texto plano y HTML.
- Archivo `package.json` con las dependencias del proyecto.
- Archivo `.env.example` con las variables de entorno necesarias.
- Archivo `.gitignore` configurado para proyectos Node.js.

---

## 🔗 Referencias

- [PR-001: Estructura base del proyecto](docs/pull-requests/PR-001.md)
- [PR-002: Diseño responsivo con CSS](docs/pull-requests/PR-002.md)
- [PR-003: Validación mejorada del formulario](docs/pull-requests/PR-003.md)
- [PR-004: Integración del servicio de correo](docs/pull-requests/PR-004.md)
- [PR-005: Seguridad y versión de producción](docs/pull-requests/PR-005.md)

[1.0.0]: https://github.com/jarturomora/demo-colaboracion-tecnica/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/jarturomora/demo-colaboracion-tecnica/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jarturomora/demo-colaboracion-tecnica/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jarturomora/demo-colaboracion-tecnica/releases/tag/v0.1.0
