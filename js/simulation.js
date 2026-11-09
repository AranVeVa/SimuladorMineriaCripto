/**
 * SIMULADOR PRINCIPAL DE MINERÍA PROOF OF WORK
 * Controla el ciclo de cálculo matemático SHA-256, telemetría física (temperatura, watts, hashrate)
 * y la animación del equipo de minería.
 */
(function(window) {
  'use strict';

  // Perfiles de hardware educativo
  const PERFILES_HARDWARE = {
    cpu: { nombre: 'CPU Básica (Escolar)', hashrateBase: 35, watts: 75, tempMax: 54 },
    gpu: { nombre: 'GPU Gráfica Gamer', hashrateBase: 190, watts: 230, tempMax: 68 },
    asic: { nombre: 'Equipo ASIC Especializado', hashrateBase: 650, watts: 520, tempMax: 82 }
  };

  class SimuladorMineria {
    constructor() {
      this.activo = false;
      this.pausado = false;
      this.bloqueActual = null;
      this.animacionId = null;
      this.intervaloTelemetriaId = null;
      
      this.tiempoInicioMs = 0;
      this.tiempoAcumuladoSeg = 0;
      this.hashesEnIntervalo = 0;
      this.ultimoMuestreoMs = 0;
      
      this.listenersExito = [];
      this.listenersTick = [];
    }

    inicializar() {
      this.bloqueActual = window.GestorBlockchain.obtenerSiguienteCandidato();
      window.AdminEstado.actualizar({
        bloqueEnProceso: this.bloqueActual,
        intentos: 0,
        nonceActual: 0,
        tiempoTranscurridoSeg: 0,
        estadoMinero: 'inactivo'
      });
    }

    obtenerPerfil() {
      const id = window.AdminEstado.obtener().potenciaHardware || 'gpu';
      return PERFILES_HARDWARE[id] || PERFILES_HARDWARE.gpu;
    }

    iniciar() {
      if (this.activo && !this.pausado) return;

      if (!this.bloqueActual || this.bloqueActual.hash) {
        this.bloqueActual = window.GestorBlockchain.obtenerSiguienteCandidato();
      }

      this.activo = true;
      this.pausado = false;
      this.tiempoInicioMs = performance.now();
      this.ultimoMuestreoMs = performance.now();
      this.hashesEnIntervalo = 0;

      window.AdminEstado.actualizar({
        estadoMinero: 'minando',
        bloqueEnProceso: this.bloqueActual
      });

      this.iniciarCicloCalculo();
      this.iniciarMonitorTelemetria();
    }

    pausar() {
      if (!this.activo || this.pausado) return;
      this.pausado = true;
      if (this.animacionId) cancelAnimationFrame(this.animacionId);
      window.AdminEstado.actualizar({ estadoMinero: 'pausado' });
    }

    reanudar() {
      if (!this.activo || !this.pausado) return;
      this.pausado = false;
      this.tiempoInicioMs = performance.now();
      window.AdminEstado.actualizar({ estadoMinero: 'minando' });
      this.iniciarCicloCalculo();
    }

    reiniciar() {
      this.pausar();
      this.activo = false;
      this.pausado = false;
      if (this.animacionId) cancelAnimationFrame(this.animacionId);
      if (this.intervaloTelemetriaId) clearInterval(this.intervaloTelemetriaId);

      this.bloqueActual = window.GestorBlockchain.obtenerSiguienteCandidato();
      this.tiempoAcumuladoSeg = 0;

      window.AdminEstado.actualizar({
        estadoMinero: 'inactivo',
        intentos: 0,
        nonceActual: 0,
        hashActual: '',
        hashrateMedido: 0,
        tiempoTranscurridoSeg: 0,
        temperaturaC: 38,
        potenciaWatts: 65,
        bloqueEnProceso: this.bloqueActual
      });
    }

    iniciarCicloCalculo() {
      const iterar = (timestamp) => {
        if (!this.activo || this.pausado) return;

        const perfil = this.obtenerPerfil();
        const dificultad = window.AdminEstado.obtener().dificultad || 2;
        
        // Cantidad de hashes calculados en este frame según el perfil
        // Distribución dinámica para mantener ~60 FPS
        const hashesPorFrame = Math.max(1, Math.round(perfil.hashrateBase / 60));

        let encontrado = false;
        let hashGenerado = '';
        let nonceFinal = window.AdminEstado.obtener().nonceActual;

        for (let i = 0; i < hashesPorFrame; i++) {
          nonceFinal++;
          const cadenaInput = window.GestorBlockchain.formatearCadenaBloqueParaHash(this.bloqueActual, nonceFinal);
          hashGenerado = window.CryptoEngine.sha256(cadenaInput);
          this.hashesEnIntervalo++;

          if (window.CryptoEngine.cumpleDificultad(hashGenerado, dificultad)) {
            encontrado = true;
            break;
          }
        }

        const intentosActualizados = window.AdminEstado.obtener().intentos + hashesPorFrame;

        window.AdminEstado.actualizar({
          intentos: intentosActualizados,
          nonceActual: nonceFinal,
          hashActual: hashGenerado
        });

        this.notificarTick({
          nonce: nonceFinal,
          hash: hashGenerado,
          intentos: intentosActualizados
        });

        if (encontrado) {
          this.manejarBloqueEncontrado(nonceFinal, hashGenerado);
        } else {
          this.animacionId = requestAnimationFrame(iterar);
        }
      };

      this.animacionId = requestAnimationFrame(iterar);
    }

    manejarBloqueEncontrado(nonceGanador, hashGanador) {
      this.activo = false;
      this.pausado = false;
      if (this.animacionId) cancelAnimationFrame(this.animacionId);

      // Armamos el bloque final sellado
      const bloqueResuelto = Object.assign({}, this.bloqueActual, {
        nonce: nonceGanador,
        hash: hashGanador,
        dificultad: window.AdminEstado.obtener().dificultad,
        fechaSellado: new Date().toLocaleTimeString('es-MX', { hour12: false })
      });

      // Añadimos a la blockchain oficial
      window.GestorBlockchain.agregarBloque(bloqueResuelto);

      window.AdminEstado.actualizar({
        estadoMinero: 'encontrado',
        hashActual: hashGanador,
        nonceActual: nonceGanador
      });

      // Reproducir sonido de campana de éxito
      this.reproducirSonidoExito();

      // Notificar suscriptores
      for (const listener of this.listenersExito) {
        try {
          listener(bloqueResuelto);
        } catch (err) {
          console.error('Error en listener de bloque encontrado:', err);
        }
      }
    }

    iniciarMonitorTelemetria() {
      if (this.intervaloTelemetriaId) clearInterval(this.intervaloTelemetriaId);

      this.intervaloTelemetriaId = setInterval(() => {
        const ahora = performance.now();
        const deltaMs = ahora - this.ultimoMuestreoMs;
        const perfil = this.obtenerPerfil();
        const estadoActual = window.AdminEstado.obtener().estadoMinero;

        if (estadoActual === 'minando' && deltaMs > 0) {
          // Hashrate real medido
          const hashrate = Math.round((this.hashesEnIntervalo / deltaMs) * 1000);
          this.hashesEnIntervalo = 0;
          this.ultimoMuestreoMs = ahora;
          this.tiempoAcumuladoSeg += (deltaMs / 1000);

          // Simulación de temperatura física con convergencia hacia la tempMax del perfil
          const tempActual = window.AdminEstado.obtener().temperaturaC;
          const deltaTemp = (perfil.tempMax - tempActual) * 0.15;
          const nuevaTemp = Math.min(perfil.tempMax, Math.round(tempActual + deltaTemp));

          // Cálculo de consumo energético acumulado
          const horasTranscurridas = (deltaMs / 1000) / 3600;
          const kwhDelta = (perfil.watts * horasTranscurridas) / 1000;
          const kwhTotal = window.AdminEstado.obtener().energiaKwhTotal + kwhDelta;

          window.AdminEstado.actualizar({
            hashrateMedido: hashrate,
            tiempoTranscurridoSeg: Math.round(this.tiempoAcumuladoSeg),
            temperaturaC: nuevaTemp,
            potenciaWatts: perfil.watts,
            energiaKwhTotal: kwhTotal
          });
        } else if (estadoActual !== 'minando') {
          // En enfriamiento progresivo hacia 38°C
          const tempActual = window.AdminEstado.obtener().temperaturaC;
          if (tempActual > 38) {
            window.AdminEstado.actualizar({
              temperaturaC: Math.max(38, tempActual - 1),
              potenciaWatts: 65,
              hashrateMedido: 0
            });
          }
        }
      }, 500);
    }

    alEncontrarBloque(cb) {
      this.listenersExito.push(cb);
    }

    alTick(cb) {
      this.listenersTick.push(cb);
    }

    notificarTick(datos) {
      for (const fn of this.listenersTick) {
        fn(datos);
      }
    }

    reproducirSonidoExito() {
      if (!window.AdminEstado.obtener().audioHabilitado) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          const retardo = idx * 0.05;
          gain.gain.setValueAtTime(0.12, ctx.currentTime + retardo);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + retardo + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + retardo);
          osc.stop(ctx.currentTime + retardo + 0.65);
        });
      } catch (e) {}
    }
  }

  window.SimuladorMineria = new SimuladorMineria();
})(window);
