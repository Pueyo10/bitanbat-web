"""Genera el PDF de tarifas de BitanBat (A4) con la identidad de la marca.

Para cambiar precios o textos, edita SECCIONES / CLASE_SUELTA y ejecuta:
    python scripts/tarifas.py

Tipografias: Poppins (titulos y precios) y Lato (texto), ambas libres (OFL)
y copiadas en scripts/fonts para que el generador sea autonomo.
"""

from pathlib import Path

import fitz
from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
FUENTES = Path(__file__).resolve().parent / "fonts"
LOGO = RAIZ / "cartel-recepcion" / "fuente" / "logo-gold.png"
DEST = RAIZ / "bitanbat-web" / "public" / "media" / "tarifas"
NOMBRE = "tarifas-2026-2027"

# ----------------------------------------------------------------- marca
INK = "#12100E"
GOLD = "#C9A96E"
TEXT = "#1C1A17"
MUTED = "#6B6459"
LINE = "#E6E1D8"
ROW_ALT = "#FBF9F5"
HEAD_BG = "#F3EFE7"

DISPLAY = ("disp", FUENTES / "Poppins-Bold.ttf")
BOLD = ("latob", FUENTES / "Lato-Bold.ttf")
REG = ("lato", FUENTES / "Lato-Regular.ttf")

W, H = 595.28, 841.89
MARGEN = 38.0

# ----------------------------------------------------------------- datos
SECCIONES = [
    {
        "titulo": "DANTZA · HAURRAK ETA GAZTIAK",
        "subtitulo": "Infantil y juvenil",
        "cols": ("DISCIPLINA", "DURACIÓN SEMANAL"),
        "filas": [
            ("PREDANTZA", "1 hora a la semana", "35"),
            ("URBANO (infantil)", "1 hora a la semana", "38"),
            ("URBANO INTENTSIBOA", "1 h 15 min a la semana", "42"),
        ],
    },
    {
        "titulo": "DANTZA GENERALA · HELDUAK",
        "subtitulo": "Salsa, Bachata, Sevillanas, FitGipsy… Packs acumulativos y combinables entre disciplinas de adultos",
        "cols": ("HORAS A LA SEMANA", "DESCRIPCIÓN"),
        "filas": [
            ("1 hora a la semana", "Clase de 1 hora semanal (ej. Salsa, Bachata o Sevillanas)", "40"),
            ("1,5 horas a la semana", "Clase intensiva de 1 hora y 30 minutos", "48"),
            ("2 horas a la semana (Pack 2)", "Combo de 2 clases semanales de 1 hora", "64"),
            ("2,5 horas a la semana", "1 clase de 1,5 h + 1 clase de 1 h", "72"),
            ("3 horas a la semana (Pack 3)", "Combo de 3 clases semanales de 1 hora", "85"),
        ],
    },
    {
        "titulo": "FITNESS CON APP",
        "subtitulo": "BarreFit, Pilates, Fusión & Ritmo, Funcional… Reservas flexibles desde la aplicación móvil",
        "cols": ("MODALIDAD", "RESERVA POR APP"),
        "filas": [
            ("4 clases al mes", "Aprox. 1 clase a la semana por App", "40"),
            ("6 clases al mes", "Aprox. 1-2 clases a la semana por App", "51"),
            ("8 clases al mes", "Aprox. 2 clases a la semana por App", "58"),
            ("12 clases al mes", "Aprox. 3 clases a la semana por App", "69"),
            ("CLASES ILIMITADAS", "Acceso libre ilimitado a las disciplinas de Fitness", "90"),
        ],
    },
    {
        "titulo": "FITNESS BEREZIAK",
        "subtitulo": "Clases fijas, independientes de la App",
        "cols": ("DISCIPLINA", ""),
        "filas": [
            ("BUNGEE", "", "40"),
            ("TOTAL BODY", "", "58"),
        ],
    },
    {
        "titulo": "YOGA",
        "subtitulo": None,
        "cols": ("TIPO", ""),
        "filas": [
            ("Público general", "", "42"),
            ("Ikasleak / Alumnos", "", "38"),
        ],
    },
]

CLASE_SUELTA = {
    "titulo": "CLASE SUELTA · 1 KLASEA SOLTEA",
    "precio": "12",
    "texto": [
        "Abierta a cualquier persona: no hace falta usar la App ni tener bono.",
        "Válida para todas las disciplinas: danza, fitness, bungee, total body y yoga.",
        "Clase puntual, sin compromiso ni matrícula.",
    ],
}

PIE = (
    "Las cuotas indicadas son mensuales.   ·   Las reservas de Fitness se gestionan "
    "desde la aplicación móvil.   ·   Curso 2026-2027."
)
PIE_MARCA = "bitanbat.com   ·   @bitanbat_   ·   747 436 503"


# ----------------------------------------------------------------- utiles
_cache = {}


def fuente(f):
    if f[0] not in _cache:
        _cache[f[0]] = fitz.Font(fontfile=str(f[1]))
    return _cache[f[0]]


def ancho_texto(s, f, size):
    return fuente(f).text_length(s, fontsize=size)


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def texto(page, x, y, s, size=9, f=REG, color=TEXT):
    page.insert_text(
        (x, y), s, fontname=f[0], fontfile=str(f[1]), fontsize=size, color=rgb(color)
    )


def texto_dcha(page, x, y, s, size=9, f=REG, color=TEXT):
    texto(page, x - ancho_texto(s, f, size), y, s, size, f, color)


def texto_centro(page, cx, y, s, size=9, f=REG, color=TEXT):
    texto(page, cx - ancho_texto(s, f, size) / 2, y, s, size, f, color)


def ajustar(s, f, size, ancho):
    if ancho_texto(s, f, size) <= ancho:
        return s
    while s and ancho_texto(s + "…", f, size) > ancho:
        s = s[:-1]
    return s + "…"


def precio(page, x_der, y, valor, size_num=13, size_eur=9):
    """Escribe '00 €' alineado a la derecha, con el € en dorado."""
    eur = " €"
    we = ancho_texto(eur, DISPLAY, size_eur)
    texto_dcha(page, x_der - we, y, valor, size_num, DISPLAY, TEXT)
    texto_dcha(page, x_der, y, eur, size_eur, DISPLAY, GOLD)


def logo_ratio():
    im = Image.open(LOGO).convert("RGBA")
    bbox = im.split()[-1].getbbox() or (0, 0, im.width, im.height)
    return (bbox[2] - bbox[0]) / (bbox[3] - bbox[1])


# ----------------------------------------------------------------- dibujo
def construir(pdf):
    doc = fitz.open()
    page = doc.new_page(width=W, height=H)
    x0, x1 = MARGEN, W - MARGEN
    ancho = x1 - x0
    COL2 = x0 + 170  # inicio de la columna descriptiva

    # ---------- cabecera ----------
    cab_h = 116.0
    page.draw_rect(fitz.Rect(0, 0, W, cab_h), color=None, fill=rgb(INK))
    page.draw_rect(fitz.Rect(0, cab_h, W, cab_h + 2.6), color=None, fill=rgb(GOLD))

    # el logo ya incluye el nombre y "dantza & fitness": solo se anade la localidad
    lh = 50.0
    lw = lh * logo_ratio()
    page.insert_image(
        fitz.Rect(x0, 22, x0 + lw, 22 + lh), filename=str(LOGO), keep_proportion=True
    )
    texto_centro(page, x0 + lw / 2, 86, "HERNANI · GIPUZKOA", 6.4, REG, GOLD)

    texto_dcha(page, x1, 48, "TASAK / TARIFAS", 20, DISPLAY, "#FFFFFF")
    texto_dcha(page, x1, 68, "2026 · 2027", 12, DISPLAY, GOLD)
    texto_dcha(page, x1, 86, "Cuotas mensuales por disciplina y modalidad", 7.6, REG, "#ADA598")

    y = cab_h + 30

    # ---------- secciones ----------
    FILA_H = 17.4
    for sec in SECCIONES:
        page.draw_rect(fitz.Rect(x0, y - 8.4, x0 + 3.2, y + 2.4), color=None, fill=rgb(GOLD))
        texto(page, x0 + 11, y, sec["titulo"], 10.5, DISPLAY, TEXT)
        y += 11
        if sec["subtitulo"]:
            texto(page, x0 + 11, y, ajustar(sec["subtitulo"], REG, 7.4, ancho - 14), 7.4, REG, MUTED)
            y += 10
        y += 4

        # secciones sin columna descriptiva: solo disciplina y precio
        con_desc = any(f[1] for f in sec["filas"])

        page.draw_rect(fitz.Rect(x0, y, x1, y + 14.5), color=None, fill=rgb(HEAD_BG))
        texto(page, x0 + 10, y + 9.9, sec["cols"][0], 6.5, BOLD, MUTED)
        if con_desc:
            texto(page, COL2, y + 9.9, sec["cols"][1], 6.5, BOLD, MUTED)
        texto_dcha(page, x1 - 10, y + 9.9, "CUOTA / MES", 6.5, BOLD, MUTED)
        y += 14.5

        for i, (a, b, val) in enumerate(sec["filas"]):
            if i % 2 == 1:
                page.draw_rect(fitz.Rect(x0, y, x1, y + FILA_H), color=None, fill=rgb(ROW_ALT))
            base = y + FILA_H / 2 + 3.2
            limite = (COL2 - x0 - 20) if con_desc else (x1 - x0 - 80)
            texto(page, x0 + 10, base, ajustar(a, BOLD, 8.4, limite), 8.4, BOLD, TEXT)
            if b:
                texto(page, COL2, base, ajustar(b, REG, 8.0, x1 - COL2 - 62), 8.0, REG, MUTED)
            precio(page, x1 - 10, base + 0.6, val)
            y += FILA_H
            page.draw_line((x0, y), (x1, y), color=rgb(LINE), width=0.5)

        y += 16

    # ---------- clase suelta ----------
    caja_h = 64.0
    page.draw_rect(
        fitz.Rect(x0, y, x1, y + caja_h), color=rgb(GOLD), fill=rgb("#FCF8F0"), width=0.9
    )
    page.draw_rect(fitz.Rect(x0, y, x0 + 3.6, y + caja_h), color=None, fill=rgb(GOLD))

    texto(page, x0 + 17, y + 22, CLASE_SUELTA["titulo"], 10.5, DISPLAY, TEXT)
    ty = y + 38
    for linea in CLASE_SUELTA["texto"]:
        texto(page, x0 + 17, ty, ajustar(linea, REG, 7.8, ancho - 135), 7.8, REG, MUTED)
        ty += 10.5

    precio(page, x1 - 19, y + 40, CLASE_SUELTA["precio"], 26, 13)
    texto_dcha(page, x1 - 19, y + 52, "por clase", 7, REG, MUTED)

    y += caja_h

    # ---------- pie ----------
    pie_y = H - 36
    page.draw_line((x0, pie_y - 15), (x1, pie_y - 15), color=rgb(LINE), width=0.5)
    texto_centro(page, W / 2, pie_y, PIE, 7, REG, MUTED)
    texto_centro(page, W / 2, pie_y + 11.5, PIE_MARCA, 7.2, DISPLAY, GOLD)

    doc.save(pdf)
    doc.close()
    print(f"contenido hasta y={y:.0f} · pie en y={pie_y - 15:.0f} · holgura {pie_y - 15 - y:.0f}pt")


def a_png(pdf, destino):
    doc = fitz.open(pdf)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(3, 3))
    pix.save(destino)
    doc.close()
    return pix.width, pix.height


if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    pdf = DEST / f"{NOMBRE}.pdf"
    construir(pdf)
    print(f"{NOMBRE}: {a_png(pdf, DEST / f'{NOMBRE}.png')}")
