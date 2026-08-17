"""Recorta las imagenes de horarios para dejar solo el cuadro.

Quita la cabecera con el logo y los margenes sobrantes, de modo que la
imagen sea practicamente todo horario y se vea lo mas grande posible en
la web.

Uso:  python scripts/horarios_imagenes.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parents[2]
ORIG = RAIZ / "imagenes"
DEST = RAIZ / "bitanbat-web" / "public" / "media" / "horarios"

MARGEN = 16  # aire alrededor del cuadro, en pixeles

# el sufijo -vN refresca la cache de imagenes de Next: si se regeneran
# manteniendo el nombre, sigue sirviendo la version antigua
TRABAJOS = [
    # origen, salida, primera fila del cuadro (encima empieza el logo)
    ("ordutegi3.jpeg", "horario-danza-v4.jpg", 352),
    ("ordutegi1.jpeg", "horario-barrefit-pilates-v4.jpg", 352),
    ("ordutegi2.jpeg", "horario-funcional-v4.jpg", 428),
]

# Clases retiradas del cuadro. Se tapan copiando un trozo vacio de la misma
# columna (asi el fondo y los separadores encajan exactos).
#   x0, x1: columna del dia    y0, y1: alto de la tarjeta    desde: fila de origen
TAPAR = {
    "ordutegi3.jpeg": [
        # viernes 17:30 pilates
        {"x0": 1192, "x1": 1476, "y0": 564, "y1": 668, "desde": 700},
    ],
}

# Textos corregidos sobre la imagen: se borra el original y se reescribe
# centrado en el mismo hueco, con la misma altura de mayuscula.
FUENTE = Path(__file__).resolve().parent / "fonts" / "Poppins-Bold.ttf"

TEXTOS = {
    "ordutegi1.jpeg": [
        # miercoles: "BATXATA" -> "BACHATA"
        {"texto": "BACHATA", "x0": 736, "y0": 851, "x1": 820, "y1": 867},
        {"texto": "BACHATA", "x0": 736, "y0": 935, "x1": 820, "y1": 951},
    ],
}


def limites(a, arriba):
    """Devuelve el rectangulo del cuadro (panel claro) por debajo de `arriba`."""
    h, w, _ = a.shape
    sat = a.max(axis=2) - a.min(axis=2)
    claro = (a.mean(axis=2) > 205) & (sat < 45)
    claro[:arriba] = False

    filas = np.where(claro.sum(axis=1) > w * 0.30)[0]
    cols = np.where(claro.sum(axis=0) > h * 0.10)[0]
    return cols.min(), filas.max(), cols.max()


def tapar(im, zonas):
    """Borra tarjetas de clase copiando fondo vacio de la misma columna."""
    for z in zonas:
        alto = z["y1"] - z["y0"]
        parche = im.crop((z["x0"], z["desde"], z["x1"], z["desde"] + alto))
        im.paste(parche, (z["x0"], z["y0"]))
    return im


def fuente_para(alto_mayuscula, texto):
    """Devuelve la fuente cuyo alto de mayuscula coincide con el original."""
    for size in range(6, 80):
        f = ImageFont.truetype(str(FUENTE), size)
        caja = f.getbbox(texto)
        if caja[3] - caja[1] >= alto_mayuscula:
            return f
    return ImageFont.truetype(str(FUENTE), 20)


def reescribir(im, cambios):
    d = ImageDraw.Draw(im)
    a = np.asarray(im)
    for c in cambios:
        alto = c["y1"] - c["y0"] + 1
        # color de fondo: mediana de una zona vacia de la misma tarjeta
        zona = a[c["y0"] : c["y1"] + 1, c["x1"] + 8 : c["x1"] + 45]
        fondo = tuple(int(v) for v in np.median(zona.reshape(-1, 3), axis=0))

        d.rectangle([c["x0"] - 8, c["y0"] - 5, c["x1"] + 8, c["y1"] + 5], fill=fondo)

        f = fuente_para(alto, c["texto"])
        caja = f.getbbox(c["texto"])
        cx = (c["x0"] + c["x1"]) / 2
        d.text(
            (cx - (caja[2] - caja[0]) / 2 - caja[0], c["y0"] - caja[1]),
            c["texto"],
            font=f,
            fill=(255, 255, 255),
        )
    return im


def procesar(origen, salida, arriba):
    im = Image.open(ORIG / origen).convert("RGB")
    if origen in TAPAR:
        im = tapar(im, TAPAR[origen])
    if origen in TEXTOS:
        im = reescribir(im, TEXTOS[origen])
    a = np.asarray(im).astype(int)
    W, H = im.size

    x0, y1, x1 = limites(a, arriba)
    caja = (
        max(0, x0 - MARGEN),
        max(0, arriba - MARGEN),
        min(W, x1 + 1 + MARGEN),
        min(H, y1 + 1 + MARGEN),
    )
    fuera = im.crop(caja)
    fuera.save(DEST / salida, quality=93, optimize=True)
    print(f"{salida}: {fuera.width} x {fuera.height}   (antes {W} x {H})")
    return fuera.size


if __name__ == "__main__":
    for origen, salida, arriba in TRABAJOS:
        procesar(origen, salida, arriba)
