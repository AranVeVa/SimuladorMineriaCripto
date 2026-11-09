/**
 * MOTOR CRIPTOGRÁFICO EDUCATIVO — SHA-256
 * Implementación determinista, autónoma y compatible 100% con navegadores offline.
 */
(function(window) {
  'use strict';

  const CryptoEngine = {
    /**
     * Calcula el hash SHA-256 de una cadena de texto de forma síncrona.
     * @param {string} cadenaTexto - Texto de entrada a hashear
     * @returns {string} - Hash hexadecimal en minúsculas de 64 caracteres
     */
    sha256(cadenaTexto) {
      function rotarDerecha(valor, cantidad) {
        return (valor >>> cantidad) | (valor << (32 - cantidad));
      }

      const mathPow = Math.pow;
      const maxWord = mathPow(2, 32);
      let i, j;
      let resultadoHex = '';
      const palabras = [];
      const longitudBits = cadenaTexto.length * 8;
      const hash = [];
      const k = [];
      let contadorPrimos = 0;
      const esCompuesto = {};

      for (let candidato = 2; contadorPrimos < 64; candidato++) {
        if (!esCompuesto[candidato]) {
          for (i = 0; i < 313; i += candidato) {
            esCompuesto[i] = candidato;
          }
          hash[contadorPrimos] = (mathPow(candidato, 0.5) * maxWord) | 0;
          k[contadorPrimos++] = (mathPow(candidato, 1 / 3) * maxWord) | 0;
        }
      }

      cadenaTexto += '\x80';
      while ((cadenaTexto.length % 64) - 56) cadenaTexto += '\x00';
      for (i = 0; i < cadenaTexto.length; i++) {
        j = cadenaTexto.charCodeAt(i);
        if (j >> 8) return '';
        palabras[i >> 2] |= j << ((3 - i) % 4) * 8;
      }
      palabras[palabras.length] = ((longitudBits / maxWord) | 0);
      palabras[palabras.length] = longitudBits;

      for (j = 0; j < palabras.length;) {
        const w = palabras.slice(j, j += 16);
        const hashViejo = hash.slice(0);
        for (i = 0; i < 64; i++) {
          const w15 = w[i - 15], w2 = w[i - 2];
          const a = hash[0], e = hash[4];
          const temp1 = hash[7]
            + (rotarDerecha(e, 6) ^ rotarDerecha(e, 11) ^ rotarDerecha(e, 25))
            + ((e & hash[5]) ^ ((~e) & hash[6]))
            + k[i]
            + (w[i] = (i < 16) ? w[i] : (
                w[i - 16]
                + (rotarDerecha(w15, 7) ^ rotarDerecha(w15, 18) ^ (w15 >>> 3))
                + w[i - 7]
                + (rotarDerecha(w2, 17) ^ rotarDerecha(w2, 19) ^ (w2 >>> 10))
              ) | 0
            );
          const temp2 = (rotarDerecha(a, 2) ^ rotarDerecha(a, 13) ^ rotarDerecha(a, 22))
            + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

          hash[7] = hash[6];
          hash[6] = hash[5];
          hash[5] = hash[4];
          hash[4] = (hash[4] + temp1) | 0;
          hash[3] = hash[2];
          hash[2] = hash[1];
          hash[1] = hash[0];
          hash[0] = ((temp1 + temp2) | 0);
        }
        for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + hashViejo[i]) | 0;
        }
      }

      for (i = 0; i < 8; i++) {
        for (j = 3; j >= 0; j--) {
          const byteValor = (hash[i] >> (j * 8)) & 255;
          resultadoHex += ((byteValor < 16) ? '0' : '') + byteValor.toString(16);
        }
      }
      return resultadoHex;
    },

    /**
     * Comprueba si un hash cumple con el nivel de dificultad especificado (número de ceros iniciales).
     * @param {string} hash - Cadena hexadecimal
     * @param {number} cerosRequeridos - Cantidad de ceros que deben estar al inicio
     * @returns {boolean}
     */
    cumpleDificultad(hash, cerosRequeridos) {
      if (!hash || cerosRequeridos <= 0) return true;
      const prefijoEsperado = '0'.repeat(cerosRequeridos);
      return hash.startsWith(prefijoEsperado);
    },

    /**
     * Calcula la diferencia de bits entre dos hashes para ilustrar el efecto avalancha.
     * @param {string} hashA 
     * @param {string} hashB 
     * @returns {{ bitsDiferentes: number, porcentaje: number }}
     */
    compararDiferenciaBits(hashA, hashB) {
      if (!hashA || !hashB || hashA.length !== 64 || hashB.length !== 64) {
        return { bitsDiferentes: 0, porcentaje: 0 };
      }
      let bitsDiferentes = 0;
      for (let i = 0; i < 64; i++) {
        const valA = parseInt(hashA[i], 16);
        const valB = parseInt(hashB[i], 16);
        let xor = valA ^ valB;
        while (xor > 0) {
          bitsDiferentes += xor & 1;
          xor >>= 1;
        }
      }
      const porcentaje = Math.round((bitsDiferentes / 256) * 100);
      return { bitsDiferentes, porcentaje };
    }
  };

  window.CryptoEngine = CryptoEngine;
})(window);
