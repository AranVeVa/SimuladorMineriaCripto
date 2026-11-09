import streamlit as st
import streamlit.components.v1 as components
import os

# Configuración de página a pantalla completa para el laboratorio interactivo
st.set_page_config(
    page_title="CriptoLab: Simulador de Minería de Criptomonedas",
    page_icon="⛏️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Ocultar barra superior y márgenes innecesarios de Streamlit para una experiencia inmersiva limpia
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding-top: 0rem !important;
            padding-bottom: 0rem !important;
            padding-left: 0rem !important;
            padding-right: 0rem !important;
            max-width: 100% !important;
        }
        iframe {
            border: none !important;
            width: 100% !important;
        }
    </style>
""", unsafe_allow_html=True)

# Ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def cargar_aplicacion_completa():
    """Lee el index.html y embebe el CSS y los scripts JS para ejecutarse limpiamente dentro de Streamlit."""
    index_path = os.path.join(BASE_DIR, "index.html")
    css_path = os.path.join(BASE_DIR, "css", "main.css")
    js_dir = os.path.join(BASE_DIR, "js")

    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Embeber CSS directamente si existe
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()
        html = html.replace(
            '<link rel="stylesheet" href="css/main.css">',
            f'<style>\n{css_content}\n</style>'
        )

    # Lista ordenada de scripts de la arquitectura modular
    archivos_js = [
        "crypto.js",
        "state.js",
        "blockchain.js",
        "simulation.js",
        "experiments.js",
        "quiz.js",
        "assistant.js",
        "app.js"
    ]

    # Reemplazar las etiquetas <script src="js/..."> por <script>código inline</script>
    for script_nombre in archivos_js:
        tag_original = f'<script src="js/{script_nombre}"></script>'
        ruta_script = os.path.join(js_dir, script_nombre)
        if os.path.exists(ruta_script):
            with open(ruta_script, "r", encoding="utf-8") as f:
                js_content = f.read()
            html = html.replace(tag_original, f'<script>\n{js_content}\n</script>')

    return html

# Cargar y renderizar la aplicación interactiva dentro de Streamlit
contenido_app = cargar_aplicacion_completa()
components.html(contenido_app, height=1350, scrolling=True)
