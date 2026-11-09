/**
 * CONTROLADOR PRINCIPAL DE LA APLICACIÓN
 * Vincula la interfaz, eventos de usuario, navegación por pestañas y renderizado.
 */
(function(window) {
  'use strict';

  // Banco de los 9 temas educativos obligatorios
  const TEMAS_EDUCATIVOS = [
    {
      id: 'tema_criptomoneda',
      titulo: '¿Qué es una criptomoneda?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"></circle><path d="M9 8h6M9 12h6M9 16h4M12 4v2M12 18v2"></path></svg>`,
      resumen: 'Una forma de dinero digital que utiliza herramientas criptográficas para proteger y verificar operaciones.',
      analogia: 'Es como fichas de casillero protegidas por candados matemáticos irrompibles en vez de un banco físico.',
      detalle: 'A diferencia del dinero tradicional emitido por bancos centrales, una criptomoneda funciona sobre una red distribuida de computadoras. Cada transferencia queda registrada mediante firmas matemáticas que garantizan que solo el dueño legítimo pueda mover sus fondos, sin intermediarios.'
    },
    {
      id: 'tema_blockchain',
      titulo: '¿Qué es blockchain?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      resumen: 'Una cadena de bloques donde se registra información de manera organizada, cronológica y conectada.',
      analogia: 'Imagina una libreta contable comunitaria donde cada página nueva incluye una copia del sello de la página anterior.',
      detalle: 'Cada bloque agrupa un conjunto de transacciones válidas. Al incluir el hash del bloque previo, los bloques forman una cadena indivisible. Si alguien intentara arrancar o modificar una página pasada, la cadena se rompería y todos los participantes notarían la trampa de inmediato.'
    },
    {
      id: 'tema_minero',
      titulo: '¿Qué es un minero?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line><path d="M8 15h8"></path></svg>`,
      resumen: 'Un participante de la red que utiliza potencia de procesamiento para resolver acertijos y validar bloques.',
      analogia: 'Un detective computacional que compite pacíficamente por encontrar la combinación que cierra la caja fuerte.',
      detalle: 'Los mineros no son personas con picos ni palas: son computadoras conectadas a internet dedicadas a ejecutar millones de operaciones matemáticas por segundo para asegurar que la historia de la libreta contable sea compartida y verídica.'
    },
    {
      id: 'tema_hash',
      titulo: '¿Qué es un hash?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>`,
      resumen: 'Una huella digital matemática de longitud fija generada a partir de cualquier cantidad de información.',
      analogia: 'Es como la huella dactilar de un documento: si cambias un solo punto o coma, la huella resultante es 100% diferente.',
      detalle: 'La función criptográfica SHA-256 convierte cualquier texto o archivo en una cadena de 64 caracteres hexadecimales. Es una función de una sola vía: es facilísimo comprobar el resultado, pero matemáticamente imposible adivinar los datos originales partiendo solo del hash.'
    },
    {
      id: 'tema_nonce',
      titulo: '¿Qué es el nonce?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
      resumen: 'Un número comodín que se modifica libremente durante la búsqueda de una solución válida.',
      analogia: 'Es la rueda de números del candado de tu bicicleta que vas girando posición a posición hasta que abre.',
      detalle: 'Viene de "number used once" (número usado una sola vez). Dado que las transacciones y el hash del bloque previo están congelados, el Nonce es el único valor que el procesador puede variar para cambiar el hash resultante y cumplir con la dificultad.'
    },
    {
      id: 'tema_pow',
      titulo: '¿Qué es Proof of Work?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      resumen: 'El mecanismo de consenso donde los participantes demuestran que realizaron un trabajo computacional real.',
      analogia: 'Resolver un crucigrama muy difícil: te toma horas resolverlo, pero a tu profesor le toma solo un vistazo verificar que las palabras están bien puestas.',
      detalle: 'Propuesto en Bitcoin para resolver el problema de cómo lograr que participantes anónimos confíen entre sí sin un banco central. La solución matemática es asimétrica: requiere trillones de intentos encontrarla, pero 1 solo milisegundo verificarla.'
    },
    {
      id: 'tema_dificultad',
      titulo: '¿Qué es la dificultad?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>`,
      resumen: 'La regla impuesta por la red que determina qué tan complicado es encontrar un hash válido.',
      analogia: 'Tirar dados: sacar un 6 en un solo dado es fácil (1 de 6). Sacar cuatro dados en 6 juntos exige miles de tiros.',
      detalle: 'La red mide con qué frecuencia se encuentran los bloques. Si se conectan miles de mineros nuevos y los bloques salen muy rápido, la red aumenta la dificultad exigiendo más ceros iniciales. Así, el tiempo de emisión se mantiene estable.'
    },
    {
      id: 'tema_electricidad',
      titulo: '¿Por qué se consume electricidad?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
      resumen: 'Porque los procesadores ejecutan billones de cálculos por segundo, consumiendo energía real y disipando calor.',
      analogia: 'El motor de un auto de carreras que quema combustible al acelerar al máximo en la pista.',
      detalle: 'El consumo eléctrico no es un error de diseño: es la barrera de seguridad del mundo físico. Para reescribir la historia de una blockchain grande, un atacante necesitaría más plantas eléctricas y computadoras que todos los demás países juntos.'
    },
    {
      id: 'tema_recompensa',
      titulo: '¿Qué es la recompensa?',
      icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
      resumen: 'El incentivo simbólico que las reglas del protocolo otorgan al minero que resuelve y sella el bloque.',
      analogia: 'Una medalla de reconocimiento y una comisión de servicio por haber custodiado la seguridad de la biblioteca escolar.',
      detalle: 'Para que los mineros paguen sus equipos y la cuenta de electricidad honestamente, la red les permite incluir una transacción especial (llamada coinbase) que les otorga monedas nuevas y comisiones por su trabajo.'
    }
  ];

  class AplicacionCriptoLab {
    constructor() {
      this.dom = {};
    }

    iniciar() {
      this.cachearElementosDOM();
      this.inicializarNavegacionPestanas();
      this.inicializarSimuladorLaboratorio();
      this.inicializarSeccionAprende();
      this.inicializarExperimentos();
      this.inicializarEvaluacion();
      this.inicializarAsistente();
      this.inicializarControlesGlobales();

      // Renderizar estado inicial
      window.SimuladorMineria.inicializar();
      this.renderizarCadenaBloques();
      this.actualizarUIConEstado(window.AdminEstado.obtener());

      // Suscribirse a cambios de estado global
      window.AdminEstado.suscribir((nuevoEstado) => {
        this.actualizarUIConEstado(nuevoEstado);
      });
    }

    cachearElementosDOM() {
      this.dom = {
        navEnlaces: document.querySelectorAll('.enlace-nav-pestana'),
        secciones: document.querySelectorAll('.seccion-vista-app'),
        
        // Header
        btnSonido: document.getElementById('btnToggleSonido'),
        indicadorSonido: document.getElementById('ledSonidoHeader'),
        lblProgresoGeneral: document.getElementById('lblProgresoHeader'),

        // Inicio
        btnComenzarSimulacion: document.getElementById('btnInicioComenzar'),
        btnAprenderPrimero: document.getElementById('btnInicioAprender'),

        // Laboratorio - Equipo
        equipoMineroSVG: document.getElementById('svgEquipoMinero'),
        txtEstadoMinero: document.getElementById('txtEstadoMinero'),
        txtHashrate: document.getElementById('telemetriaHashrate'),
        txtIntentos: document.getElementById('telemetriaIntentos'),
        txtTemperatura: document.getElementById('telemetriaTemperatura'),
        txtWatts: document.getElementById('telemetriaWatts'),
        txtKwh: document.getElementById('telemetriaKwh'),
        txtTiempo: document.getElementById('telemetriaTiempo'),
        barraTemp: document.getElementById('barraTemperaturaProgreso'),

        // Laboratorio - Controles
        btnIniciarMinado: document.getElementById('btnIniciarMinero'),
        btnPausarMinado: document.getElementById('btnPausarMinero'),
        btnReiniciarMinado: document.getElementById('btnReiniciarMinero'),
        botonesDificultad: document.querySelectorAll('.btn-dif-selector'),
        botonesHardware: document.querySelectorAll('.btn-hw-selector'),
        txtCondicionDificultad: document.getElementById('txtExplicacionDificultad'),

        // Laboratorio - Proceso
        txtHashActual: document.getElementById('visorHashProceso'),
        txtNonceActual: document.getElementById('visorNonceProceso'),
        listaMempool: document.getElementById('listaMempoolTransacciones'),
        contenedorBlockchain: document.getElementById('visorCadenaBloques'),

        // Modal Recompensa
        modalRecompensa: document.getElementById('modalRecompensaBloque'),
        btnCerrarRecompensa: document.getElementById('btnCerrarModalRecompensa'),
        txtRecompensaDetalle: document.getElementById('txtDetalleRecompensaModal'),

        // Modal Detalle de Bloque
        modalDetalleBloque: document.getElementById('modalDetalleBloque'),
        btnCerrarDetalleBloque: document.getElementById('btnCerrarDetalleBloque'),
        cuerpoDetalleBloque: document.getElementById('cuerpoDetalleBloqueModal'),

        // Asistente
        contenedorAsistente: document.getElementById('contenedorAsistenteDock')
      };
    }

    inicializarNavegacionPestanas() {
      this.dom.navEnlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
          e.preventDefault();
          const destino = enlace.getAttribute('data-pestana');
          this.cambiarPestana(destino);
        });
      });

      if (this.dom.btnComenzarSimulacion) {
        this.dom.btnComenzarSimulacion.addEventListener('click', () => this.cambiarPestana('laboratorio'));
      }
      if (this.dom.btnAprenderPrimero) {
        this.dom.btnAprenderPrimero.addEventListener('click', () => this.cambiarPestana('aprende'));
      }
    }

    cambiarPestana(idDestino) {
      this.dom.navEnlaces.forEach(enl => {
        const activo = enl.getAttribute('data-pestana') === idDestino;
        enl.classList.toggle('activo', activo);
        enl.setAttribute('aria-selected', activo.toString());
      });

      this.dom.secciones.forEach(sec => {
        const activa = sec.id === `vista-${idDestino}`;
        sec.classList.toggle('vista-activa', activa);
        sec.hidden = !activa;
      });

      window.AdminEstado.actualizar({ pestanaActiva: idDestino });

      // Orientación del asistente al cambiar de vista
      if (window.AsistenteLaboratorio) {
        window.AsistenteLaboratorio.establecerMensaje(idDestino);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    inicializarSimuladorLaboratorio() {
      // Botón Iniciar
      this.dom.btnIniciarMinado.addEventListener('click', () => {
        window.SimuladorMineria.iniciar();
        if (window.AsistenteLaboratorio) window.AsistenteLaboratorio.establecerMensaje('laboratorio_minando');
      });

      // Botón Pausar / Reanudar
      this.dom.btnPausarMinado.addEventListener('click', () => {
        const estado = window.AdminEstado.obtener().estadoMinero;
        if (estado === 'minando') {
          window.SimuladorMineria.pausar();
        } else if (estado === 'pausado') {
          window.SimuladorMineria.reanudar();
        }
      });

      // Botón Reiniciar
      this.dom.btnReiniciarMinado.addEventListener('click', () => {
        window.SimuladorMineria.reiniciar();
        this.renderizarCadenaBloques();
        if (window.AsistenteLaboratorio) window.AsistenteLaboratorio.establecerMensaje('laboratorio_inactivo');
      });

      // Selector de dificultad (1, 2, 3 ceros)
      this.dom.botonesDificultad.forEach(btn => {
        btn.addEventListener('click', () => {
          const ceros = parseInt(btn.getAttribute('data-ceros'), 10);
          this.dom.botonesDificultad.forEach(b => b.classList.remove('activo'));
          btn.classList.add('activo');

          window.AdminEstado.actualizar({ dificultad: ceros });
          this.actualizarTextoExplicacionDificultad(ceros);
        });
      });

      // Selector de potencia de hardware (CPU, GPU, ASIC)
      this.dom.botonesHardware.forEach(btn => {
        btn.addEventListener('click', () => {
          const hw = btn.getAttribute('data-hw');
          this.dom.botonesHardware.forEach(b => b.classList.remove('activo'));
          btn.classList.add('activo');

          window.AdminEstado.actualizar({ potenciaHardware: hw });
        });
      });

      // Evento de tick de cálculo en vivo
      window.SimuladorMineria.alTick((datos) => {
        if (this.dom.txtNonceActual) this.dom.txtNonceActual.textContent = datos.nonce;
        if (this.dom.txtHashActual) {
          const dificultad = window.AdminEstado.obtener().dificultad;
          const prefijo = datos.hash.substring(0, dificultad);
          const resto = datos.hash.substring(dificultad);
          const cumple = prefijo === '0'.repeat(dificultad);

          this.dom.txtHashActual.innerHTML = `
            <span class="${cumple ? 'hash-tag-cumple' : 'hash-tag-busca'}">${prefijo}</span><span>${resto}</span>
          `;
        }
      });

      // Evento de éxito al sellar bloque
      window.SimuladorMineria.alEncontrarBloque((bloque) => {
        this.renderizarCadenaBloques();
        this.mostrarModalRecompensa(bloque);
        if (window.AsistenteLaboratorio) window.AsistenteLaboratorio.establecerMensaje('laboratorio_encontrado');
      });

      // Modal de recompensa
      if (this.dom.btnCerrarRecompensa) {
        this.dom.btnCerrarRecompensa.addEventListener('click', () => {
          this.dom.modalRecompensa.classList.remove('modal-activo');
        });
      }

      // Modal de detalle de bloque
      if (this.dom.btnCerrarDetalleBloque) {
        this.dom.btnCerrarDetalleBloque.addEventListener('click', () => {
          this.dom.modalDetalleBloque.classList.remove('modal-activo');
        });
      }

      this.renderizarMempool();
      this.actualizarTextoExplicacionDificultad(window.AdminEstado.obtener().dificultad);
    }

    actualizarTextoExplicacionDificultad(ceros) {
      const textos = {
        1: 'Nivel 1 (Fácil): El hash debe comenzar con 1 cero ("0"). Probabilidad: 1 de cada 16 intentos (~6.2%). Ideal para pruebas rápidas.',
        2: 'Nivel 2 (Intermedio): El hash debe comenzar con 2 ceros ("00"). Probabilidad: 1 de cada 256 intentos (~0.4%). Exige unos segundos de cálculo.',
        3: 'Nivel 3 (Difícil): El hash debe comenzar con 3 ceros ("000"). Probabilidad: 1 de cada 4,096 intentos (~0.024%). Consume notablemente más energía.'
      };
      if (this.dom.txtCondicionDificultad) {
        this.dom.txtCondicionDificultad.innerHTML = textos[ceros] || textos[2];
      }
    }

    renderizarMempool() {
      if (!this.dom.listaMempool) return;
      const mempool = window.GestorBlockchain.mempool;
      this.dom.listaMempool.innerHTML = mempool.map(tx => `
        <li class="item-transaccion-mempool">
          <div class="mempool-tx-info">
            <span class="mempool-participantes"><strong>${tx.de}</strong> → ${tx.para}</span>
            <span class="mempool-txid">${tx.txid}</span>
          </div>
          <span class="mempool-monto">${tx.monto}</span>
        </li>
      `).join('');
    }

    renderizarCadenaBloques() {
      if (!this.dom.contenedorBlockchain) return;
      window.GestorBlockchain.renderizarCadena(this.dom.contenedorBlockchain, (bloqueSeleccionado) => {
        this.mostrarDetalleBloque(bloqueSeleccionado);
      });
    }

    mostrarModalRecompensa(bloque) {
      if (!this.dom.modalRecompensa) return;
      if (this.dom.txtRecompensaDetalle) {
        this.dom.txtRecompensaDetalle.innerHTML = `
          ¡Tu equipo selló con éxito el <strong>Bloque #${bloque.indice}</strong>! Encontraste el Nonce válido <strong>${bloque.nonce}</strong> cumpliendo la condición requerida.
          <br><br>
          En este protocolo educativo, tu taller recibe una recompensa simbólica de <strong>+3.125 EDU-COIN</strong> por haber aportado tu capacidad computacional a la seguridad de la red.
        `;
      }
      this.dom.modalRecompensa.classList.add('modal-activo');
    }

    mostrarDetalleBloque(bloque) {
      if (!this.dom.modalDetalleBloque || !this.dom.cuerpoDetalleBloque) return;
      this.dom.cuerpoDetalleBloque.innerHTML = `
        <div class="bloque-detalle-ficha">
          <div class="fila-detalle"><strong>Número de Bloque:</strong> <span>#${bloque.indice}</span></div>
          <div class="fila-detalle"><strong>Hora de Creación:</strong> <span>${bloque.marcaTiempo || 'Reciente'}</span></div>
          <div class="fila-detalle"><strong>Nonce Encontrado:</strong> <code>${bloque.nonce}</code></div>
          <div class="fila-detalle"><strong>Hash del Bloque:</strong> <code class="hash-largo">${bloque.hash}</code></div>
          <div class="fila-detalle"><strong>Hash Bloque Previo:</strong> <code class="hash-largo">${bloque.hashAnterior}</code></div>
          <div class="fila-detalle"><strong>Dificultad:</strong> <span>${bloque.dificultad || 2} ceros obligatorios</span></div>
          
          <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-turquoise);">Transacciones Incluidas:</h4>
          <ul class="lista-tx-bloque-detalle">
            ${bloque.transacciones.map(t => `
              <li><span>${t.de} → ${t.para}</span> <strong>${t.monto}</strong></li>
            `).join('')}
          </ul>
        </div>
      `;
      this.dom.modalDetalleBloque.classList.add('modal-activo');
    }

    actualizarUIConEstado(estado) {
      // Estado de botones del minero
      const minando = estado.estadoMinero === 'minando';
      const pausado = estado.estadoMinero === 'pausado';

      if (this.dom.btnIniciarMinado) this.dom.btnIniciarMinado.disabled = minando;
      if (this.dom.btnPausarMinado) {
        this.dom.btnPausarMinado.disabled = !minando && !pausado;
        this.dom.btnPausarMinado.textContent = pausado ? 'Reanudar' : 'Pausar';
      }

      // Texto de estado
      if (this.dom.txtEstadoMinero) {
        const etiquetas = {
          inactivo: 'Listo (En reposo)',
          minando: 'Calculando hashes...',
          pausado: 'Pausado',
          encontrado: '¡Bloque Encontrado!'
        };
        this.dom.txtEstadoMinero.textContent = etiquetas[estado.estadoMinero] || 'Inactivo';
        this.dom.txtEstadoMinero.className = `badge-estado-minero estado-${estado.estadoMinero}`;
      }

      // Animación de ventiladores del equipo minero SVG
      if (this.dom.equipoMineroSVG) {
        this.dom.equipoMineroSVG.classList.toggle('equipo-activo', minando);
        this.dom.equipoMineroSVG.classList.toggle('equipo-exito', estado.estadoMinero === 'encontrado');
      }

      // Telemetría
      if (this.dom.txtHashrate) this.dom.txtHashrate.textContent = `${estado.hashrateMedido} H/s`;
      if (this.dom.txtIntentos) this.dom.txtIntentos.textContent = estado.intentos.toLocaleString();
      if (this.dom.txtTemperatura) this.dom.txtTemperatura.textContent = `${estado.temperaturaC} °C`;
      if (this.dom.txtWatts) this.dom.txtWatts.textContent = `${estado.potenciaWatts} W`;
      if (this.dom.txtKwh) this.dom.txtKwh.textContent = `${estado.energiaKwhTotal.toFixed(4)} kWh`;
      if (this.dom.txtTiempo) this.dom.txtTiempo.textContent = `${estado.tiempoTranscurridoSeg}s`;

      // Barra de temperatura
      if (this.dom.barraTemp) {
        const porcentaje = Math.min(100, Math.max(0, ((estado.temperaturaC - 35) / 55) * 100));
        this.dom.barraTemp.style.width = `${porcentaje}%`;
        this.dom.barraTemp.className = `barra-relleno-temp ${estado.temperaturaC > 72 ? 'temp-alta' : estado.temperaturaC > 58 ? 'temp-media' : 'temp-normal'}`;
      }

      // Indicador de progreso general
      if (this.dom.lblProgresoGeneral) {
        const totalTemas = TEMAS_EDUCATIVOS.length;
        const vistos = (estado.progreso && estado.progreso.temasVistos) ? estado.progreso.temasVistos.length : 0;
        const quizListo = estado.progreso && estado.progreso.evaluacionCompletada;
        this.dom.lblProgresoGeneral.textContent = `${vistos}/${totalTemas} temas • ${quizListo ? 'Quiz completado' : 'Quiz pendiente'}`;
      }
    }


    /* ========================================================================
       SECCIÓN C: APRENDE (9 TEMAS EDUCATIVOS OBLIGATORIOS)
       ======================================================================== */
    inicializarSeccionAprende() {
      const contenedor = document.getElementById('rejillaTemasEducativos');
      if (!contenedor) return;

      contenedor.innerHTML = TEMAS_EDUCATIVOS.map(tema => `
        <article class="tarjeta-tema-educativo" id="card-${tema.id}">
          <div class="tema-cabecera">
            <span class="tema-icono-circulo">${tema.icono}</span>
            <h3 class="tema-titulo">${tema.titulo}</h3>
          </div>
          <p class="tema-resumen">${tema.resumen}</p>
          <div class="tema-caja-analogia">
            <span class="etiqueta-analogia">Ejemplo de la vida diaria:</span>
            <p>${tema.analogia}</p>
          </div>
          <button type="button" class="btn-profundizar-tema" data-tema="${tema.id}">
            <span>Profundizar concepto</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </article>
      `).join('');

      // Evento de clic en profundizar
      contenedor.querySelectorAll('.btn-profundizar-tema').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-tema');
          const tema = TEMAS_EDUCATIVOS.find(t => t.id === id);
          if (tema) {
            this.abrirModalTema(tema);
            window.AdminEstado.registrarTemaVisto(id);
          }
        });
      });

      // Botón cerrar modal tema
      const btnCerrar = document.getElementById('btnCerrarModalTema');
      if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
          document.getElementById('modalDetalleTema').classList.remove('modal-activo');
        });
      }
    }

    abrirModalTema(tema) {
      const modal = document.getElementById('modalDetalleTema');
      const titulo = document.getElementById('txtTituloModalTema');
      const cuerpo = document.getElementById('cuerpoModalTema');
      if (!modal || !titulo || !cuerpo) return;

      titulo.textContent = tema.titulo;
      cuerpo.innerHTML = `
        <div class="modal-tema-contenido">
          <div class="modal-tema-icono-grande">${tema.icono}</div>
          <p class="modal-tema-parrafo-resumen">${tema.resumen}</p>
          <div class="modal-tema-analogia-bloque">
            <strong>Analogía cotidiana:</strong>
            <p>${tema.analogia}</p>
          </div>
          <div class="modal-tema-explicacion-completa">
            <h4>Explicación detallada:</h4>
            <p>${tema.detalle}</p>
          </div>
        </div>
      `;
      modal.classList.add('modal-activo');
    }


    /* ========================================================================
       SECCIÓN D: LOS 4 EXPERIMENTOS INTERACTIVOS
       ======================================================================== */
    inicializarExperimentos() {
      // Experimento 1: Cambia un dato (Efecto Avalancha)
      const inputExp1A = document.getElementById('exp1InputA');
      const inputExp1B = document.getElementById('exp1InputB');
      const salidaExp1A = document.getElementById('exp1HashA');
      const salidaExp1B = document.getElementById('exp1HashB');
      const txtDiferenciaBits = document.getElementById('exp1BitsDiff');
      const barraPorcentaje = document.getElementById('exp1BarraDiff');

      const ejecutarExp1 = () => {
        if (!inputExp1A || !inputExp1B) return;
        const res = window.GestorExperimentos.ejecutarExperimento1(inputExp1A.value, inputExp1B.value);
        if (salidaExp1A) salidaExp1A.textContent = res.hashOriginal;
        if (salidaExp1B) salidaExp1B.textContent = res.hashModificado;
        if (txtDiferenciaBits) {
          txtDiferenciaBits.innerHTML = res.sonIdenticos 
            ? `Los textos son idénticos. Hashes exactamente iguales.`
            : `Diferencia: <strong>${res.bitsDiferentes} de 256 bits</strong> cambiaron (~<strong>${res.porcentajeCambio}%</strong> de alteración).`;
        }
        if (barraPorcentaje) {
          barraPorcentaje.style.width = `${res.porcentajeCambio}%`;
        }
      };

      if (inputExp1A && inputExp1B) {
        inputExp1A.addEventListener('input', ejecutarExp1);
        inputExp1B.addEventListener('input', ejecutarExp1);
        ejecutarExp1();
      }

      // Experimento 2: Modifica el Nonce (Búsqueda Manual)
      const inputExp2Nonce = document.getElementById('exp2NonceInput');
      const salidaExp2Hash = document.getElementById('exp2HashSalida');
      const txtExp2Resultado = document.getElementById('exp2ResultadoFeedback');
      const btnExp2Probar = document.getElementById('btnExp2Probar');
      const btnExp2Incrementar = document.getElementById('btnExp2Sumar');

      const ejecutarExp2 = () => {
        if (!inputExp2Nonce) return;
        const nonceVal = parseInt(inputExp2Nonce.value, 10) || 0;
        const res = window.GestorExperimentos.ejecutarExperimento2('BloqueEscolar#101', nonceVal, '0');
        if (salidaExp2Hash) {
          const cumple = res.exito;
          salidaExp2Hash.innerHTML = `
            <span class="${cumple ? 'hash-tag-cumple' : 'hash-tag-busca'}">${res.hash.substring(0, 1)}</span><span>${res.hash.substring(1)}</span>
          `;
        }
        if (txtExp2Resultado) {
          txtExp2Resultado.innerHTML = res.exito
            ? `✅ <strong>¡Logrado!</strong> Con Nonce ${nonceVal}, el hash inicia con "0". Encontraste una solución válida manualmente.`
            : `❌ Inició con "<strong>${res.prefijoObtenido}</strong>". No cumple la condición de iniciar con "0". Prueba otro número.`;
          txtExp2Resultado.className = `feedback-experimento ${res.exito ? 'exito' : 'fallo'}`;
        }
      };

      if (inputExp2Nonce) {
        inputExp2Nonce.addEventListener('input', ejecutarExp2);
        if (btnExp2Probar) btnExp2.addEventListener('click', ejecutarExp2);
        if (btnExp2Incrementar) {
          btnExp2Incrementar.addEventListener('click', () => {
            inputExp2Nonce.value = (parseInt(inputExp2Nonce.value, 10) || 0) + 1;
            ejecutarExp2();
          });
        }
        ejecutarExp2();
      }

      // Experimento 3: Curva de Dificultad
      const contenedorExp3 = document.getElementById('tablaCurvaDificultad');
      if (contenedorExp3) {
        const datosCurva = window.GestorExperimentos.obtenerDatosCurvaDificultad();
        contenedorExp3.innerHTML = datosCurva.map(d => `
          <div class="fila-curva-dificultad">
            <span class="col-ceros"><strong>${d.ceros} cero${d.ceros > 1 ? 's' : ''} ("${'0'.repeat(d.ceros)}")</strong></span>
            <span class="col-prob">${d.probabilidad}</span>
            <div class="col-barra">
              <div class="barra-esfuerzo-visual" style="width: ${Math.min(100, (d.esfuerzoRelativo / 4096) * 100 + 4)}%;"></div>
            </div>
            <span class="col-tiempo">${d.tiempoAproxCPU}</span>
          </div>
        `).join('');
      }

      // Experimento 4: Carrera de Potencia (CPU vs ASIC)
      const btnIniciarCarrera = document.getElementById('btnIniciarCarreraEquipos');
      const txtEstadoCarrera = document.getElementById('txtEstadoCarrera');
      const barraCPU = document.getElementById('barraProgresoCPU');
      const barraASIC = document.getElementById('barraProgresoASIC');
      const txtIntentosCPU = document.getElementById('intentosCPU');
      const txtIntentosASIC = document.getElementById('intentosASIC');

      if (btnIniciarCarrera) {
        btnIniciarCarrera.addEventListener('click', () => {
          btnIniciarCarrera.disabled = true;
          if (txtEstadoCarrera) txtEstadoCarrera.textContent = 'Carrera en marcha: buscando un hash con 2 ceros ("00")...';

          window.GestorExperimentos.iniciarCarreraEquipos(
            2,
            (estadoCarrera) => {
              if (txtIntentosCPU) txtIntentosCPU.textContent = estadoCarrera.equipoCPU.intentos;
              if (txtIntentosASIC) txtIntentosASIC.textContent = estadoCarrera.equipoASIC.intentos;
              if (barraCPU) barraCPU.style.width = `${Math.min(100, (estadoCarrera.equipoCPU.intentos / 300) * 100)}%`;
              if (barraASIC) barraASIC.style.width = `${Math.min(100, (estadoCarrera.equipoASIC.intentos / 300) * 100)}%`;
            },
            (estadoFinal) => {
              btnIniciarCarrera.disabled = false;
              if (txtEstadoCarrera) {
                const gano = estadoFinal.ganador;
                txtEstadoCarrera.innerHTML = `🏁 <strong>¡Ganó el ${gano === 'ASIC' ? 'Equipo ASIC' : 'Equipo CPU'}!</strong> ${gano === 'ASIC' ? 'El ASIC calculó mucho más rápido y encontró la solución primero.' : '¡Sorpresa del azar! La CPU encontró el número ganador en pocos tiros a pesar de su menor velocidad.'}`;
              }
            }
          );
        });
      }
    }


    /* ========================================================================
       SECCIÓN E: RETOS Y EVALUACIÓN DE APRENDIZAJE
       ======================================================================== */
    inicializarEvaluacion() {
      const contenedorQuiz = document.getElementById('cajaPreguntasEvaluacion');
      const btnEnviarQuiz = document.getElementById('btnCalificarEvaluacion');
      const cajaResultados = document.getElementById('cajaResultadosEvaluacion');
      const btnReiniciarQuiz = document.getElementById('btnReiniciarQuiz');

      if (!contenedorQuiz) return;

      const preguntas = window.GestorEvaluacion.obtenerPreguntas();
      contenedorQuiz.innerHTML = preguntas.map((p, idx) => `
        <article class="tarjeta-pregunta-quiz" id="pregunta-box-${p.id}">
          <div class="pregunta-quiz-cabecera">
            <span class="num-pregunta">Pregunta ${idx + 1} de ${preguntas.length}</span>
            <span class="concepto-pregunta">${p.concepto}</span>
          </div>
          <h3 class="pregunta-quiz-texto">${p.pregunta}</h3>
          <div class="opciones-pregunta-lista">
            ${p.opciones.map(op => `
              <label class="opcion-respuesta-label" data-qid="${p.id}" data-opid="${op.id}">
                <input type="radio" name="pregunta_${p.id}" value="${op.id}">
                <span class="opcion-indicador">${op.id.toUpperCase()}</span>
                <span class="opcion-texto">${op.texto}</span>
              </label>
            `).join('')}
          </div>
          <div class="feedback-inmediato-caja" id="feedback-q-${p.id}" style="display: none;"></div>
        </article>
      `).join('');

      // Retroalimentación inmediata al seleccionar opción
      contenedorQuiz.querySelectorAll('.opcion-respuesta-label input').forEach(input => {
        input.addEventListener('change', (e) => {
          const qid = parseInt(e.target.name.replace('pregunta_', ''), 10);
          const opid = e.target.value;
          const res = window.GestorEvaluacion.evaluarRespuesta(qid, opid);

          const boxFeedback = document.getElementById(`feedback-q-${qid}`);
          if (boxFeedback && res) {
            boxFeedback.style.display = 'block';
            boxFeedback.className = `feedback-inmediato-caja ${res.esCorrecta ? 'feedback-correcto' : 'feedback-incorrecto'}`;
            boxFeedback.innerHTML = `
              <strong>${res.esCorrecta ? '✓ ¡Respuesta Correcta!' : '✕ Respuesta Incorrecta'}</strong>
              <p>${res.esCorrecta ? res.explicacion : res.pista}</p>
            `;
          }
        });
      });

      // Botón calificar final
      if (btnEnviarQuiz) {
        btnEnviarQuiz.addEventListener('click', () => {
          const resFinal = window.GestorEvaluacion.obtenerResultadosFinales();
          if (cajaResultados) {
            cajaResultados.style.display = 'block';
            cajaResultados.innerHTML = `
              <div class="tarjeta-resultados-reporte">
                <div class="resultados-cabecera">
                  <span class="insignia-trofeo-svg">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"></path>
                      <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                  </span>
                  <h3>Resultados de tu Evaluación</h3>
                </div>

                <div class="puntuacion-resumen-fila">
                  <div class="puntuacion-gran-numero">
                    <strong>${resFinal.correctas} / ${resFinal.totalPreguntas}</strong>
                    <span>(${resFinal.porcentaje}% de acierto)</span>
                  </div>
                  <div class="estado-aprobacion-texto">
                    ${resFinal.aprobado 
                      ? '<span class="tag-aprobado">¡Aprobado con Distinción!</span>' 
                      : '<span class="tag-repaso">Casi lo logras. Revisa las pistas y vuelve a intentarlo.</span>'}
                  </div>
                </div>

                ${resFinal.insignia ? `
                  <div class="caja-insignia-desbloqueada">
                    <div class="insignia-medalla">🎖️</div>
                    <div class="insignia-textos">
                      <strong>¡Insignia Desbloqueada: ${resFinal.insignia}!</strong>
                      <p>Has demostrado entender los fundamentos de Proof of Work, funciones hash y seguridad en red.</p>
                    </div>
                  </div>
                ` : ''}

                <div class="desglose-conceptos-lista">
                  <h4>Desglose de conceptos evaluados:</h4>
                  <ul>
                    ${resFinal.detalles.map(d => `
                      <li class="${d.acertada ? 'concepto-acertado' : 'concepto-fallado'}">
                        <span>${d.acertada ? '✓' : '•'} ${d.concepto}</span>
                        ${!d.acertada ? `<small>Sugerencia: ${d.pista}</small>` : ''}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            `;
            cajaResultados.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      if (btnReiniciarQuiz) {
        btnReiniciarQuiz.addEventListener('click', () => {
          window.GestorEvaluacion.reiniciarQuiz();
          contenedorQuiz.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
          contenedorQuiz.querySelectorAll('.feedback-inmediato-caja').forEach(b => b.style.display = 'none');
          if (cajaResultados) cajaResultados.style.display = 'none';
        });
      }
    }

    inicializarAsistente() {
      if (this.dom.contenedorAsistente && window.AsistenteLaboratorio) {
        window.AsistenteLaboratorio.inicializar(this.dom.contenedorAsistente);
      }
    }

    inicializarControlesGlobales() {
      // Audio toggle en header
      if (this.dom.btnSonido) {
        this.dom.btnSonido.addEventListener('click', () => {
          const actual = window.AdminEstado.obtener().audioHabilitado;
          const nuevo = !actual;
          window.AdminEstado.actualizar({ audioHabilitado: nuevo });
          if (this.dom.indicadorSonido) {
            this.dom.indicadorSonido.className = `indicador-led ${nuevo ? 'activo-turquesa' : 'inactivo'}`;
          }
        });
      }

      // Atajo de teclado: Barra espaciadora para alternar minería en Laboratorio
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && window.AdminEstado.obtener().pestanaActiva === 'laboratorio') {
          const inputActivo = document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA');
          if (!inputActivo) {
            e.preventDefault();
            const est = window.AdminEstado.obtener().estadoMinero;
            if (est === 'minando') {
              window.SimuladorMineria.pausar();
            } else if (est === 'pausado') {
              window.SimuladorMineria.reanudar();
            } else {
              window.SimuladorMineria.iniciar();
            }
          }
        }
      });
    }
  }

  // Inicialización al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    const app = new AplicacionCriptoLab();
    app.iniciar();
    window.AppLaboratorio = app;
  });
})(window);
