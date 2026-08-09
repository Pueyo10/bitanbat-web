"""Genera los cuadros de horarios de BitanBat a partir de los PDF originales.

Parte siempre de los PDF de diseno originales y aplica encima la lista de
cambios de CAMBIOS_GELAS / CAMBIOS_CLASES. Asi cada modificacion nueva se
anade a la lista y se vuelve a generar todo, sin encadenar ediciones.

Uso:  python scripts/horarios.py
Salida: public/media/horarios/*.pdf y *.png (recortados)
"""

import shutil
from pathlib import Path

import fitz
from PIL import Image, ImageChops

RAIZ = Path(__file__).resolve().parents[2]
ORIG = RAIZ
DEST = RAIZ / "bitanbat-web" / "public" / "media" / "horarios"

FONT = "hebo"  # Helvetica-Bold
PAD = 24  # margen al recortar el PNG

# Nombres de salida (cambiar el sufijo refresca la cache de imagenes de Next)
SALIDA_GELAS = "ordutegia-gelas-v7"
SALIDA_CLASES = "ordutegia-clases-v3"

# ---------------------------------------------------------------- geometria
GELAS = {
    "src": ORIG / "Ordutegia_gelas_Sin_leyenda.pdf",
    "cols": [34.0, 79.4, 187.1, 294.8, 402.5, 510.2, 618.0, 725.7, 833.4, 941.1, 1048.8, 1156.5],
    "row_h": 34.6,
    "bg_hora": "#EEF3F5",
    "bg_par": "#F6FBFD",   # 1 gela
    "bg_impar": "#FFF9F0",  # 2 gela
    "hora_size": 8.5,
    "hora_dy": 20.8,
    "cell_size": 7.4,
    "cell_dy_1linea": 20.45,
    "cell_dy_linea1": 16.2,
    "cell_dy_linea2": 24.7,
}

CLASES = {
    "src": ORIG / "Ordutegia_clases_Sin_leyenda.pdf",
    "cols": [25.5, 79.4, 226.8, 374.2, 521.6, 669.0, 816.4],
    "row_h": 31.7,
    "bg_hora": "#F2F5F6",
    "bg_dias": "#FAFCFC",
    "hora_size": 9.0,
    "hora_dy": 19.8,
    "cell_size": 8.5,
    "cell_dy_1linea": 19.6,
}

NAVY = "#17324D"
BLANCO = "#FFFFFF"

# ---------------------------------------------------------------- cambios
# Celdas que se reescriben (rect exacto, texto, fondo, color de texto)
CAMBIOS_GELAS = {
    # lunes 19:15 <-> miercoles 19:15
    "reemplazos": [
        {
            "rect": (79.4, 610.3, 187.1, 644.9),
            "texto": ["Fusión & Ritmo"],
            "fondo": "#34507C",
            "color": BLANCO,
        },
        {
            "rect": (510.2, 610.3, 618.0, 644.9),
            "texto": ["BUNGEE"],
            "fondo": "#20DCC6",
            "color": NAVY,
        },
        # nueva clase: jueves 19:15 en 1 gela
        {
            "rect": (725.7, 610.3, 833.4, 644.9),
            # apostrofo recto: el tipografico (’) no existe en la fuente del PDF
            "texto": ["Fusión & Ritmo 80's"],
            "fondo": "#34507C",
            "color": BLANCO,
        },
    ],
    # fila nueva 19:30 (se inserta tras la fila que acaba en 644.9)
    "fila_nueva": {
        "tras_y": 644.9,
        "hora": "19:30",
        "celdas": [
            {"col": 4, "texto": ["ENTRENAMIENTO", "FUNCIONAL"], "fondo": "#FFF36A", "color": NAVY},
        ],
    },
}

CAMBIOS_CLASES = {
    "reemplazos": [
        # la fila de las 10:35 pasa a 10:40
        {
            "rect": (25.5, 191.9, 79.4, 223.6),
            "texto": ["10:40"],
            "fondo": CLASES["bg_hora"],
            "color": NAVY,
            "size": CLASES["hora_size"],
            "dy": CLASES["hora_dy"],
        },
        # pilates el martes a esa hora
        {
            "rect": (226.8, 191.9, 374.2, 223.6),
            "texto": ["PILATES"],
            "fondo": "#9AE68A",
            "color": NAVY,
        },
    ],
    # fila nueva 16:30 (tras la fila de las 15:00, que acaba en 287.1)
    "fila_nueva": {
        "tras_y": 287.1,
        "hora": "16:30",
        "celdas": [
            {"col": 2, "texto": ["YOGA"], "fondo": "#FF969D", "color": NAVY},
        ],
    },
}


# ---------------------------------------------------------------- utilidades
def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def centrar(page, x0, x1, y_base, texto, size, color):
    w = fitz.get_text_length(texto, fontname=FONT, fontsize=size)
    page.insert_text(
        (x0 + (x1 - x0 - w) / 2, y_base),
        texto,
        fontname=FONT,
        fontsize=size,
        color=rgb(color),
    )


def color_lineas(page):
    for d in page.get_drawings():
        if d.get("fill") is None and d.get("color") is not None:
            return d["color"]
    return rgb(NAVY)


def escribir_celda(page, rect, cfg, geo):
    """Pinta el fondo de una celda y escribe su texto centrado."""
    x0, y0, x1, y1 = rect
    size = cfg.get("size", geo["cell_size"])
    lineas = cfg["texto"]
    if len(lineas) == 1:
        dy = cfg.get("dy", geo["cell_dy_1linea"])
        centrar(page, x0, x1, y0 + dy, lineas[0], size, cfg["color"])
    else:
        centrar(page, x0, x1, y0 + geo["cell_dy_linea1"], lineas[0], size, cfg["color"])
        centrar(page, x0, x1, y0 + geo["cell_dy_linea2"], lineas[1], size, cfg["color"])


def aplicar(geo, cambios, salida):
    doc = fitz.open(geo["src"])
    page = doc[0]
    lineas_col = color_lineas(page)

    # --- 1) reemplazos de celdas -------------------------------------
    for c in cambios["reemplazos"]:
        r = fitz.Rect(*c["rect"])
        page.add_redact_annot(fitz.Rect(r.x0 + 1, r.y0 + 1, r.x1 - 1, r.y1 - 1))
    # se borra solo el texto; la rejilla se conserva
    page.apply_redactions(graphics=fitz.PDF_REDACT_LINE_ART_NONE)

    for c in cambios["reemplazos"]:
        r = fitz.Rect(*c["rect"])
        page.draw_rect(r, color=None, fill=rgb(c["fondo"]))
        escribir_celda(page, c["rect"], c, geo)

    tmp = doc.tobytes()
    doc.close()

    # --- 2) fila nueva ------------------------------------------------
    nueva = cambios.get("fila_nueva")
    src = fitz.open("pdf", tmp)
    if not nueva:
        src.save(salida)
        src.close()
        return

    spage = src[0]
    W, H = spage.rect.width, spage.rect.height
    y0 = nueva["tras_y"]
    h = geo["row_h"]
    y1 = y0 + h

    out = fitz.open()
    npage = out.new_page(width=W, height=H)
    npage.insert_font(fontname=FONT)  # sin esto el texto nuevo saldria con otra fuente

    arriba = fitz.Rect(0, 0, W, y0)
    npage.show_pdf_page(arriba, src, 0, clip=arriba)
    abajo_src = fitz.Rect(0, y0, W, H)
    npage.show_pdf_page(fitz.Rect(0, y1, W, H + h), src, 0, clip=abajo_src)

    cols = geo["cols"]
    # fondos
    npage.draw_rect(fitz.Rect(cols[0], y0, cols[1], y1), color=None, fill=rgb(geo["bg_hora"]))
    if "bg_dias" in geo:
        npage.draw_rect(fitz.Rect(cols[1], y0, cols[-1], y1), color=None, fill=rgb(geo["bg_dias"]))
    else:
        for i in range(1, len(cols) - 1):
            fill = geo["bg_par"] if i % 2 == 1 else geo["bg_impar"]
            npage.draw_rect(fitz.Rect(cols[i], y0, cols[i + 1], y1), color=None, fill=rgb(fill))
    # separadores verticales
    for x in cols:
        npage.draw_line((x, y0), (x, y1), color=lineas_col, width=0.55)
    # hora
    centrar(npage, cols[0], cols[1], y0 + geo["hora_dy"], nueva["hora"], geo["hora_size"], NAVY)
    # celdas
    for cel in nueva["celdas"]:
        i = cel["col"]
        rect = (cols[i], y0, cols[i + 1], y1)
        npage.draw_rect(fitz.Rect(*rect), color=None, fill=rgb(cel["fondo"]))
        escribir_celda(npage, rect, cel, geo)

    out.save(salida)
    out.close()
    src.close()


def a_png(pdf, destino):
    doc = fitz.open(pdf)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(3, 3))
    tmp = destino.with_suffix(".tmp.png")
    pix.save(tmp)
    doc.close()

    im = Image.open(tmp).convert("RGB")
    bg = Image.new("RGB", im.size, (255, 255, 255))
    bbox = ImageChops.difference(im, bg).getbbox()
    box = (
        max(0, bbox[0] - PAD),
        max(0, bbox[1] - PAD),
        min(im.width, bbox[2] + PAD),
        min(im.height, bbox[3] + PAD),
    )
    im.crop(box).save(destino, optimize=True)
    tmp.unlink()
    return Image.open(destino).size


if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    for geo, cambios, nombre in (
        (GELAS, CAMBIOS_GELAS, SALIDA_GELAS),
        (CLASES, CAMBIOS_CLASES, SALIDA_CLASES),
    ):
        pdf = DEST / f"{nombre}.pdf"
        aplicar(geo, cambios, pdf)
        w, h = a_png(pdf, DEST / f"{nombre}.png")
        print(f"{nombre}: {w} x {h}")
