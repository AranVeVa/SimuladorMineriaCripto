# DESIGN.md — Sistema de Identidad Visual y Arquitectura de Diseño

## 1. Filosofía y Dirección Artística
**Concepto:** *"Centro de Investigación y Laboratorio Científico Interactivo"*.

La interfaz está concebida para transmitir innovación tecnológica, rigor científico y una experiencia de aprendizaje tangible. Se aleja por completo de dos extremos negativos:
1. **No es un casino/dashboard cripto genérico:** No hay gráficos de velas, especulación de precios, neones estridentes ni colores morados saturados de plantilla SaaS.
2. **No es una página de texto plano o rudimentaria:** Emplea una paleta profunda en tonos petróleo y grafito oscuro, iluminada con acentos de precisión en turquesa (`#00F5D4`), verde menta (`#10B981`) y violeta (`#8B5CF6`), con iconografía vectorial consistente (cero emojis como iconos de interfaz) y animaciones de aspas y telemetría física.

---

## 2. Paleta Cromática

```css
:root {
  /* Fondo Oscuro Petrolero y Grafito */
  --bg-deep: #0A1118;            /* Negro azulado petróleo base */
  --bg-surface: #0E1824;         /* Superficie de paneles principales */
  --bg-card: #132233;            /* Tarjetas de laboratorio y módulos */
  --bg-card-hover: #17293D;      /* Elevación suave al interactuar */
  --bg-input: #0B141F;           /* Fondo de visores e inputs numéricos */
  
  /* Bordes Delicados y Estructurales */
  --border-subtle: #1F334A;       /* Borde base de tarjetas */
  --border-medium: #2A4563;       /* Borde activo */
  
  /* Acentos Tecnológicos Funcionales */
  --accent-cyan: #00F5D4;         /* Turquesa: telemetría, hashrate, acciones */
  --accent-cyan-soft: rgba(0, 245, 212, 0.12);
  --accent-mint: #10B981;         /* Verde menta: bloques válidos, recompensas */
  --accent-mint-soft: rgba(16, 185, 129, 0.12);
  --accent-violet: #8B5CF6;       /* Violeta: hashes, dificultad, criptografía */
  --accent-violet-soft: rgba(139, 92, 246, 0.14);
  --accent-amber: #F59E0B;        /* Ámbar: temperatura media, estado pausado */
  --accent-red: #EF4444;          /* Alerta: sobrecalentamiento, fallos */

  /* Textos */
  --text-main: #F1F5F9;           /* Blanco roto de alto contraste (WCAG AAA) */
  --text-muted: #94A3B8;          /* Gris pizarra legible para descripciones */
  --text-soft: #64748B;           /* Gris sutil para microcopy y leyendas */
}
```

---

## 3. Tipografía y Jerarquía Visual

Fuentes cargadas mediante Google Fonts:
1. **Tipografía Principal de UI:** `'Space Grotesk', sans-serif`
   - Geométrica, moderna, con caracteres distintivos y legible en pantallas de alta densidad.
2. **Tipografía Numérica y Criptográfica:** `'JetBrains Mono', monospace`
   - Empleada en hashes SHA-256, números de Nonce, indicadores de hashrate, temperatura y métricas de potencia eléctrica.

---

## 4. Ilustraciones y Elementos Visuales
- **Ilustración del Minero (SVG):** Chasis de rack de laboratorio con dos tarjetas de procesamiento gráfico (GPU) dotadas de ventiladores con aspas giratorias (`@keyframes girarVentilador`) que responden dinámicamente al estado del minero (reposo vs minando).
- **Línea de Tiempo de la Blockchain:** Visor horizontal de bloques con enlaces SVG animados que representan gráficamente cómo cada bloque se encadena mediante el hash previo.
- **Iconografía Profesional:** Todos los iconos son vectores SVG limpios (rectángulos, chips, ondas, candados, matraces, trofeos) evitando el uso de emojis informales en los botones y cabeceras.

---

## 5. Arquitectura por Componentes (Modularidad)
- `index.html`: Estructura semántica de 5 secciones principales accesibles mediante navegación por pestañas (`Inicio`, `Laboratorio`, `Aprende`, `Experimentos`, `Evaluación`).
- `css/main.css`: Sistema de diseño, grid asimétrico, microinteracciones y estilos responsivos.
- `js/crypto.js`: Algoritmo SHA-256 autónomo, comprobación de dificultad y cálculo de diferencia de bits.
- `js/state.js`: Manejo del estado global y persistencia en `localStorage`.
- `js/blockchain.js`: Estructura de bloques enlazados y generación de mempool.
- `js/simulation.js`: Ciclo de cálculo por animación sin congelar la interfaz, telemetría física (temperatura, watts, kWh).
- `js/experiments.js`: 4 bancos de prueba interactivos (Avalancha, Búsqueda manual, Curva de dificultad, Carrera CPU vs ASIC).
- `js/quiz.js`: Cuestionario interactivo con retroalimentación inmediata, pistas y reporte de resultados.
- `js/assistant.js`: Guía contextual con sugerencias automáticas según la sección activa.
- `js/app.js`: Coordinador principal y enlaces de eventos.
