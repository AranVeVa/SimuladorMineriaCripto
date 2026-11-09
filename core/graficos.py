"""
Modulo de Graficos e Ilustraciones SVG en Colores Pastel.
Proporciona componentes visuales detallados: monedas doradas, cofres,
diagramas de flujo paso a paso y elementos interactivos sin emojis.
"""
import textwrap

def svg_moneda_cripto(width: int = 50, height: int = 50, valor: str = "BTC") -> str:
    """Moneda de oro criptografico brillante en estilo pastel tridimensional."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Sombra inferior -->
<ellipse cx="50" cy="92" rx="36" ry="7" fill="#CBD5E1" opacity="0.6"/>
<!-- Borde grueso de la moneda (canto 3D) -->
<circle cx="50" cy="52" r="44" fill="#D97706"/>
<circle cx="50" cy="48" r="44" fill="#F59E0B"/>
<circle cx="50" cy="48" r="41" fill="#FBBF24"/>
<!-- Cara frontal con degradado circular -->
<circle cx="50" cy="48" r="37" fill="#FEF08A"/>
<circle cx="50" cy="48" r="33" fill="#FDE047" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3 3"/>
<!-- Simbolo Bitcoin / Cripto central -->
<path d="M44 32V64M40 36H53C56.5 36 59 38 59 41.5C59 44.5 57 46.5 54 47C58 47.5 60.5 50 60.5 53.5C60.5 57.5 57 60 52.5 60H40M48 28V32M54 28V32M48 64V68M54 64V68" stroke="#B45309" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<!-- Brillo en la moneda -->
<path d="M30 32C35 24 45 20 54 22" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.8"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_pila_monedas(width: int = 65, height: int = 65, cantidad: str = "3.125") -> str:
    """Pila de monedas de oro brillante que representa la recompensa del minero."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Moneda 1 (Base) -->
<ellipse cx="50" cy="78" rx="34" ry="11" fill="#D97706"/>
<ellipse cx="50" cy="74" rx="34" ry="11" fill="#FBBF24"/>
<ellipse cx="50" cy="73" rx="29" ry="8.5" fill="#FEF08A"/>
<!-- Moneda 2 (Medio) -->
<ellipse cx="50" cy="62" rx="34" ry="11" fill="#D97706"/>
<ellipse cx="50" cy="58" rx="34" ry="11" fill="#FBBF24"/>
<ellipse cx="50" cy="57" rx="29" ry="8.5" fill="#FEF08A"/>
<!-- Moneda 3 (Superior) -->
<ellipse cx="50" cy="46" rx="34" ry="11" fill="#D97706"/>
<ellipse cx="50" cy="42" rx="34" ry="11" fill="#FBBF24"/>
<ellipse cx="50" cy="41" rx="29" ry="8.5" fill="#FEF08A"/>
<!-- Simbolo B en la moneda superior -->
<path d="M46 36V46M43 38H49C51 38 52 39 52 40.5C52 42 51 43 49 43H43M49 43C51.5 43 53 44 53 45.5C53 47 51.5 48 49 48H43" stroke="#B45309" stroke-width="2.2" stroke-linecap="round"/>
<!-- Destello magico superior -->
<path d="M78 22L80 27L85 28L81 32L82 37L78 34L74 37L75 32L71 28L76 27L78 22Z" fill="#FDE047"/>
<circle cx="24" cy="38" r="3" fill="#FDE047"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_mempool_bandeja(width: int = 60, height: int = 60) -> str:
    """Bandeja de transacciones pendientes (Mempool) con cartas y sobres flotantes."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Bandeja contenedor -->
<rect x="15" y="45" width="70" height="42" rx="10" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="3"/>
<path d="M15 62H85" stroke="#BAE6FD" stroke-width="2"/>
<!-- Sobre/Transaccion 1 atras -->
<rect x="25" y="16" width="36" height="24" rx="5" fill="#FEF3C7" stroke="#FDE68A" stroke-width="2" transform="rotate(-8 25 16)"/>
<!-- Sobre/Transaccion 2 principal -->
<rect x="36" y="24" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#38BDF8" stroke-width="2.5"/>
<path d="M38 27L58 41L78 27" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="58" cy="41" r="3" fill="#38BDF8"/>
<!-- Mini moneda en la bandeja -->
<circle cx="34" cy="72" r="7" fill="#FBBF24"/>
<circle cx="34" cy="72" r="5" fill="#FEF08A"/>
<!-- Destello -->
<circle cx="70" cy="72" r="4" fill="#38BDF8"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_robot_minero(width: int = 70, height: int = 70) -> str:
    """Robot explorador con casco minero en tonos pastel celestes y dorados."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="47" y="10" width="6" height="12" rx="3" fill="#93C5FD"/>
<circle cx="50" cy="8" r="7" fill="#FDE047"/>
<path d="M22 42C22 26 34 18 50 18C66 18 78 26 78 42H22Z" fill="#FBBF24"/>
<ellipse cx="50" cy="42" rx="30" ry="6" fill="#F59E0B"/>
<circle cx="50" cy="30" r="6" fill="#FEF08A"/>
<rect x="25" y="44" width="50" height="34" rx="10" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="3"/>
<rect x="33" y="52" width="34" height="16" rx="6" fill="#0284C7"/>
<circle cx="42" cy="60" r="3.5" fill="#BAE6FD"/>
<circle cx="58" cy="60" r="3.5" fill="#BAE6FD"/>
<circle cx="31" cy="66" r="3" fill="#F472B6" opacity="0.6"/>
<circle cx="69" cy="66" r="3" fill="#F472B6" opacity="0.6"/>
<path d="M46 71C48 73 52 73 54 71" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
<rect x="44" y="78" width="12" height="6" rx="2" fill="#94A3B8"/>
<path d="M30 84H70L66 98H34L30 84Z" fill="#BAE6FD" stroke="#7DD3FC" stroke-width="2"/>
<circle cx="50" cy="91" r="3" fill="#38BDF8"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_sello_hash(width: int = 55, height: int = 55) -> str:
    """Sello digital en tonos lavanda y menta."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="40" cy="40" r="36" fill="#EDE9FE" stroke="#C4B5FD" stroke-width="3"/>
<circle cx="40" cy="40" r="28" fill="#DDD6FE" stroke="#A78BFA" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M40 24L43.5 33.5L53 35L45.5 41.5L48 51L40 45.5L32 51L34.5 41.5L27 35L36.5 33.5L40 24Z" fill="#FBBF24"/>
<circle cx="40" cy="40" r="4" fill="#F59E0B"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_llave_nonce(width: int = 55, height: int = 55) -> str:
    """Llave dorada o dado de combinaciones en colores pastel."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="14" y="14" width="52" height="52" rx="14" fill="#FEF3C7" stroke="#FDE68A" stroke-width="3"/>
<circle cx="28" cy="28" r="5" fill="#F59E0B"/>
<circle cx="52" cy="28" r="5" fill="#F59E0B"/>
<circle cx="40" cy="40" r="6" fill="#D97706"/>
<circle cx="28" cy="52" r="5" fill="#F59E0B"/>
<circle cx="52" cy="52" r="5" fill="#F59E0B"/>
<path d="M60 12L62 18L68 20L62 22L60 28L58 22L52 20L58 18L60 12Z" fill="#FDE047"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_vagon_bloque(width: int = 60, height: int = 60, valido: bool = True) -> str:
    """Bloque de construcción / vagón digital en tonos pastel."""
    color_fondo = "#E0F2FE" if valido else "#FFE4E6"
    color_borde = "#7DD3FC" if valido else "#FDA4AF"
    color_acento = "#0284C7" if valido else "#E11D48"
    color_rueda = "#94A3B8"
    
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12" y="20" width="66" height="44" rx="12" fill="{color_fondo}" stroke="{color_borde}" stroke-width="3"/>
<path d="M12 40H78" stroke="{color_borde}" stroke-width="2"/>
<circle cx="28" cy="31" r="5.5" fill="#FFFFFF" stroke="{color_borde}" stroke-width="2"/>
<circle cx="45" cy="31" r="5.5" fill="#FFFFFF" stroke="{color_borde}" stroke-width="2"/>
<circle cx="62" cy="31" r="5.5" fill="#FFFFFF" stroke="{color_borde}" stroke-width="2"/>
<path d="M4 42H12" stroke="{color_acento}" stroke-width="4" stroke-linecap="round"/>
<circle cx="4" cy="42" r="3.5" fill="{color_acento}"/>
<path d="M78 42H86" stroke="{color_acento}" stroke-width="4" stroke-linecap="round"/>
<circle cx="86" cy="42" r="3.5" fill="{color_acento}"/>
<circle cx="28" cy="67" r="8" fill="{color_rueda}" stroke="#64748B" stroke-width="2"/>
<circle cx="28" cy="67" r="3" fill="#FFFFFF"/>
<circle cx="62" cy="67" r="8" fill="{color_rueda}" stroke="#64748B" stroke-width="2"/>
<circle cx="62" cy="67" r="3" fill="#FFFFFF"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_candado_seguro(width: int = 50, height: int = 50) -> str:
    """Candado cerrado seguro en verde menta pastel."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 32V24C22 16.8 27.8 11 35 11C42.2 11 48 16.8 48 24V32" stroke="#34D399" stroke-width="5" stroke-linecap="round"/>
<rect x="14" y="30" width="42" height="32" rx="10" fill="#DCFCE7" stroke="#86EFAC" stroke-width="3"/>
<circle cx="35" cy="43" r="4" fill="#059669"/>
<path d="M33 45L34 53H36L37 45Z" fill="#059669"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_candado_roto(width: int = 50, height: int = 50) -> str:
    """Candado abierto de advertencia en rosa pastel."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 26V18C22 10.8 27.8 5 35 5C41 5 46 9.2 47.6 15" stroke="#FB7185" stroke-width="5" stroke-linecap="round"/>
<rect x="14" y="30" width="42" height="32" rx="10" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="3"/>
<circle cx="35" cy="43" r="4" fill="#E11D48"/>
<path d="M33 45L34 53H36L37 45Z" fill="#E11D48"/>
<path d="M30 36L40 50M40 36L30 50" stroke="#F43F5E" stroke-width="3" stroke-linecap="round"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_lupa_detective(width: int = 55, height: int = 55) -> str:
    """Lupa de detective en color melocotón pastel."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="34" cy="34" r="22" fill="#E0F2FE" stroke="#F472B6" stroke-width="6"/>
<circle cx="34" cy="34" r="16" fill="#F0FDF4" opacity="0.6"/>
<path d="M50 50L68 68" stroke="#FB7185" stroke-width="7" stroke-linecap="round"/>
<path d="M24 24C28 20 36 20 40 22" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_trofeo_triunfo(width: int = 60, height: int = 60) -> str:
    """Copa de logro en amarillo y crema pastel."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 18H58V36C58 45.9 49.9 54 40 54C30.1 54 22 45.9 22 36V18Z" fill="#FEF3C7" stroke="#FCD34D" stroke-width="3"/>
<path d="M22 24H14C11.8 24 10 25.8 10 28V32C10 37.5 14.5 42 20 42H23" stroke="#FCD34D" stroke-width="3" stroke-linecap="round"/>
<path d="M58 24H66C68.2 24 70 25.8 70 28V32C70 37.5 65.5 42 60 42H57" stroke="#FCD34D" stroke-width="3" stroke-linecap="round"/>
<path d="M40 26L42 31L47 32L43 35.5L44.5 40.5L40 37.5L35.5 40.5L37 35.5L33 32L38 31L40 26Z" fill="#F59E0B"/>
<rect x="36" y="54" width="8" height="10" fill="#FDE68A"/>
<rect x="26" y="64" width="28" height="8" rx="4" fill="#F59E0B"/>
</svg>"""
    return textwrap.dedent(svg).strip()

def svg_conector_cadena(width: int = 40, height: int = 40) -> str:
    """Eslabón conector de cadena en tono menta suave."""
    svg = f"""<svg width="{width}" height="{height}" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="8" width="14" height="34" rx="7" fill="none" stroke="#6EE7B7" stroke-width="4"/>
<rect x="26" y="8" width="14" height="34" rx="7" fill="none" stroke="#6EE7B7" stroke-width="4"/>
<path d="M17 25H33" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
</svg>"""
    return textwrap.dedent(svg).strip()
