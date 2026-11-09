/**
 * MÓDULO DE EXPERIMENTOS INTERACTIVOS DE LABORATORIO
 * Implementa 4 bancos de prueba prácticos para comprobar los principios de la criptografía.
 */
(function(window) {
  'use strict';

  class GestorExperimentos {
    constructor() {
      this.carreraActiva = false;
      this.carreraAnimId = null;
    }

    // =========================================================================
    // EXPERIMENTO 1: CAMBIA UN DATO (EFECTO AVALANCHA)
    // =========================================================================
    ejecutarExperimento1(textoOriginal, textoModificado) {
      const hashA = window.CryptoEngine.sha256(textoOriginal || '');
      const hashB = window.CryptoEngine.sha256(textoModificado || '');
      const dif = window.CryptoEngine.compararDiferenciaBits(hashA, hashB);

      window.AdminEstado.registrarExperimento('exp1_avalancha');

      return {
        hashOriginal: hashA,
        hashModificado: hashB,
        bitsDiferentes: dif.bitsDiferentes,
        porcentajeCambio: dif.porcentaje,
        sonIdenticos: hashA === hashB
      };
    }

    // =========================================================================
    // EXPERIMENTO 2: MODIFICA EL NONCE (BÚSQUEDA MANUAL)
    // =========================================================================
    ejecutarExperimento2(textoBase, nonce, condicionPrefijo = '0') {
      const cadena = `${textoBase}|Nonce:${nonce}`;
      const hash = window.CryptoEngine.sha256(cadena);
      const exito = hash.startsWith(condicionPrefijo);

      window.AdminEstado.registrarExperimento('exp2_nonce');

      return {
        hash,
        exito,
        prefijoObtenido: hash.substring(0, condicionPrefijo.length),
        prefijoEsperado: condicionPrefijo
      };
    }

    // =========================================================================
    // EXPERIMENTO 3: MODIFICA LA DIFICULTAD (CURVA DE ESFUERZO)
    // =========================================================================
    obtenerDatosCurvaDificultad() {
      window.AdminEstado.registrarExperimento('exp3_dificultad');
      return [
        { ceros: 1, probabilidad: '1 en 16', intentosEsperados: 16, esfuerzoRelativo: 1, tiempoAproxCPU: '< 1 segundo' },
        { ceros: 2, probabilidad: '1 en 256', intentosEsperados: 256, esfuerzoRelativo: 16, tiempoAproxCPU: '~4 segundos' },
        { ceros: 3, probabilidad: '1 en 4,096', intentosEsperados: 4096, esfuerzoRelativo: 256, tiempoAproxCPU: '~1.5 minutos' },
        { ceros: 4, probabilidad: '1 en 65,536', intentosEsperados: 65536, esfuerzoRelativo: 4096, tiempoAproxCPU: '~25 minutos' }
      ];
    }

    // =========================================================================
    // EXPERIMENTO 4: CARRERA DE POTENCIA (CPU vs ASIC)
    // =========================================================================
    iniciarCarreraEquipos(dificultadCeros, onTick, onGanador) {
      if (this.carreraActiva) this.detenerCarrera();

      this.carreraActiva = true;
      window.AdminEstado.registrarExperimento('exp4_potencia');

      const estadoCarrera = {
        equipoCPU: { nombre: 'CPU de Aula (25 H/s)', intentos: 0, nonce: 0, hash: '', terminado: false },
        equipoASIC: { nombre: 'ASIC de Taller (300 H/s)', intentos: 0, nonce: 100000, hash: '', terminado: false },
        bloqueTexto: 'Transacción de carrera educativa',
        ganador: null
      };

      const iterarCarrera = () => {
        if (!this.carreraActiva) return;

        // CPU calcula 1 hash por ciclo (~30 H/s aprox en 30-60 FPS)
        for (let c = 0; c < 1; c++) {
          estadoCarrera.equipoCPU.nonce++;
          estadoCarrera.equipoCPU.intentos++;
          const hashCPU = window.CryptoEngine.sha256(`${estadoCarrera.bloqueTexto}-CPU-${estadoCarrera.equipoCPU.nonce}`);
          estadoCarrera.equipoCPU.hash = hashCPU;

          if (window.CryptoEngine.cumpleDificultad(hashCPU, dificultadCeros)) {
            estadoCarrera.ganador = 'CPU';
            this.carreraActiva = false;
            break;
          }
        }

        // ASIC calcula 10 hashes por ciclo (~300 H/s)
        if (this.carreraActiva) {
          for (let a = 0; a < 10; a++) {
            estadoCarrera.equipoASIC.nonce++;
            estadoCarrera.equipoASIC.intentos++;
            const hashASIC = window.CryptoEngine.sha256(`${estadoCarrera.bloqueTexto}-ASIC-${estadoCarrera.equipoASIC.nonce}`);
            estadoCarrera.equipoASIC.hash = hashASIC;

            if (window.CryptoEngine.cumpleDificultad(hashASIC, dificultadCeros)) {
              estadoCarrera.ganador = 'ASIC';
              this.carreraActiva = false;
              break;
            }
          }
        }

        if (onTick) onTick(estadoCarrera);

        if (!this.carreraActiva) {
          if (onGanador) onGanador(estadoCarrera);
        } else {
          this.carreraAnimId = requestAnimationFrame(iterarCarrera);
        }
      };

      this.carreraAnimId = requestAnimationFrame(iterarCarrera);
    }

    detenerCarrera() {
      this.carreraActiva = false;
      if (this.carreraAnimId) cancelAnimationFrame(this.carreraAnimId);
    }
  }

  window.GestorExperimentos = new GestorExperimentos();
})(window);
