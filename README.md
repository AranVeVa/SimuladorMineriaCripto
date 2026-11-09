# CriptoLab — Simulador Científico de Minería de Criptomonedas

Una aplicación web educativa, interactiva y visualmente cuidada para comprender el mecanismo de consenso **Proof of Work (Prueba de Trabajo)**, la criptografía y la estructura de una **blockchain** desde cero, dirigida a estudiantes de secundaria y preparatoria (14 a 18 años).

---

## 1. Características Principales

- **Diseño Científico Profesional:** Estética de laboratorio tecnológico en tonos petróleo oscuro con acentos en turquesa (`#00F5D4`), verde menta (`#10B981`) y violeta (`#8B5CF6`). Cero plantillas genéricas, cero estética de casino o especulación.
- **Simulador Real de Proof of Work:** Emplea una implementación matemática funcional de SHA-256 en JavaScript. El equipo prueba valores reales de *Nonce* hasta encontrar un hash que cumpla con los ceros exigidos por la dificultad.
- **Telemetría Física Dinámica:** El equipo minero simula calentamiento gradual del chip (°C), consumo eléctrico en Watts, acumulación de energía en kWh y velocidad de procesamiento real en H/s (Hashes por segundo), con ventiladores SVG animados.
- **Cadena de Bloques Visual:** Representación gráfica interactiva de bloques encadenados (Bloque Génesis #0 y bloques minados sucesivamente) con conectores animados y ficha técnica inspeccionable.
- **Sección Educativa Progresiva:** 9 módulos temáticos explicados con analogías cotidianas (crucigramas, candados de bicicleta, dados múltiples, libretas comunitarias).
- **4 Experimentos Prácticos:**
  1. *Efecto Avalancha:* Modificación de texto y cálculo en tiempo real de la diferencia porcentual de bits.
  2. *Búsqueda Manual con Nonce:* Reto manual de adivinanza numérica.
  3. *Curva de Dificultad:* Visualización del crecimiento exponencial del esfuerzo computacional (1 en 16 vs 1 en 65,536).
  4. *Carrera de Potencia:* Competencia en vivo entre una CPU escolar y un ASIC especializado.
- **Cuestionario con Retroalimentación Inmediata:** 6 preguntas conceptuales con pistas pedagógicas, reintentos, desglose de aciertos e insignia de mérito persistente en `localStorage`.
- **Asistente Contextual:** Guía interactiva que orienta al estudiante en cada pantalla.

---

## 2. Estructura del Código

El proyecto está organizado en una arquitectura modular sin dependencias externas:

```
SimuladorMineriaCripto/
├── index.html            # Estructura semántica principal y vistas de pestañas
├── css/
│   └── main.css          # Sistema de diseño, paleta petróleo, componentes y animaciones
├── js/
│   ├── crypto.js         # Motor criptográfico SHA-256 y comparador de bits
│   ├── state.js          # Gestor de estado global y persistencia (localStorage)
│   ├── blockchain.js     # Cadena de bloques, mempool y renderizador SVG de nodos
│   ├── simulation.js     # Bucle de minado Proof of Work y telemetría en tiempo real
│   ├── experiments.js    # Lógica de los 4 bancos de prueba interactivos
│   ├── quiz.js           # Preguntas de evaluación, pistas y cálculo de puntajes
│   ├── assistant.js      # Asistente contextual con mensajes dinámicos
│   └── app.js            # Inicializador, enrutador de pestañas y eventos del DOM
├── DESIGN.md             # Documentación de diseño, paleta cromática y tipografías
└── README.md             # Esta guía académica y de ejecución
```

---

## 3. Guía para el Docente en el Aula (Sesión de 30 a 45 minutos)

### A. Introducción (5 minutos)
Proyecta la pestaña **Inicio** y lee en voz alta la analogía de la libreta escolar:
> *"Una blockchain no es más que una libreta contable que muchas personas comparten. Como no hay un director ni un banco vigilando, usamos matemáticas y energía física para que nadie pueda alterar las páginas pasadas."*

### B. Práctica en el Laboratorio (15 minutos)
1. **Paso 1:** Pide a los alumnos que abran la pestaña **Laboratorio** y dejen la dificultad en **Nivel 1 ("0")**. Pulsen *"Iniciar Minería"*.
   - *Observación:* El bloque se resuelve casi de inmediato (1 a 3 segundos).
2. **Paso 2:** Pídeles que suban la dificultad a **Nivel 3 ("000")**. Pulsen *"Iniciar Minería"*.
   - *Observación:* Miren cómo sube la temperatura del chip hacia los 68–75°C, suben los intentos a miles y los ventiladores giran intensamente.
3. **Paso 3:** Pídeles que cambien el hardware de **CPU** a **ASIC** para ver el aumento drástico en la tasa de hashes por segundo (H/s).

### C. Fase de Experimentación (10 minutos)
Indica a los estudiantes que vayan a la pestaña **Experimentos**:
- En el **Experimento 1**, pídeles que cambien una sola letra del texto y observen que más del 40-50% de los bits del hash cambian por completo (**Efecto Avalancha**).
- En el **Experimento 4**, inicien la carrera de equipos para observar cómo el ASIC suele ganar por volumen, pero la suerte aún puede favorecer a la CPU.

### D. Evaluación Final (10 minutos)
Pide a cada estudiante que complete las 6 preguntas de la pestaña **Evaluación** para obtener su insignia de *Minero Investigador Certificado*.

---

## 4. Preguntas para el Cierre de Clase

1. **¿Por qué un minero no puede predecir qué Nonce ganará?**
   - *Respuesta esperada:* Porque la función hash es impredecible y unidireccional. La única forma es probar números mediante fuerza bruta.
2. **¿Por qué la minería consume energía eléctrica?**
   - *Respuesta esperada:* Porque los procesadores ejecutan millones de cálculos por segundo. Ese costo físico hace que atacar la red sea inviable económicamente.
3. **¿Qué pasa con un bloque si alguien cambia una sola letra de una transacción de hace 3 meses?**
   - *Respuesta esperada:* Su hash cambia drásticamente y ya no coincidirá con el hash que el bloque siguiente tiene guardado, rompiendo la cadena y siendo rechazado por toda la red.

---

## 5. Instrucciones de Ejecución

Tienes dos formas directas de ejecutar la aplicación:

### Opción A: Con el comando de antes (Streamlit)
Si solías ejecutarlo con Streamlit desde la terminal:
```bash
python -m streamlit run app.py
```
*(Si estás en Windows PowerShell y te da un error de codificación, ejecuta primero `$env:PYTHONUTF8=1` o simplemente haz doble clic en el archivo `iniciar.bat`).*

### Opción B: Directo en el navegador (Sin comandos)
- Haz **doble clic en `index.html`** para abrir la aplicación directamente en cualquier navegador (Chrome, Edge, Firefox, Safari). Funciona de forma 100% autónoma y offline.
