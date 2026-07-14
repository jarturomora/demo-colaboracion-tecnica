/* ============================================================
   Formulario de Contacto – Lógica del Cliente (main.js)
   ============================================================ */

(function () {
  'use strict';

  // ── Referencias al DOM ──────────────────────────────────────
  const formulario = document.getElementById('formularioContacto');
  const botonEnviar = document.getElementById('botonEnviar');
  const textoBoton = botonEnviar && botonEnviar.querySelector('.boton__texto');
  const cargandoBoton = botonEnviar && botonEnviar.querySelector('.boton__cargando');
  const alertaExito = document.getElementById('alerta-exito');
  const alertaError = document.getElementById('alerta-error');
  const textoExito = document.getElementById('texto-exito');
  const textoError = document.getElementById('texto-error');
  const contadorMensaje = document.getElementById('contador-mensaje');
  const campoMensaje = document.getElementById('mensaje');

  if (!formulario) return; // Salir si no existe el formulario en la página

  // ── Contador de caracteres en el área de mensaje ────────────
  if (campoMensaje && contadorMensaje) {
    campoMensaje.addEventListener('input', actualizarContador);
    actualizarContador();
  }

  function actualizarContador() {
    const longitud = campoMensaje.value.length;
    const maximo = campoMensaje.maxLength || 2000;
    contadorMensaje.textContent = `${longitud} / ${maximo}`;
    contadorMensaje.style.color = longitud > maximo * 0.9 ? '#dc2626' : '';
  }

  // ── Validación en tiempo real al salir de cada campo ────────
  formulario.querySelectorAll('.campo__entrada').forEach((entrada) => {
    entrada.addEventListener('blur', () => validarCampo(entrada));
    entrada.addEventListener('input', () => {
      if (entrada.classList.contains('invalido')) validarCampo(entrada);
    });
  });

  // ── Envío del formulario ────────────────────────────────────
  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    ocultarAlertas();

    const camposValidos = validarTodosLosCampos();
    if (!camposValidos) return;

    iniciarEstadoCargando();

    const datos = new FormData(formulario);
    const cuerpo = JSON.stringify({
      nombre: datos.get('nombre'),
      correo: datos.get('correo'),
      asunto: datos.get('asunto'),
      mensaje: datos.get('mensaje'),
    });

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: cuerpo,
      });

      const json = await respuesta.json();

      if (respuesta.ok && json.success) {
        mostrarExito(json.mensaje);
        formulario.reset();
        if (contadorMensaje) actualizarContador();
        formulario
          .querySelectorAll('.campo__entrada')
          .forEach((e) => e.classList.remove('valido', 'invalido'));
      } else {
        const mensajeError = json.errores
          ? json.errores.map((e) => e.mensaje).join(' ')
          : json.mensaje || 'Error desconocido.';
        mostrarErrorGlobal(mensajeError);
        if (json.errores) mostrarErroresPorCampo(json.errores);
      }
    } catch (_error) {
      mostrarErrorGlobal(
        'No se pudo conectar con el servidor. Verifica tu conexión a internet e inténtalo de nuevo.'
      );
    } finally {
      terminarEstadoCargando();
    }
  });

  // ── Funciones auxiliares ─────────────────────────────────────

  function validarCampo(entrada) {
    const id = entrada.id;
    const valor = entrada.value.trim();
    const mensajeError = document.getElementById(`error-${id}`);
    let error = '';

    switch (id) {
      case 'nombre':
        if (!valor) error = 'El nombre es requerido.';
        else if (valor.length < 2) error = 'El nombre debe tener al menos 2 caracteres.';
        else if (valor.length > 100) error = 'El nombre no puede exceder 100 caracteres.';
        break;
      case 'correo':
        if (!valor) error = 'El correo electrónico es requerido.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
          error = 'Por favor, ingresa un correo electrónico válido.';
        break;
      case 'asunto':
        if (!valor) error = 'El asunto es requerido.';
        else if (valor.length < 5) error = 'El asunto debe tener al menos 5 caracteres.';
        else if (valor.length > 200) error = 'El asunto no puede exceder 200 caracteres.';
        break;
      case 'mensaje':
        if (!valor) error = 'El mensaje es requerido.';
        else if (valor.length < 10) error = 'El mensaje debe tener al menos 10 caracteres.';
        else if (valor.length > 2000) error = 'El mensaje no puede exceder 2000 caracteres.';
        break;
    }

    if (mensajeError) mensajeError.textContent = error;
    entrada.classList.toggle('invalido', !!error);
    entrada.classList.toggle('valido', !error && !!valor);
    return !error;
  }

  function validarTodosLosCampos() {
    const entradas = formulario.querySelectorAll('.campo__entrada');
    let todosValidos = true;
    entradas.forEach((entrada) => {
      if (!validarCampo(entrada)) todosValidos = false;
    });
    return todosValidos;
  }

  function mostrarErroresPorCampo(errores) {
    errores.forEach(({ campo, mensaje }) => {
      const entrada = document.getElementById(campo);
      const mensajeError = document.getElementById(`error-${campo}`);
      if (entrada) entrada.classList.add('invalido');
      if (mensajeError) mensajeError.textContent = mensaje;
    });
  }

  function ocultarAlertas() {
    alertaExito && alertaExito.classList.add('oculto');
    alertaError && alertaError.classList.add('oculto');
  }

  function mostrarExito(mensaje) {
    if (textoExito) textoExito.textContent = mensaje;
    alertaExito && alertaExito.classList.remove('oculto');
    alertaExito && alertaExito.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function mostrarErrorGlobal(mensaje) {
    if (textoError) textoError.textContent = mensaje;
    alertaError && alertaError.classList.remove('oculto');
    alertaError && alertaError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function iniciarEstadoCargando() {
    botonEnviar.disabled = true;
    textoBoton && textoBoton.classList.add('oculto');
    cargandoBoton && cargandoBoton.classList.remove('oculto');
  }

  function terminarEstadoCargando() {
    botonEnviar.disabled = false;
    textoBoton && textoBoton.classList.remove('oculto');
    cargandoBoton && cargandoBoton.classList.add('oculto');
  }
})();
