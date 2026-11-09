/**
 * ESTADO GLOBAL Y PERSISTENCIA LOCAL
 * Centraliza las variables de simulación, telemetría y progreso de aprendizaje.
 */
(function(window) {
  'use strict';

  const STORAGE_KEY = 'cripto_simulador_laboratorio_v1';

  const estadoPorDefecto = {
    // Navegación
    pestanaActiva: 'inicio', // 'inicio', 'laboratorio', 'aprende', 'experimentos', 'evaluacion'
    
    // Estado del minero
    estadoMinero: 'inactivo', // 'inactivo', 'minando', 'pausado', 'encontrado'
    dificultad: 2, // 1: fácil ('0'), 2: medio ('00'), 3: difícil ('000')
    potenciaHardware: 'gpu', // 'cpu' (30 H/s), 'gpu' (180 H/s), 'asic' (600 H/s)
    
    // Telemetría en vivo
    intentos: 0,
    nonceActual: 0,
    hashActual: '',
    hashrateMedido: 0,
    tiempoTranscurridoSeg: 0,
    temperaturaC: 38, // 38°C ambiente/idle
    potenciaWatts: 65,
    energiaKwhTotal: 0.0000,
    
    // Cadena de bloques y transacciones
    bloquesMinados: [],
    bloqueEnProceso: null,
    
    // Audio
    audioHabilitado: true,
    
    // Progreso educativo y logros
    progreso: {
      temasVistos: [],
      experimentosEjecutados: [],
      evaluacionCompletada: false,
      puntuacionQuiz: 0,
      insigniaDesbloqueada: false
    }
  };

  class AdministradorEstado {
    constructor() {
      this.estado = this.cargarPersistencia();
      this.suscriptores = [];
    }

    cargarPersistencia() {
      try {
        const guardado = localStorage.getItem(STORAGE_KEY);
        if (guardado) {
          const parseado = JSON.parse(guardado);
          return Object.assign({}, estadoPorDefecto, {
            progreso: Object.assign({}, estadoPorDefecto.progreso, parseado.progreso || {}),
            audioHabilitado: parseado.audioHabilitado !== undefined ? parseado.audioHabilitado : true,
            bloquesMinados: parseado.bloquesMinados || []
          });
        }
      } catch (e) {
        console.warn('No se pudo acceder a localStorage:', e);
      }
      return JSON.parse(JSON.stringify(estadoPorDefecto));
    }

    guardarPersistencia() {
      try {
        const datosAGuardar = {
          progreso: this.estado.progreso,
          audioHabilitado: this.estado.audioHabilitado,
          bloquesMinados: this.estado.bloquesMinados.slice(-10) // Mantener últimos 10 bloques
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(datosAGuardar));
      } catch (e) {
        console.warn('Error al guardar en localStorage:', e);
      }
    }

    obtener() {
      return this.estado;
    }

    actualizar(parciales) {
      Object.assign(this.estado, parciales);
      this.notificar();
    }

    suscribir(callback) {
      this.suscriptores.push(callback);
      return () => {
        this.suscriptores = this.suscriptores.filter(s => s !== callback);
      };
    }

    notificar() {
      for (const cb of this.suscriptores) {
        try {
          cb(this.estado);
        } catch (err) {
          console.error('Error en suscriptor de estado:', err);
        }
      }
    }

    registrarTemaVisto(temaId) {
      if (!this.estado.progreso.temasVistos.includes(temaId)) {
        this.estado.progreso.temasVistos.push(temaId);
        this.guardarPersistencia();
        this.notificar();
      }
    }

    registrarExperimento(expId) {
      if (!this.estado.progreso.experimentosEjecutados.includes(expId)) {
        this.estado.progreso.experimentosEjecutados.push(expId);
        this.guardarPersistencia();
        this.notificar();
      }
    }

    completarQuiz(puntuacion, maximo) {
      this.estado.progreso.evaluacionCompletada = true;
      this.estado.progreso.puntuacionQuiz = puntuacion;
      if (puntuacion >= Math.ceil(maximo * 0.7)) {
        this.estado.progreso.insigniaDesbloqueada = true;
      }
      this.guardarPersistencia();
      this.notificar();
    }

    reiniciarTodo() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      this.estado = JSON.parse(JSON.stringify(estadoPorDefecto));
      this.notificar();
    }
  }

  window.AdminEstado = new AdministradorEstado();
})(window);
