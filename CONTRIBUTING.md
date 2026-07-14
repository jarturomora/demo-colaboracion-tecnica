# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto **Formulario de Contacto**! Este documento explica el proceso para colaborar de manera efectiva.

---

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
- [Flujo de Trabajo con Git](#flujo-de-trabajo-con-git)
- [Estándares de Código](#estándares-de-código)
- [Convenciones de Commits](#convenciones-de-commits)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Nuevas Funcionalidades](#solicitar-nuevas-funcionalidades)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)

---

## Código de Conducta

Al participar en este proyecto, aceptas mantener un ambiente respetuoso, inclusivo y colaborativo. Se espera que todos los contribuyentes:

- Usen un lenguaje cordial y profesional.
- Respeten las opiniones y puntos de vista de los demás.
- Acepten las críticas constructivas con apertura.
- Se centren en lo que es mejor para la comunidad y el proyecto.

---

## ¿Cómo Puedo Contribuir?

Existen varias formas de contribuir al proyecto:

| Tipo | Descripción |
|---|---|
| 🐛 **Reportar bugs** | Abre un issue describiendo el problema encontrado |
| 💡 **Sugerir mejoras** | Abre un issue con una propuesta de nueva funcionalidad |
| 📝 **Mejorar documentación** | Corrige o amplía la documentación existente |
| 🔧 **Corregir bugs** | Resuelve un issue existente marcado como `bug` |
| ✨ **Desarrollar funcionalidades** | Implementa una nueva característica acordada |
| 🧪 **Agregar pruebas** | Aumenta la cobertura de pruebas automatizadas |

---

## Flujo de Trabajo con Git

Utilizamos el modelo **GitHub Flow** para gestionar las contribuciones:

```
main
  └─── feature/nombre-de-la-funcionalidad   ← Tu rama de trabajo
         └─── Pull Request → main
```

### Pasos detallados:

1. **Haz un fork** del repositorio en tu cuenta de GitHub.

2. **Clona tu fork** localmente:
   ```bash
   git clone https://github.com/TU-USUARIO/demo-colaboracion-tecnica.git
   cd demo-colaboracion-tecnica
   ```

3. **Configura el repositorio remoto original** como `upstream`:
   ```bash
   git remote add upstream https://github.com/jarturomora/demo-colaboracion-tecnica.git
   ```

4. **Crea una rama** con un nombre descriptivo a partir de `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/nombre-descriptivo
   ```

5. **Realiza tus cambios**, haciendo commits frecuentes y descriptivos.

6. **Asegúrate de que las pruebas pasen**:
   ```bash
   npm test
   ```

7. **Sube tu rama** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```

8. **Abre un Pull Request** desde tu rama hacia `main` del repositorio original.

---

## Estándares de Código

### JavaScript (Node.js)

- Usa `'use strict'` al inicio de cada módulo.
- Declara variables con `const` o `let` (nunca `var`).
- Usa funciones `async/await` para operaciones asíncronas.
- Nombra variables y funciones en **camelCase** (español).
- Nombra clases en **PascalCase**.
- Agrega JSDoc a todas las funciones públicas.

### HTML y CSS

- Usa etiquetas semánticas de HTML5 (`<header>`, `<main>`, `<footer>`, etc.).
- Sigue la metodología **BEM** para los nombres de clases CSS.
- Asegura que el diseño sea **responsivo** y accesible (WCAG 2.1 AA).

### Archivos

- Indentación con **2 espacios**.
- Codificación **UTF-8**.
- Archivos terminados con una línea en blanco.
- Longitud máxima de línea: **100 caracteres**.

---

## Convenciones de Commits

Seguimos la especificación de [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):

```
<tipo>(<ámbito>): <descripción corta en español>

[cuerpo opcional]

[notas al pie opcionales]
```

### Tipos aceptados:

| Tipo | Descripción |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un bug |
| `docs` | Cambios solo en documentación |
| `style` | Cambios de formato (no afectan lógica) |
| `refactor` | Refactorización de código existente |
| `test` | Agregar o corregir pruebas |
| `chore` | Tareas de mantenimiento (dependencias, configuración) |

### Ejemplos:

```bash
feat(formulario): agregar contador de caracteres en el campo de mensaje
fix(email): corregir error al enviar con caracteres especiales en el asunto
docs(readme): actualizar instrucciones de configuración de Gmail
test(api): agregar prueba para validación de correo inválido
```

---

## Proceso de Pull Request

### Antes de abrir un PR:

- [ ] El código compila y la aplicación funciona localmente.
- [ ] Todas las pruebas existentes pasan (`npm test`).
- [ ] Se agregaron pruebas para las nuevas funcionalidades.
- [ ] La documentación relevante fue actualizada.
- [ ] El `CHANGELOG.md` fue actualizado si corresponde.

### Plantilla de Pull Request:

```markdown
## Descripción
Breve descripción de los cambios realizados y su propósito.

## Tipo de cambio
- [ ] Nueva funcionalidad (`feat`)
- [ ] Corrección de bug (`fix`)
- [ ] Documentación (`docs`)
- [ ] Refactorización (`refactor`)
- [ ] Pruebas (`test`)

## Cambios realizados
- Cambio 1
- Cambio 2

## Pruebas realizadas
Describe cómo probaste los cambios.

## Issues relacionados
Cierra #<número-del-issue>
```

### Criterios de aprobación:

- Al menos **1 aprobación** de un mantenedor del proyecto.
- Todos los **checks de CI** deben pasar.
- No debe haber **conflictos** con la rama `main`.

---

## Reportar Bugs

Al reportar un bug, incluye la siguiente información en el issue:

1. **Descripción clara** del problema.
2. **Pasos para reproducirlo** (numerados).
3. **Comportamiento esperado** vs. **comportamiento actual**.
4. **Capturas de pantalla** o mensajes de error (si aplica).
5. **Entorno:** Sistema operativo, versión de Node.js, navegador.

**Ejemplo de título:** `[Bug] El formulario no valida correctamente el campo de correo en Safari`

---

## Solicitar Nuevas Funcionalidades

Para proponer una nueva funcionalidad:

1. Verifica que no exista un issue similar abierto.
2. Abre un nuevo issue con la etiqueta `enhancement`.
3. Incluye:
   - **Descripción** de la funcionalidad propuesta.
   - **Caso de uso**: ¿Qué problema resuelve?
   - **Implementación sugerida** (opcional).
   - **Alternativas consideradas**.

---

## Configuración del Entorno de Desarrollo

```bash
# 1. Clona el repositorio
git clone https://github.com/jarturomora/demo-colaboracion-tecnica.git
cd demo-colaboracion-tecnica

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env
# Edita .env con tu configuración SMTP

# 4. Inicia el servidor en modo desarrollo
npm run dev

# 5. Ejecuta las pruebas
npm test
```

El servidor de desarrollo se reinicia automáticamente al detectar cambios en los archivos gracias a `nodemon`.

---

## 💬 ¿Tienes Preguntas?

Si tienes dudas sobre el proceso de contribución, puedes:

- Abrir un issue con la etiqueta `question`.
- Consultar la [documentación del proyecto](README.md).

¡Gracias por contribuir! 🚀
