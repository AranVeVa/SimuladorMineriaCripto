/**
 * ASISTENTE EDUCATIVO DEL LABORATORIO
 * Ofrece explicaciones contextuales y orientación pedagógica según las acciones del estudiante.
 */
(function(window) {
  'use strict';

  const MENSAJES_CONTEXTUALES = {
    inicio: '¡Bienvenido al laboratorio! Te recomiendo explorar primero la sección "Aprende" o sumergirte de inmediato en el "Laboratorio" para ver un equipo de minería en acción.',
    laboratorio_inactivo: 'Tu equipo está listo y frío (38°C). Elige tu nivel de dificultad y pulsa "Iniciar Minería" para ver cómo busca combinaciones matemáticas.',
    laboratorio_minando: 'El equipo está procesando hashes a gran velocidad. Observa cómo la temperatura sube y el Nonce se incrementa en cada intento.',
    laboratorio_encontrado: '¡Bloque sellado con éxito! Observa cómo los primeros caracteres del hash coinciden con los ceros exigidos por la red.',
    laboratorio_hash: 'Este hash es el resultado que genera la información del bloque combinada con el Nonce. Si modificas un solo dato, obtendrás una huella completamente diferente.',
    laboratorio_nonce: 'El Nonce es un número que el minero modifica libremente. Como los datos de las transacciones son fijos, el Nonce es la única palanca que tienes para cambiar el hash final.',
    laboratorio_temperatura: 'Hacer millones de cálculos matemáticos calienta los microchips y gasta electricidad real. Esa energía es la garantía física de que nadie puede hacer trampa gratis.',
    experimentos: 'En este espacio puedes jugar con las variables de forma controlada. Te recomiendo iniciar con el Experimento 1 para ver el "Efecto Avalancha" en vivo.',
    aprende: 'Aquí tienes 9 tarjetas clave explicadas con ejemplos de la vida diaria (candados, dados, motores). Haz clic en "Profundizar" en cualquiera para aprender más.',
    evaluacion: '¡Momento de poner a prueba lo aprendido! Lee con calma cada pregunta. Si te equivocas, recibirás una pista para volver a intentarlo.'
  };

  class AsistenteLaboratorio {
    constructor() {
      this.mensajeActual = MENSAJES_CONTEXTUALES.inicio;
      this.abierto = true;
      this.elementoDOM = null;
    }

    inicializar(contenedorDOM) {
      this.elementoDOM = contenedorDOM;
      this.renderizar();
    }

    establecerMensaje(claveOMensaje) {
      if (MENSAJES_CONTEXTUALES[claveOMensaje]) {
        this.mensajeActual = MENSAJES_CONTEXTUALES[claveOMensaje];
      } else {
        this.mensajeActual = claveOMensaje;
      }
      this.actualizarTexto();
    }

    alternarVisibilidad() {
      this.abierto = !this.abierto;
      if (this.elementoDOM) {
        this.elementoDOM.classList.toggle('asistente-minimizado', !this.abierto);
      }
    }

    actualizarTexto() {
      if (!this.elementoDOM) return;
      const cuerpoTexto = this.elementoDOM.querySelector('.asistente-burbuja-texto');
      if (cuerpoTexto) {
        cuerpoTexto.innerHTML = this.mensajeActual;
        // Breve animación de pulso sutil
        cuerpoTexto.classList.remove('animacion-cambio');
        void cuerpoTexto.offsetWidth; // Forzar reflow
        cuerpoTexto.classList.add('animacion-cambio');
      }
    }

    renderizar() {
      if (!this.elementoDOM) return;
      this.elementoDOM.innerHTML = `
        <div class="asistente-tarjeta-flotante" role="complementary" aria-label="Asistente del laboratorio">
          <div class="asistente-cabecera">
            <div class="asistente-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="asistente-titulos">
              <span class="asistente-nombre">Guía del Laboratorio</span>
              <span class="asistente-subtitulo">Orientación contextual</span>
            </div>
            <button type="button" class="btn-minimizar-asistente" aria-label="Minimizar o expandir asistente" title="Minimizar / Expandir">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icono-minimizar">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <div class="asistente-cuerpo">
            <p class="asistente-burbuja-texto">${this.mensajeActual}</p>
          </div>
        </div>
      `;

      const btnMinimizar = this.elementoDOM.querySelector('.btn-minimizar-asistente');
      if (btnMinimizar) {
        btnMinimizar.addEventListener('click', () => this.alternarVisibilidad());
      }
    }
  }

  window.AsistenteLaboratorio = new AsistenteLaboratorio();
})(window);
