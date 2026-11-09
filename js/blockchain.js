/**
 * ESTRUCTURA Y VISUALIZACIÓN DE LA BLOCKCHAIN
 * Gestiona la cadena de bloques conectados, transacciones en mempool y enlaces criptográficos.
 */
(function(window) {
  'use strict';

  // Banco de transacciones ficticias educativas del aula y taller
  const BANCO_TRANSACCIONES = [
    { de: 'Mesa 1 (Elena)', para: 'Mesa 3 (Diego)', monto: '12.50 EDU', txid: 'tx_a8f91c' },
    { de: 'Prof. Daniel', para: 'Mesa 4 (Sofía)', monto: '50.00 EDU', txid: 'tx_72bc04' },
    { de: 'Mesa 2 (Mateo)', para: 'Biblioteca', monto: '5.00 EDU', txid: 'tx_3d1e90' },
    { de: 'Mesa 5 (Clara)', para: 'Mesa 1 (Elena)', monto: '18.75 EDU', txid: 'tx_f40b2a' },
    { de: 'Laboratorio Central', para: 'Mesa 2 (Mateo)', monto: '30.00 EDU', txid: 'tx_11e8dc' },
    { de: 'Mesa 4 (Sofía)', para: 'Mesa 5 (Clara)', monto: '8.20 EDU', txid: 'tx_99ca71' },
    { de: 'Mesa 3 (Diego)', para: 'Prof. Daniel', monto: '14.00 EDU', txid: 'tx_5b73ef' }
  ];

  class GestorBlockchain {
    constructor() {
      this.cadena = [];
      this.mempool = [];
      this.inicializarCadena();
    }

    inicializarCadena() {
      // Bloque Génesis #0 oficial
      const bloqueGenesis = {
        indice: 0,
        marcaTiempo: '2026-11-01 08:00:00',
        transacciones: [
          { de: 'Sistema Génesis', para: 'Red Escolar', monto: '1000.00 EDU', txid: 'tx_genesis_000' }
        ],
        hashAnterior: '0000000000000000000000000000000000000000000000000000000000000000',
        nonce: 2084,
        hash: '000a4f89b1c720e365d92f8019ab76d4002819cdfe801192ab410294e9f72b10',
        dificultad: 2
      };

      this.cadena = [bloqueGenesis];
      this.generarNuevoLoteMempool();
    }

    generarNuevoLoteMempool() {
      // Selecciona 3 o 4 transacciones aleatorias para el siguiente bloque
      const barajadas = [...BANCO_TRANSACCIONES].sort(() => 0.5 - Math.random());
      this.mempool = barajadas.slice(0, 3);
      return this.mempool;
    }

    obtenerUltimoBloque() {
      return this.cadena[this.cadena.length - 1];
    }

    obtenerSiguienteCandidato() {
      const ultimo = this.obtenerUltimoBloque();
      const nuevoIndice = ultimo.indice + 1;
      const fechaActual = new Date().toLocaleTimeString('es-MX', { hour12: false });
      
      return {
        indice: nuevoIndice,
        marcaTiempo: fechaActual,
        transacciones: [...this.mempool],
        hashAnterior: ultimo.hash,
        nonce: 0
      };
    }

    /**
     * Construye la cadena de texto canónica que alimenta la función SHA-256.
     * @param {object} bloque 
     * @param {number} nonce 
     * @returns {string}
     */
    formatearCadenaBloqueParaHash(bloque, nonce) {
      const txResumen = bloque.transacciones.map(t => `${t.de}->${t.para}:${t.monto}`).join('|');
      return `B#${bloque.indice}|Prev:${bloque.hashAnterior}|Tx:${txResumen}|Nonce:${nonce}`;
    }

    agregarBloque(bloqueResuelto) {
      this.cadena.push(bloqueResuelto);
      this.generarNuevoLoteMempool();
      return bloqueResuelto;
    }

    /**
     * Renderiza el visor visual de la cadena conectada (SVG chain links)
     * @param {HTMLElement} contenedor - Contenedor DOM donde inyectar la blockchain
     * @param {function} onSeleccionarBloque - Callback al hacer clic en un bloque
     */
    renderizarCadena(contenedor, onSeleccionarBloque) {
      if (!contenedor) return;
      contenedor.innerHTML = '';

      const envoltura = document.createElement('div');
      envoltura.className = 'cadena-nodos-flujo';

      this.cadena.forEach((bloque, index) => {
        // Bloque visual
        const nodoBloque = document.createElement('article');
        nodoBloque.className = `nodo-bloque-card ${index === this.cadena.length - 1 ? 'ultimo-bloque' : ''}`;
        nodoBloque.setAttribute('tabindex', '0');
        nodoBloque.setAttribute('role', 'button');
        nodoBloque.setAttribute('aria-label', `Bloque número ${bloque.indice}`);

        const hashCorto = bloque.hash.substring(0, 8) + '...' + bloque.hash.substring(58);
        const prevCorto = bloque.hashAnterior.substring(0, 8) + '...';

        nodoBloque.innerHTML = `
          <div class="nodo-bloque-cabecera">
            <span class="nodo-icono-cubo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </span>
            <span class="nodo-etiqueta-bloque">Bloque #${bloque.indice}</span>
            ${index === 0 ? '<span class="chip-genesis">Génesis</span>' : ''}
          </div>
          <div class="nodo-cuerpo-datos">
            <div class="dato-fila-nodo">
              <span class="dato-clave">Hash:</span>
              <code class="codigo-hash-resumen" title="${bloque.hash}">${hashCorto}</code>
            </div>
            <div class="dato-fila-nodo">
              <span class="dato-clave">Previo:</span>
              <code class="codigo-prev-resumen" title="${bloque.hashAnterior}">${prevCorto}</code>
            </div>
            <div class="dato-fila-nodo">
              <span class="dato-clave">Nonce:</span>
              <strong class="dato-nonce-valor">${bloque.nonce}</strong>
            </div>
            <div class="dato-fila-nodo">
              <span class="dato-clave">Transacciones:</span>
              <span>${bloque.transacciones.length} operaciones</span>
            </div>
          </div>
        `;

        nodoBloque.addEventListener('click', () => {
          if (onSeleccionarBloque) onSeleccionarBloque(bloque);
        });

        nodoBloque.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onSeleccionarBloque) onSeleccionarBloque(bloque);
          }
        });

        envoltura.appendChild(nodoBloque);

        // Si no es el último, agregamos un conector animado
        if (index < this.cadena.length - 1) {
          const conector = document.createElement('div');
          conector.className = 'conector-cadena-svg';
          conector.innerHTML = `
            <div class="linea-conexion"></div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icono-enlace">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <div class="linea-conexion"></div>
          `;
          envoltura.appendChild(conector);
        }
      });

      contenedor.appendChild(envoltura);
      // Auto-scroll horizontal hacia el final para ver el bloque más reciente
      setTimeout(() => {
        contenedor.scrollLeft = contenedor.scrollWidth;
      }, 50);
    }
  }

  window.GestorBlockchain = new GestorBlockchain();
})(window);
