import streamlit as st
import time
import hashlib
import pandas as pd
from core.blockchain import Blockchain
from core.graficos import (
    svg_robot_minero,
    svg_sello_hash,
    svg_llave_nonce,
    svg_vagon_bloque,
    svg_candado_seguro,
    svg_candado_roto,
    svg_lupa_detective,
    svg_trofeo_triunfo,
    svg_conector_cadena
)

# Helper para renderizar HTML sin que Markdown lo interprete como bloques de codigo
def render_html(html_content: str):
    lineas = [linea.strip() for linea in html_content.strip().splitlines() if linea.strip()]
    st.markdown("".join(lineas), unsafe_allow_html=True)

# ==============================================================================
# 1. CONFIGURACION DE PAGINA Y ESTILOS VISUALES PASTEL
# ==============================================================================
st.set_page_config(
    page_title="CriptoLab: Simulador Interactivo de Mineria",
    layout="wide",
    initial_sidebar_state="expanded"
)

render_html("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap');

    .stApp {
        background-color: #F8FAFC !important;
        font-family: 'Quicksand', system-ui, -apple-system, sans-serif !important;
        color: #1E293B !important;
    }

    [data-testid="stSidebar"] {
        background-color: #F1F5F9 !important;
        border-right: 2px solid #E2E8F0 !important;
    }

    .block-container {
        padding-top: 1.4rem !important;
        padding-bottom: 2.8rem !important;
    }

    /* Banner Principal de Presentacion */
    .hero-banner {
        background: linear-gradient(135deg, #E0F2FE 0%, #EDE9FE 50%, #FEF3C7 100%);
        border: 2px solid #BAE6FD;
        border-bottom: 5px solid #7DD3FC;
        border-radius: 20px;
        padding: 1.4rem 1.8rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.4rem;
        box-shadow: 0 8px 20px rgba(186, 230, 253, 0.35);
    }
    .hero-title {
        font-size: 1.7rem;
        font-weight: 700;
        color: #0369A1;
        margin: 0 0 0.3rem 0;
    }
    .hero-desc {
        font-size: 0.96rem;
        color: #334155;
        margin: 0;
        line-height: 1.5;
    }

    /* Tarjetas de Conceptos */
    .game-card {
        background-color: #FFFFFF;
        border: 2px solid #E2E8F0;
        border-bottom: 4px solid #CBD5E1;
        border-radius: 18px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 12px rgba(148, 163, 184, 0.07);
        transition: transform 0.15s ease;
    }
    .game-card:hover {
        transform: translateY(-2px);
    }
    .game-card-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.45rem;
    }
    .game-card-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: #1E293B;
    }
    .game-card-body {
        font-size: 0.91rem;
        color: #475569;
        line-height: 1.5;
    }

    /* Tarjetas del Bloque (Ledger) */
    .wagon-card {
        background-color: #FFFFFF;
        border: 2px solid #E2E8F0;
        border-radius: 18px;
        padding: 1.35rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 12px rgba(148, 163, 184, 0.07);
    }
    .wagon-card.valid {
        border-left: 7px solid #34D399;
        border-bottom: 4px solid #A7F3D0;
    }
    .wagon-card.invalid {
        border-left: 7px solid #FB7185;
        border-bottom: 4px solid #FECDD3;
        background-color: #FFF1F2;
    }

    /* Cajas de Hash */
    .hash-display-box {
        font-family: 'Courier New', Courier, monospace;
        background-color: #F1F5F9;
        color: #334155;
        border: 2px dashed #CBD5E1;
        padding: 0.65rem 0.85rem;
        border-radius: 12px;
        font-size: 0.86rem;
        word-break: break-all;
        letter-spacing: 0.5px;
        margin-top: 0.3rem;
        margin-bottom: 0.5rem;
    }
    .zeros-win {
        color: #059669;
        background-color: #DCFCE7;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 6px;
        border: 1px solid #86EFAC;
    }

    /* Badges de Estado */
    .badge-soft {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.28rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.2px;
    }
    .badge-soft.mint {
        background-color: #DCFCE7;
        color: #065F46;
        border: 1.5px solid #86EFAC;
    }
    .badge-soft.rose {
        background-color: #FFE4E6;
        color: #9F1239;
        border: 1.5px solid #FDA4AF;
    }
    .badge-soft.sky {
        background-color: #E0F2FE;
        color: #075985;
        border: 1.5px solid #7DD3FC;
    }
    .badge-soft.amber {
        background-color: #FEF3C7;
        color: #92400E;
        border: 1.5px solid #FCD34D;
    }

    /* Tarjetas de Metricas */
    .score-card {
        background-color: #FFFFFF;
        border: 2px solid #E2E8F0;
        border-bottom: 4px solid #CBD5E1;
        border-radius: 16px;
        padding: 0.85rem;
        text-align: center;
    }
    .score-num {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0284C7;
        margin-bottom: 0.1rem;
    }
    .score-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: #64748B;
        text-transform: uppercase;
    }

    /* Botones */
    div.stButton > button {
        border-radius: 12px !important;
        font-weight: 700 !important;
        border: 2px solid #BAE6FD !important;
        border-bottom: 4px solid #7DD3FC !important;
        padding: 0.5rem 1.1rem !important;
        background-color: #FFFFFF !important;
        color: #0369A1 !important;
        transition: all 0.12s ease !important;
    }
    div.stButton > button:hover {
        transform: translateY(-2px) !important;
        border-bottom: 5px solid #38BDF8 !important;
        background-color: #F0F9FF !important;
    }
    div.stButton > button:active {
        transform: translateY(2px) !important;
        border-bottom: 2px solid #0284C7 !important;
    }

    div.stButton > button[kind="primary"] {
        background-color: #0284C7 !important;
        color: #FFFFFF !important;
        border: 2px solid #0369A1 !important;
        border-bottom: 4px solid #075985 !important;
    }
    div.stButton > button[kind="primary"]:hover {
        background-color: #0369A1 !important;
        border-bottom: 5px solid #0c4a6e !important;
    }
</style>
""")

# ==============================================================================
# 2. ESTADO DE SESION
# ==============================================================================
if "blockchain" not in st.session_state:
    st.session_state.blockchain = Blockchain(dificultad_por_defecto=3)

if "historial_minado" not in st.session_state:
    st.session_state.historial_minado = []

if "bloque_hackeado_backup" not in st.session_state:
    st.session_state.bloque_hackeado_backup = None

if "tx1_val" not in st.session_state:
    st.session_state.tx1_val = "Alex le transfiere 15 CriptoCreditos a Sam"
    st.session_state.tx2_val = "Sam compra un pase de batalla digital por 8 Creditos"
    st.session_state.tx3_val = "Recompensa de red para el minero: 3.125 Creditos"

# ==============================================================================
# 3. BARRA LATERAL: PANEL DE CONTROL
# ==============================================================================
with st.sidebar:
    render_html(f"""
    <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.1rem;">
        {svg_robot_minero(48, 48)}
        <div>
            <h3 style="margin: 0; color: #0369A1; font-weight: 700; font-size: 1.15rem;">Panel de Control</h3>
            <span class="badge-soft sky">Simulador Interactivo</span>
        </div>
    </div>
    """)
    
    st.markdown("#### Ajuste de Dificultad")
    dificultad = st.slider(
        "Ceros requeridos al inicio del Hash:",
        min_value=1,
        max_value=5,
        value=3,
        help="A mayor cantidad de ceros, menor es la probabilidad y mas calculos matematicos debe realizar el procesador."
    )
    
    niveles_info = {
        1: ("Dificultad Baja", "~16 intentos", "Instantaneo (milisegundos)"),
        2: ("Dificultad Media", "~256 intentos", "Fraccion de segundo"),
        3: ("Dificultad Estandar", "~4,096 intentos", "1 a 2 segundos (Recomendado)"),
        4: ("Dificultad Alta", "~65,536 intentos", "3 a 6 segundos de computo"),
        5: ("Dificultad Extrema", "~1,048,576 intentos", "Exige alta capacidad de CPU")
    }
    nombre_dif, intentos_aprox, tiempo_aprox = niveles_info[dificultad]
    
    render_html(f"""
    <div style="background-color: #FFFBEB; border: 2px solid #FDE68A; border-bottom: 4px solid #F59E0B; border-radius: 14px; padding: 0.85rem; margin-bottom: 1rem;">
        <div style="font-weight: 700; color: #B45309; font-size: 0.92rem;">{nombre_dif}</div>
        <div style="font-size: 0.84rem; color: #78350F; margin-top: 0.25rem;">
            Probabilidad de acierto: <b>{intentos_aprox}</b><br>
            Tiempo estimado: <b>{tiempo_aprox}</b>
        </div>
    </div>
    """)
    
    prefijo_esperado = "0" * dificultad
    st.markdown("**Patron objetivo que debe encontrar el algoritmo:**")
    st.code(prefijo_esperado + "...", language="text")
    
    st.divider()
    
    st.markdown("#### Estado Global de la Red")
    es_valida, mensaje_validez = st.session_state.blockchain.es_valida()
    
    if es_valida:
        render_html(f"""
        <div style="display: flex; align-items: center; gap: 0.7rem; background-color: #F0FDF4; border: 1.5px solid #BBF7D0; border-radius: 14px; padding: 0.75rem;">
            {svg_candado_seguro(36, 36)}
            <div>
                <span class="badge-soft mint">Blockchain Valida</span>
                <div style="font-size: 0.78rem; color: #047857; margin-top: 0.2rem;">Todos los bloques y enlaces estan intactos.</div>
            </div>
        </div>
        """)
    else:
        render_html(f"""
        <div style="display: flex; align-items: center; gap: 0.7rem; background-color: #FFF1F2; border: 1.5px solid #FECDD3; border-radius: 14px; padding: 0.75rem;">
            {svg_candado_roto(36, 36)}
            <div>
                <span class="badge-soft rose">Alerta de Seguridad</span>
                <div style="font-size: 0.78rem; color: #BE123C; margin-top: 0.2rem;">{mensaje_validez}</div>
            </div>
        </div>
        """)
        
    st.divider()
    
    if st.button("Reiniciar Simulador al Bloque Genesis", use_container_width=True):
        st.session_state.blockchain = Blockchain(dificultad_por_defecto=dificultad)
        st.session_state.historial_minado = []
        st.session_state.bloque_hackeado_backup = None
        st.rerun()

# ==============================================================================
# 4. BANNER HERO
# ==============================================================================
render_html(f"""
<div class="hero-banner">
    <div>{svg_robot_minero(80, 80)}</div>
    <div>
        <div class="hero-title">CriptoLab: Como Funciona la Mineria de Bitcoin</div>
        <div class="hero-desc">
            Un simulador visual e interactivo para entender como la criptografia SHA-256, 
            el algoritmo Proof of Work y el encadenamiento de datos hacen que una Blockchain sea imposible de falsificar.
        </div>
    </div>
</div>
""")

tab_fase1, tab_fase2, tab_fase3, tab_fase4 = st.tabs([
    "Fase 1: La Huella Digital (SHA-256)",
    "Fase 2: El Desafio de Mineria (Proof of Work)",
    "Fase 3: La Cadena de Bloques (Ledger)",
    "Fase 4: Ciberseguridad e Inmutabilidad"
])

# ==============================================================================
# FASE 1: HASH SHA-256
# ==============================================================================
with tab_fase1:
    st.markdown("### Fase 1: La Huella Digital Criptografica (SHA-256)")
    st.markdown(
        "Antes de hablar de mineria o criptomonedas, debemos entender la herramienta base: la **Funcion Hash SHA-256**. "
        "Un hash es como una **huella digital matematica**. No importa si ingresas una sola letra, una contrasena o un archivo gigante, "
        "el algoritmo siempre genera una cadena unica de exactamente **64 caracteres hexadecimales**."
    )
    
    col_c1, col_c2 = st.columns(2, gap="medium")
    with col_c1:
        render_html(f"""
        <div class="game-card">
            <div class="game-card-header">
                {svg_sello_hash(36, 36)}
                <div class="game-card-title">1. Huella Unica e Irreversible</div>
            </div>
            <div class="game-card-body">
                Es facil calcular el hash a partir de un texto, pero es matematicamente imposible 
                reconstruir el texto original conociendo unicamente el hash. Es una funcion de un solo sentido.
            </div>
        </div>
        """)
        
        render_html(f"""
        <div class="game-card">
            <div class="game-card-header">
                {svg_vagon_bloque(36, 36, valido=True)}
                <div class="game-card-title">2. Estructura de un Bloque</div>
            </div>
            <div class="game-card-body">
                Un bloque es un contenedor digital que almacena transferencias confirmadas, 
                la fecha exacta, el hash del bloque previo y un numero de prueba llamado Nonce.
            </div>
        </div>
        """)

    with col_c2:
        render_html(f"""
        <div class="game-card">
            <div class="game-card-header">
                {svg_llave_nonce(36, 36)}
                <div class="game-card-title">3. El Nonce (Numero de Prueba)</div>
            </div>
            <div class="game-card-body">
                El minero no puede alterar las transacciones ni la fecha. Lo unico que puede modificar libremente 
                es este numero contador (0, 1, 2, 3...) para buscar el hash ganador.
            </div>
        </div>
        """)
        
        render_html(f"""
        <div class="game-card">
            <div class="game-card-header">
                {svg_trofeo_triunfo(36, 36)}
                <div class="game-card-title">4. Consenso Proof of Work</div>
            </div>
            <div class="game-card-body">
                Para evitar que alguien llene la red de bloques basura o falsificados, el protocolo exige 
                demostrar que se invirtio poder de computo real resolviendo el acertijo matematico.
            </div>
        </div>
        """)

    st.divider()
    
    st.markdown("#### Experimenta en Vivo con SHA-256")
    st.caption("Escribe cualquier palabra o frase y observa como cambia su huella digital en tiempo real:")
    
    texto_usuario = st.text_input(
        "Ingresa un texto para calcular su SHA-256:",
        value="Transferencia segura de 50 creditos",
        help="El algoritmo procesa los bytes del texto y genera la salida hexadecimal de forma determinista."
    )
    
    hash_en_vivo = hashlib.sha256(texto_usuario.encode("utf-8")).hexdigest()
    
    render_html(f"""
    <div style="background-color: #F0FDF4; border: 2px solid #BBF7D0; border-radius: 14px; padding: 1.1rem; margin-top: 0.4rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.3rem;">
            {svg_sello_hash(30, 30)}
            <span style="font-weight: 700; color: #166534; font-size: 0.95rem;">Resultado SHA-256 (64 caracteres):</span>
        </div>
        <div class="hash-display-box">{hash_en_vivo}</div>
        <div style="display: flex; gap: 0.5rem;">
            <span class="badge-soft mint">Longitud fija: 256 bits (64 hex)</span>
            <span class="badge-soft sky">Algoritmo determinista</span>
        </div>
    </div>
    """)
    
    st.markdown("#### Demostracion del Efecto Avalancha")
    st.markdown("Compara dos textos que se diferencian unicamente por un solo caracter (un numero o una letra):")
    
    c_av1, c_av2 = st.columns(2)
    with c_av1:
        t_a = st.text_input("Texto A:", value="Pago de 100 dolares a Carlos")
        h_a = hashlib.sha256(t_a.encode("utf-8")).hexdigest()
        render_html(f'<div class="hash-display-box">{h_a}</div>')
    with c_av2:
        t_b = st.text_input("Texto B (con un digito cambiado):", value="Pago de 101 dolares a Carlos")
        h_b = hashlib.sha256(t_b.encode("utf-8")).hexdigest()
        render_html(f'<div class="hash-display-box">{h_b}</div>')
        
    st.info(
        "Observacion clave: Un cambio minimo en la entrada transforma mas del 50% de los bits del hash resultante. "
        "Esto garantiza que nadie pueda alterar un registro sin que sea evidente de inmediato."
    )

# ==============================================================================
# FASE 2: MOTOR DE MINERIA
# ==============================================================================
with tab_fase2:
    st.markdown("### Fase 2: El Motor de Mineria (Proof of Work)")
    st.markdown(
        "Minar no significa resolver ecuaciones algebraicas complejas, sino participar en una **loteria matematica**. "
        "El minero reune transacciones pendientes en la bandeja (**Mempool**) y prueba miles de valores de **Nonce** por segundo "
        "hasta encontrar un hash que comience con la cantidad de ceros definida por la dificultad."
    )
    
    col_taller_izq, col_taller_der = st.columns([1, 1], gap="large")
    
    with col_taller_izq:
        st.markdown("#### 1. Bandeja de Transacciones (Mempool)")
        st.caption("Carga escenarios de prueba o escribe transacciones personalizadas:")
        
        def preset_videojuegos():
            st.session_state.tx1_val = "Alex transfiere 20 monedas por un articulo virtual"
            st.session_state.tx2_val = "Lucas transfiere 5 monedas a la cuenta del equipo"
            st.session_state.tx3_val = "Recompensa de mineria para el procesador: 3.125 monedas"

        def preset_comercio():
            st.session_state.tx1_val = "Tienda Digital recibe 0.05 BTC por una suscripcion"
            st.session_state.tx2_val = "Usuario envia 0.01 BTC a su monedero de ahorros"
            st.session_state.tx3_val = "Recompensa de bloque de red: 3.125 BTC"

        b_c1, b_c2 = st.columns(2)
        with b_c1:
            if st.button("Escenario Videojuegos", use_container_width=True):
                preset_videojuegos()
                st.rerun()
        with b_c2:
            if st.button("Escenario Comercial", use_container_width=True):
                preset_comercio()
                st.rerun()
                
        tx_input1 = st.text_input("Transaccion 1", value=st.session_state.tx1_val)
        tx_input2 = st.text_input("Transaccion 2", value=st.session_state.tx2_val)
        tx_input3 = st.text_input("Transaccion 3 (Recompensa de Minero)", value=st.session_state.tx3_val)
        
        lista_txs = [t.strip() for t in [tx_input1, tx_input2, tx_input3] if t.strip()]
        
        st.markdown("#### 2. Datos del Bloque Candidato")
        siguiente_idx = len(st.session_state.blockchain.cadena)
        ultimo_hash = st.session_state.blockchain.ultimo_bloque.hash_actual
        
        render_html(f"""
        <div style="background-color: #FFFFFF; border: 2px solid #E2E8F0; border-radius: 14px; padding: 0.9rem; margin-bottom: 0.9rem;">
            <div><b>Numero de Bloque:</b> Bloque #{siguiente_idx}</div>
            <div style="margin-top: 0.25rem;"><b>Hash del Bloque Previo:</b> <span style="font-family: monospace; font-size: 0.85rem;">{ultimo_hash[:24]}...</span></div>
            <div style="margin-top: 0.25rem;"><b>Dificultad Configurada:</b> Requiere {dificultad} ceros iniciales ({prefijo_esperado})</div>
        </div>
        """)
        
        boton_activar_mineria = st.button("Iniciar Mineria (Ejecutar Proof of Work)", type="primary", use_container_width=True)

    with col_taller_der:
        st.markdown("#### 3. Resultados de Rendimiento en Tiempo Real")
        
        if boton_activar_mineria:
            if not lista_txs:
                st.error("Debe existir al menos una transaccion activa para empaquetar el bloque.")
            else:
                with st.spinner("El procesador esta calculando hashes iterando el Nonce..."):
                    resultado_minado = st.session_state.blockchain.agregar_bloque(
                        transacciones=lista_txs,
                        dificultad=dificultad
                    )
                
                st.session_state.historial_minado.append({
                    "Bloque": siguiente_idx,
                    "Dificultad": f"{resultado_minado['dificultad']} ceros",
                    "Nonce Ganador": resultado_minado["nonce"],
                    "Intentos Totales": resultado_minado["intentos"],
                    "Tiempo (s)": resultado_minado["tiempo_segundos"],
                    "Hashrate (H/s)": resultado_minado["hashrate"]
                })
                
                render_html(f"""
                <div style="background-color: #ECFDF5; border: 2px solid #A7F3D0; border-bottom: 4px solid #34D399; border-radius: 18px; padding: 1.1rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.1rem;">
                    <div>{svg_trofeo_triunfo(50, 50)}</div>
                    <div>
                        <div style="font-size: 1.1rem; font-weight: 700; color: #065F46;">Bloque #{siguiente_idx} Minado y Validado</div>
                        <div style="font-size: 0.88rem; color: #047857;">Se encontro un Nonce valido que cumple con la restriccion de dificultad.</div>
                    </div>
                </div>
                """)
                
                m_c1, m_c2, m_c3 = st.columns(3)
                with m_c1:
                    render_html(f"""
                    <div class="score-card">
                        <div class="score-num">{resultado_minado['intentos']:,}</div>
                        <div class="score-label">Intentos (Nonce)</div>
                    </div>
                    """)
                with m_c2:
                    render_html(f"""
                    <div class="score-card">
                        <div class="score-num">{resultado_minado['tiempo_segundos']}s</div>
                        <div class="score-label">Tiempo de Computo</div>
                    </div>
                    """)
                with m_c3:
                    render_html(f"""
                    <div class="score-card">
                        <div class="score-num">{resultado_minado['hashrate']:,}</div>
                        <div class="score-label">Hashrate (H/s)</div>
                    </div>
                    """)
                
                hash_logrado = resultado_minado["hash"]
                ceros_logrados = hash_logrado[:dificultad]
                resto_logrado = hash_logrado[dificultad:]
                
                st.markdown("<br>", unsafe_allow_html=True)
                st.markdown("**Hash Valido Encontrado:**")
                render_html(f"""
                <div class="hash-display-box">
                    <span class="zeros-win">{ceros_logrados}</span>{resto_logrado}
                </div>
                """)
                
                render_html(f"""
                <div style="background-color: #FFFBEB; border: 1.5px solid #FDE68A; border-radius: 14px; padding: 0.9rem; margin-top: 0.7rem; font-size: 0.88rem; color: #78350F;">
                    <b>Explicacion:</b> El procesador incremento el Nonce de 0 hasta <b>{resultado_minado['nonce']:,}</b>. 
                    Al llegar a ese valor, la combinacion exacta de datos produjo el prefijo solicitado ({dificultad} ceros). 
                    Cualquier nodo de la red puede verificar esta solucion en un solo milisegundo.
                </div>
                """)
        else:
            render_html(f"""
            <div style="background-color: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 16px; padding: 2rem; text-align: center; color: #64748B;">
                <div style="margin-bottom: 0.7rem;">{svg_llave_nonce(50, 50)}</div>
                <div style="font-weight: 700; font-size: 1rem; color: #334155;">Esperando Orden de Ejecucion</div>
                <div style="font-size: 0.88rem; margin-top: 0.25rem;">Presiona el boton de la izquierda para comenzar a probar combinaciones de Nonce.</div>
            </div>
            """)

    if st.session_state.historial_minado:
        st.divider()
        st.markdown("#### Historial Experimental de Bloques Minados")
        df_hist = pd.DataFrame(st.session_state.historial_minado)
        st.dataframe(df_hist, use_container_width=True, hide_index=True)

# ==============================================================================
# FASE 3: EXPLORADOR DE LA CADENA (LEDGER)
# ==============================================================================
with tab_fase3:
    total_bloques = len(st.session_state.blockchain.cadena)
    st.markdown(f"### Fase 3: La Cadena de Bloques (Ledger Distribuido)")
    st.markdown(
        f"Actualmente la red cuenta con **{total_bloques} bloques confirmados**. "
        "Cada bloque funciona como una pagina sellada de un libro contable. "
        "Observa la relacion directa: el **Hash Actual** de un bloque se almacena de forma identica como el **Hash Anterior** del bloque siguiente. "
        "Este vinculo criptografico es el que forma la cadena inquebrantable."
    )
    
    estado_auditoria = st.session_state.blockchain.auditar_cadena()
    
    for i, bloque_item in enumerate(st.session_state.blockchain.cadena):
        info_b = estado_auditoria[i]
        es_bloque_sano = info_b["es_valido"]
        
        clase_css_vagon = "wagon-card valid" if es_bloque_sano else "wagon-card invalid"
        etiqueta_bloque = "Bloque #0 (Bloque Genesis Fundacional)" if i == 0 else f"Bloque #{bloque_item.indice}"
        badge_estado = '<span class="badge-soft mint">Confirmado e Integro</span>' if es_bloque_sano else '<span class="badge-soft rose">Integridad Comprometida</span>'
        
        render_html(f"""
        <div class="{clase_css_vagon}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem;">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    {svg_vagon_bloque(42, 42, valido=es_bloque_sano)}
                    <div>
                        <h4 style="margin: 0; color: #1E293B; font-size: 1.1rem;">{etiqueta_bloque}</h4>
                        <span style="font-size: 0.82rem; color: #64748B;">Marca de tiempo: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(bloque_item.timestamp))}</span>
                    </div>
                </div>
                <div>{badge_estado}</div>
            </div>
        """)
        
        c_datos, c_sellos = st.columns([1, 1], gap="medium")
        with c_datos:
            st.markdown(f"**Nonce Identificado:** `{bloque_item.nonce:,}`")
            st.markdown("**Contenido de Transacciones:**")
            for tx_texto in bloque_item.transacciones:
                render_html(f"""
                <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.4rem 0.75rem; margin-bottom: 0.3rem; font-size: 0.85rem; color: #334155;">
                    {tx_texto}
                </div>
                """)
        with c_sellos:
            st.markdown("**Hash Previo (Enlace Criptografico):**")
            render_html(f'<div class="hash-display-box">{bloque_item.hash_anterior}</div>')
            
            st.markdown("**Hash Actual de este Bloque:**")
            h_bloque = bloque_item.hash_actual
            num_zeros = len(h_bloque) - len(h_bloque.lstrip('0'))
            if num_zeros > 0:
                h_fmt = f'<span class="zeros-win">{h_bloque[:num_zeros]}</span>{h_bloque[num_zeros:]}'
            else:
                h_fmt = h_bloque
            render_html(f'<div class="hash-display-box">{h_fmt}</div>')
            
            if not es_bloque_sano:
                st.error(f"Inconsistencia: El hash recalculado con los datos actuales es:\n{info_b['hash_calculado']}")

        render_html("</div>")
        
        if i < total_bloques - 1:
            render_html(f"""
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.7rem; padding: 0.5rem 0; color: #64748B; font-weight: 600; font-size: 0.85rem;">
                {svg_conector_cadena(26, 26)}
                <span>Enlace Criptografico: El Hash Actual de arriba esta incrustado en el bloque siguiente</span>
                {svg_conector_cadena(26, 26)}
            </div>
            """)
        else:
            render_html("""
            <div style="text-align: center; padding: 0.5rem; color: #94A3B8; font-size: 0.82rem;">
                Ultimo bloque confirmado en la cadena.
            </div>
            """)

# ==============================================================================
# FASE 4: CIBERSEGURIDAD E INMUTABILIDAD
# ==============================================================================
with tab_fase4:
    st.markdown("### Fase 4: Laboratorio de Ciberseguridad (Prueba de Inmutabilidad)")
    st.markdown(
        "Una duda comun es: *Si la Blockchain es solo un registro digital, por que un atacante no puede entrar a la base de datos "
        "y cambiar una transferencia antigua para regalarse millones de monedas?* "
        "En este laboratorio puedes intentar hackear un bloque pasado y observar la reaccion matematica del sistema."
    )
    
    if len(st.session_state.blockchain.cadena) <= 1:
        render_html(f"""
        <div style="background-color: #FFFBEB; border: 2px solid #FDE68A; border-radius: 16px; text-align: center; padding: 1.8rem;">
            <div style="margin-bottom: 0.5rem;">{svg_lupa_detective(50, 50)}</div>
            <div style="font-weight: 700; color: #92400E; font-size: 1.05rem;">Requisito de Demostracion</div>
            <div style="color: #78350F; font-size: 0.9rem; margin-top: 0.3rem;">
                Ve a la <b>Fase 2: Motor de Mineria</b> y mina al menos 1 o 2 bloques para poder alterar un registro del pasado.
            </div>
        </div>
        """)
    else:
        st.markdown("#### Paso 1: Selecciona el bloque del pasado que deseas alterar")
        
        opciones_bloques = list(range(1, len(st.session_state.blockchain.cadena)))
        bloque_elegido_idx = st.selectbox(
            "Selecciona el bloque a modificar:",
            options=opciones_bloques,
            format_func=lambda idx: f"Bloque #{idx} (Contiene {len(st.session_state.blockchain.cadena[idx].transacciones)} transacciones)"
        )
        
        bloque_atacado = st.session_state.blockchain.cadena[bloque_elegido_idx]
        
        st.markdown(f"**Transaccion legitima almacenada en el Bloque #{bloque_elegido_idx}:**")
        st.code(bloque_atacado.transacciones[0], language="text")
        
        mensaje_falso_infiltrado = st.text_input(
            "Texto fraudulento que el atacante quiere inyectar:",
            value="Atacante desvia 10,000 monedas a su monedero privado"
        )
        
        c_atq1, c_atq2 = st.columns(2)
        with c_atq1:
            if st.button("Aplicar Alteracion Fraudulenta", use_container_width=True):
                if st.session_state.bloque_hackeado_backup is None:
                    st.session_state.bloque_hackeado_backup = {
                        "indice": bloque_elegido_idx,
                        "tx_original": bloque_atacado.transacciones[0]
                    }
                bloque_atacado.transacciones[0] = mensaje_falso_infiltrado
                st.rerun()
                
        with c_atq2:
            if st.button("Restaurar Registro Original", use_container_width=True):
                if st.session_state.bloque_hackeado_backup is not None:
                    idx_restaurar = st.session_state.bloque_hackeado_backup["indice"]
                    st.session_state.blockchain.cadena[idx_restaurar].transacciones[0] = st.session_state.bloque_hackeado_backup["tx_original"]
                    st.session_state.bloque_hackeado_backup = None
                    st.rerun()
                else:
                    st.info("La cadena no contiene alteraciones pendientes.")
        
        st.divider()
        st.markdown("#### Paso 2: Auditoria de Consenso y Deteccion de Fraude")
        
        es_cadena_sana, motivo_auditoria = st.session_state.blockchain.es_valida()
        
        if not es_cadena_sana:
            render_html(f"""
            <div style="background-color: #FFF1F2; border: 2px solid #FECDD3; border-bottom: 4px solid #FB7185; border-radius: 18px; padding: 1.3rem; margin-bottom: 1.1rem;">
                <div style="display: flex; align-items: center; gap: 0.9rem; margin-bottom: 0.75rem;">
                    {svg_candado_roto(44, 44)}
                    <div>
                        <div style="font-size: 1.15rem; font-weight: 700; color: #9F1239;">Fallo Critico de Consenso Detectado</div>
                        <div style="font-size: 0.9rem; color: #BE123C;">{motivo_auditoria}</div>
                    </div>
                </div>
                <div style="background-color: #FFFFFF; border-radius: 12px; padding: 0.9rem; color: #475569; font-size: 0.88rem; line-height: 1.55;">
                    <b>Por que la red rechaza el ataque de inmediato?</b><br>
                    1. Al cambiar el texto, el calculo SHA-256 del bloque cambio radicalmente (Efecto Avalancha).<br>
                    2. El bloque siguiente almacena en su encabezado el hash original, por lo que el enlace criptografico queda roto.<br>
                    3. Todos los nodos independientes de la red verifican la cadena y descartan el bloque adulterado automaticamente.
                </div>
            </div>
            """)
            
            render_html(f"""
            <div style="background-color: #F0F9FF; border: 2px solid #BAE6FD; border-radius: 14px; padding: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    {svg_lupa_detective(36, 36)}
                    <div>
                        <div style="font-weight: 700; color: #0369A1; font-size: 0.95rem;">El Ataque del 51%:</div>
                        <div style="font-size: 0.88rem; color: #0C4A6E; margin-top: 0.15rem;">
                            Para que este fraude tuviera exito en la vida real, el atacante tendria que volver a minar ese bloque 
                            y <b>todos los bloques posteriores</b> mas rapido que toda la red mundial de mineros junta. 
                            Eso requiere una cantidad de energia y hardware imposible de conseguir.
                        </div>
                    </div>
                </div>
            </div>
            """)
        else:
            render_html(f"""
            <div style="background-color: #ECFDF5; border: 2px solid #A7F3D0; border-bottom: 4px solid #34D399; border-radius: 18px; padding: 1.3rem;">
                <div style="display: flex; align-items: center; gap: 0.9rem;">
                    {svg_candado_seguro(40, 40)}
                    <div>
                        <div style="font-size: 1.1rem; font-weight: 700; color: #065F46;">Todos los Bloques y Enlaces son Legitimos</div>
                        <div style="font-size: 0.88rem; color: #047857;">La integridad de la cadena esta verificada matematicamente al 100%.</div>
                    </div>
                </div>
            </div>
            """)
