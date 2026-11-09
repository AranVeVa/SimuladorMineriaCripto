/**
 * RETOS Y EVALUACIÓN DE APRENDIZAJE
 * Cuestionario interactivo con retroalimentación inmediata, pistas, puntuación e insignias.
 */
(function(window) {
  'use strict';

  const PREGUNTAS_EVALUACION = [
    {
      id: 1,
      concepto: 'Función del Minero',
      pregunta: '¿Cuál es la función principal de un minero en una red Proof of Work?',
      opciones: [
        { id: 'a', texto: 'Adivinar contraseñas de las cuentas de otros usuarios para robar fondos.', correcta: false },
        { id: 'b', texto: 'Competir por resolver un acertijo matemático para proponer y verificar el siguiente bloque legítimo.', correcta: true },
        { id: 'c', texto: 'Fabricar monedas físicas de oro en un taller tecnológico para distribuirlas.', correcta: false },
        { id: 'd', texto: 'Controlar el precio de mercado de la criptomoneda mediante compras automáticas.', correcta: false }
      ],
      explicacion: '¡Exacto! El minero compite pacíficamente junto a miles de computadoras para verificar transacciones y encontrar un hash válido que asegure el nuevo bloque.',
      pista: 'Recuerda que no hay un banco central: los mineros usan su poder de cómputo para validar que nadie gaste dinero que no tiene.'
    },
    {
      id: 2,
      concepto: 'Función Hash',
      pregunta: '¿Para qué sirve una función criptográfica hash (como SHA-256)?',
      opciones: [
        { id: 'a', texto: 'Para generar una huella digital única y de tamaño fijo a partir de cualquier conjunto de datos.', correcta: true },
        { id: 'b', texto: 'Para comprimir archivos de video y hacer que pesen menos en el disco duro.', correcta: false },
        { id: 'c', texto: 'Para calcular automáticamente el saldo bancario de cada usuario en dólares.', correcta: false },
        { id: 'd', texto: 'Para acelerar la conexión de internet de las computadoras conectadas.', correcta: false }
      ],
      explicacion: '¡Correcto! Una función hash convierte cualquier texto en una cadena hexadecimal fija e irrepetible. Es de una sola vía: fácil de calcular, imposible de revertir.',
      pista: 'Piensa en el hash como una huella dactilar digital: identifica con precisión matemática el contenido exacto de un bloque.'
    },
    {
      id: 3,
      concepto: 'Inmutabilidad y Efecto Avalancha',
      pregunta: '¿Qué sucede si un atacante intenta modificar una sola letra en una transacción de un bloque antiguo?',
      opciones: [
        { id: 'a', texto: 'Nada, la red ignora los errores ortográficos y el bloque sigue siendo válido.', correcta: false },
        { id: 'b', texto: 'El hash del bloque cambia por completo, rompiendo la cadena y provocando que toda la red rechace el fraude.', correcta: true },
        { id: 'c', texto: 'El dinero de la transacción se duplica automáticamente a favor del atacante.', correcta: false },
        { id: 'd', texto: 'La computadora del atacante se apaga permanentemente por sobrecalentamiento.', correcta: false }
      ],
      explicacion: '¡Excelente! Es el llamado "Efecto Avalancha": alterar un solo bit cambia radicalmente el hash del bloque y de todos los bloques posteriores, delatando el intento de trampa al instante.',
      pista: 'Recuerda el Experimento 1: un cambio minúsculo en los datos produce una huella totalmente distinta.'
    },
    {
      id: 4,
      concepto: 'El Nonce',
      pregunta: '¿Qué representa el valor "Nonce" en el proceso de minería?',
      opciones: [
        { id: 'a', texto: 'La cantidad de dinero que el minero cobra por cada hora de trabajo.', correcta: false },
        { id: 'b', texto: 'Un número comodín que el minero modifica libremente hasta que el hash resultante cumple la condición requerida.', correcta: true },
        { id: 'c', texto: 'El nombre de usuario asignado al minero por el creador de la red.', correcta: false },
        { id: 'd', texto: 'La velocidad en gigahertz del procesador que está calculando el bloque.', correcta: false }
      ],
      explicacion: '¡Muy bien! Como los datos de las transacciones están fijos, el Nonce ("number used once") es la única pieza móvil que el minero puede cambiar para probar combinaciones.',
      pista: 'Es el dial de combinación que girabas pacientemente en el laboratorio hasta que los ceros encajaban.'
    },
    {
      id: 5,
      concepto: 'Consumo Energético y Proof of Work',
      pregunta: '¿Por qué la minería Proof of Work consume energía eléctrica física y por qué eso protege a la red?',
      opciones: [
        { id: 'a', texto: 'Consume energía por descuido de los programadores, pero no aporta ninguna seguridad.', correcta: false },
        { id: 'b', texto: 'Porque los cálculos exigen procesadores trabajando intensamente; este costo real hace que atacar la red sea astronómicamente caro e inviable.', correcta: true },
        { id: 'c', texto: 'Porque los mineros necesitan calentar sus casas durante el invierno con las tarjetas gráficas.', correcta: false },
        { id: 'd', texto: 'Porque la red dona la electricidad no usada a los hospitales locales.', correcta: false }
      ],
      explicacion: '¡Exacto! El gasto de energía es el ancla con el mundo físico: demuestra que hubo un esfuerzo real ("Prueba de Trabajo") que nadie puede fingir gratis.',
      pista: 'Si hacer trampa costara 0 watts y tomara 0 segundos, cualquiera podría reescribir la historia sin consecuencias.'
    },
    {
      id: 6,
      concepto: 'Cadena de Bloques (Blockchain)',
      pregunta: '¿Cómo se conectan los bloques entre sí para formar una "cadena"?',
      opciones: [
        { id: 'a', texto: 'Mediante cables USB físicos que unen las computadoras de todos los usuarios.', correcta: false },
        { id: 'b', texto: 'Cada nuevo bloque incluye dentro de su información el hash exacto del bloque anterior.', correcta: true },
        { id: 'c', texto: 'A través de un archivo PDF firmado por un notario público.', correcta: false },
        { id: 'd', texto: 'Porque todos los bloques se guardan con el mismo nombre en una carpeta compartida de Google Drive.', correcta: false }
      ],
      explicacion: '¡Correcto! Cada bloque apunta al hash del bloque anterior. Esto crea una cronología matemáticamente inquebrantable.',
      pista: 'Revisa el visor de bloques: cada tarjeta muestra un campo llamado "Hash Previo".'
    }
  ];

  class GestorEvaluacion {
    constructor() {
      this.preguntas = PREGUNTAS_EVALUACION;
      this.respuestasUsuario = {}; // { preguntaId: opcionId }
      this.intentosPorPregunta = {}; // { preguntaId: cantidadIntentos }
    }

    obtenerPreguntas() {
      return this.preguntas;
    }

    evaluarRespuesta(preguntaId, opcionId) {
      const pregunta = this.preguntas.find(p => p.id === preguntaId);
      if (!pregunta) return null;

      this.respuestasUsuario[preguntaId] = opcionId;
      this.intentosPorPregunta[preguntaId] = (this.intentosPorPregunta[preguntaId] || 0) + 1;

      const opcionSeleccionada = pregunta.opciones.find(o => o.id === opcionId);
      const esCorrecta = opcionSeleccionada ? opcionSeleccionada.correcta : false;

      return {
        esCorrecta,
        explicacion: pregunta.explicacion,
        pista: pregunta.pista,
        esPrimerIntento: this.intentosPorPregunta[preguntaId] === 1
      };
    }

    obtenerResultadosFinales() {
      let correctas = 0;
      const detalles = [];

      this.preguntas.forEach(p => {
        const elegida = this.respuestasUsuario[p.id];
        const opcion = p.opciones.find(o => o.id === elegida);
        const acertada = opcion && opcion.correcta;
        if (acertada) correctas++;

        detalles.push({
          preguntaId: p.id,
          concepto: p.concepto,
          acertada: !!acertada,
          pista: p.pista
        });
      });

      const porcentaje = Math.round((correctas / this.preguntas.length) * 100);
      const aprobado = porcentaje >= 70;

      // Actualizar estado persistente
      window.AdminEstado.completarQuiz(correctas, this.preguntas.length);

      return {
        totalPreguntas: this.preguntas.length,
        correctas,
        porcentaje,
        aprobado,
        insignia: aprobado ? 'Minero Investigador Certificado' : null,
        detalles
      };
    }

    reiniciarQuiz() {
      this.respuestasUsuario = {};
      this.intentosPorPregunta = {};
    }
  }

  window.GestorEvaluacion = new GestorEvaluacion();
})(window);
