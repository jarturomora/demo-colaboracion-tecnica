# 📬 Formulario de Contacto

[![Estado del Proyecto](https://img.shields.io/badge/estado-activo-brightgreen)](https://github.com/jarturomora/demo-colaboracion-tecnica)
[![Versión](https://img.shields.io/badge/versión-1.0.0-blue)](CHANGELOG.md)
[![Licencia](https://img.shields.io/badge/licencia-GPL-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933)](https://nodejs.org)

Aplicación web para el envío de formularios de contacto con notificaciones por correo electrónico. Desarrollada con Node.js y Express, cuenta con validación en el servidor, diseño responsivo y protección contra abuso.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Pruebas](#-pruebas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribución](#-contribución)
- [Historial de Cambios](#-historial-de-cambios)
- [Licencia](#-licencia)

---

## ✨ Características

- **Formulario de contacto** con campos: Nombre, Correo electrónico, Asunto y Mensaje.
- **Validación del lado del cliente** con retroalimentación en tiempo real.
- **Validación del lado del servidor** robusta usando `express-validator`.
- **Envío de correo electrónico** mediante SMTP usando Nodemailer.
- **Plantilla HTML** para el correo recibido, con formato profesional.
- **Protección contra abuso** mediante limitación de peticiones (`express-rate-limit`).
- **Cabeceras de seguridad** HTTP configuradas con `helmet`.
- **Diseño responsivo** que se adapta a dispositivos móviles y de escritorio.
- **Página de confirmación** tras el envío exitoso.
- **Manejo de errores** con mensajes claros para el usuario.

---

## 🛠️ Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| [Node.js](https://nodejs.org) | 18+ | Entorno de ejecución |
| [Express](https://expressjs.com) | ^4.18 | Framework web |
| [Nodemailer](https://nodemailer.com) | ^6.9 | Envío de correos |
| [express-validator](https://express-validator.github.io) | ^7.0 | Validación de datos |
| [Helmet](https://helmetjs.github.io) | ^7.1 | Seguridad HTTP |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | ^7.1 | Límite de peticiones |
| [Jest](https://jestjs.io) + [Supertest](https://github.com/ladjs/supertest) | ^29 + ^6 | Pruebas automatizadas |

---

## ✅ Requisitos Previos

- **Node.js** versión 18 o superior
- **npm** versión 8 o superior
- Acceso a un servidor **SMTP** (Gmail, Outlook, SendGrid, Mailgun, etc.)

---

## 🚀 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/jarturomora/demo-colaboracion-tecnica.git
   cd demo-colaboracion-tecnica
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Copia el archivo de configuración:**

   ```bash
   cp .env.example .env
   ```

4. **Configura las variables de entorno** (ver sección [Configuración](#-configuración)).

---

## ⚙️ Configuración

Edita el archivo `.env` con los valores de tu servidor de correo:

```env
# Puerto del servidor web
PORT=3000

# Entorno de ejecución: development | production | test
NODE_ENV=development

# Configuración SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion

# Destinatario de los mensajes de contacto
EMAIL_TO=administrador@tu-dominio.com
EMAIL_FROM=noreply@tu-dominio.com

# Nombre visible del sitio en los correos
SITE_NAME=Mi Empresa
```

> **Nota para Gmail:** Es necesario habilitar la verificación en dos pasos y crear una
> [contraseña de aplicación](https://support.google.com/accounts/answer/185833).

---

## 🖥️ Uso

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## 🧪 Pruebas

Ejecuta la suite de pruebas automatizadas:

```bash
npm test
```

Para ver el reporte de cobertura:

```bash
npm test -- --coverage
```

Las pruebas cubren:

- Rutas HTTP (formulario, página de gracias, 404)
- Validación de campos del formulario (servidor)
- Generación de plantillas de correo

---

## 📁 Estructura del Proyecto

```
demo-colaboracion-tecnica/
├── public/                 # Archivos estáticos del cliente
│   ├── index.html          # Formulario de contacto
│   ├── gracias.html        # Página de confirmación
│   ├── 404.html            # Página de error 404
│   ├── styles.css          # Estilos del sitio
│   └── main.js             # Lógica del cliente
├── src/                    # Código del servidor
│   ├── app.js              # Aplicación Express
│   └── emailService.js     # Servicio de envío de correos
├── tests/                  # Pruebas automatizadas
│   ├── contacto.test.js    # Pruebas de la API
│   └── emailService.test.js# Pruebas del servicio de correo
├── docs/                   # Documentación del proyecto
│   ├── pull-requests/      # Historial de pull requests
│   └── code-reviews/       # Revisiones de código
├── .env.example            # Plantilla de configuración
├── .gitignore              # Archivos ignorados por Git
├── package.json            # Metadatos y dependencias
├── CHANGELOG.md            # Historial de cambios y releases
└── CONTRIBUTING.md         # Guía de contribución
```

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [Guía de Contribución](CONTRIBUTING.md)
antes de enviar un pull request.

---

## 📄 Historial de Cambios

Consulta el [CHANGELOG.md](CHANGELOG.md) para ver el historial completo de versiones y cambios.

---

## 📜 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---

<div align="center">
  <p>Desarrollado con ❤️ por el Equipo de Demo Colaboración Técnica</p>
</div>
