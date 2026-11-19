"""The site's own web fonts (public/fonts), instead of Google Fonts.

Google's stylesheet held up the first paint (another server to reach before anything shows) and the ruble sign
alone pulled in a 300 KB "latin-ext" file. Here the same two families (Noto Sans Display for headings, Golos Text
for text) come from the site itself; Noto Sans Display keeps only the weights the site uses (400 to 900, every
width), a quarter lighter. The fonts are Google's own (the Fontsource packages mirror them), under the SIL Open Font
License.

Each face comes in two files per alphabet: a core with every letter and sign the pages use today (the Russian
alphabet; plain Latin, the digits and the punctuation in use, and the ruble sign, moved in from Google's latin-ext
file), and the rest of that alphabet in a second file, fetched only by a page that uses one of those letters (a
bar menu's Moët). The core is what a page needs; at a third lighter, the first screen comes sooner.

Run it again only to change the fonts:
  cd tools/fonts && npm i @fontsource-variable/noto-sans-display @fontsource-variable/golos-text --no-save
  python3 build.py        (needs fonttools and brotli: pip install fonttools brotli)
It writes public/fonts/*.woff2 (named by their contents, so they can be cached for good) and
src/styles/fonts.css, and the files to preload into src/data/fonts.json.
"""
import hashlib, io, json, os, re
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
FS = os.path.join(HERE, 'node_modules', '@fontsource-variable')
OUT = os.path.join(ROOT, 'public', 'fonts')

# Google's split (what each source file covers)
CYR = 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'
LAT = ('U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, '
       'U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD')
RUB = 0x20BD
# The core: every character the pages use today (2026-11-13: 146 of them). Outside the Russian alphabet and plain
# Latin: the no-break space, © « » · ‑ – — ’ “ ” „ … ₽ and the minus.
CORE = {
    'cyr': 'U+0401, U+0410-044F, U+0451, U+2116',
    'lat': 'U+0020-007E, U+00A0, U+00A9, U+00AB, U+00B7, U+00BB, U+2010-2015, U+2018-201E, U+2026, U+20BD, U+2212',
}

# family, style, source package and file stem, the site's own name for it
FACES = [
    ('Noto Sans Display', 'normal', 'noto-sans-display', 'noto-sans-display-{}-standard-normal', 'noto-display'),
    ('Noto Sans Display', 'italic', 'noto-sans-display', 'noto-sans-display-{}-standard-italic', 'noto-display-italic'),
    ('Golos Text', 'normal', 'golos-text', 'golos-text-{}-wght-normal', 'golos'),
]


def load(pkg, stem, subset_name):
    return TTFont(os.path.join(FS, pkg, 'files', stem.format(subset_name) + '.woff2'))


def trimmed(font):
    """Only the weights the site uses (400 to 900), where the font goes lighter than that."""
    axes = {a.axisTag: a for a in font['fvar'].axes}
    w = axes.get('wght')
    if w and w.minValue < 400:
        font = instancer.instantiateVariableFont(font, {'wght': instancer.AxisTriple(400, max(400, w.defaultValue), min(900, w.maxValue))})
    return font


def codepoints(ranges):
    out = set()
    for part in ranges.split(','):
        a, _, b = part.strip()[2:].partition('-')
        out.update(range(int(a, 16), int(b or a, 16) + 1))
    return out


def as_range(cps):
    """Code points as a unicode-range: runs written as U+XXXX-YYYY."""
    cps = sorted(cps)
    runs, start = [], None
    for i, c in enumerate(cps):
        if start is None:
            start = c
        if i + 1 == len(cps) or cps[i + 1] != c + 1:
            runs.append(f'U+{start:04X}' if start == c else f'U+{start:04X}-{c:04X}')
            start = None
    return ', '.join(runs)


def with_ruble(font, donor):
    """The ruble sign moved into this (Latin) file from Google's latin-ext one: its outline, its variations and its
    width. The advance widths' own variation tables (HVAR, VVAR) are dropped, as the font format allows: the widths
    then follow the outline's variations (gvar), which carry them too."""
    font.ensureDecompiled()  # every table read in, before the glyph order changes
    donor.ensureDecompiled()
    name = donor.getBestCmap()[RUB]
    order = font.getGlyphOrder()
    if name in order:
        name = name + '.rub'
    font['glyf'].glyphs[name] = donor['glyf'][donor.getBestCmap()[RUB]]
    font['glyf'].glyphOrder = order + [name]
    font.setGlyphOrder(order + [name])
    font['hmtx'].metrics[name] = donor['hmtx'].metrics[donor.getBestCmap()[RUB]]
    font['gvar'].variations[name] = donor['gvar'].variations[donor.getBestCmap()[RUB]]
    if 'vmtx' in font:  # (Golos also carries vertical metrics)
        font['vmtx'].metrics[name] = donor['vmtx'].metrics[donor.getBestCmap()[RUB]] if 'vmtx' in donor else (font['vhea'].advanceHeightMax, 0)
    for table in font['cmap'].tables:
        if table.isUnicode():
            table.cmap[RUB] = name
    for tag in ('HVAR', 'VVAR'):
        if tag in font:
            del font[tag]
    # round-trip, so every table agrees on the new glyph count
    b = io.BytesIO()
    font.save(b)
    b.seek(0)
    return TTFont(b)


def only(font, unicodes):
    opts = subset.Options()
    opts.layout_features = ['*']
    opts.flavor = 'woff2'
    opts.notdef_outline = True
    s = subset.Subsetter(opts)
    s.populate(unicodes=unicodes)
    s.subset(font)
    return font


def save(font, name):
    font.flavor = 'woff2'
    b = io.BytesIO()
    font.save(b)
    data = b.getvalue()
    file = f'{name}.{hashlib.sha1(data).hexdigest()[:8]}.woff2'
    with open(os.path.join(OUT, file), 'wb') as f:
        f.write(data)
    return file, len(data)


def face(family, style, stretch, file, rng):
    return ('@font-face {\n'
            f"  font-family: '{family}';\n  font-style: {style};\n  font-weight: 400 900;\n"
            + (f'  font-stretch: {stretch};\n' if stretch else '')
            + f"  font-display: swap;\n  src: url('/fonts/{file}') format('woff2');\n  unicode-range: {rng};\n}}")


def main():
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith('.woff2'):
            os.remove(os.path.join(OUT, f))
    css = ['/* The site\'s web fonts, served by the site itself (tools/fonts/build.py writes this file and public/fonts).',
           '   Per face and alphabet: the core (what the pages use) and the rest (fetched only where a page uses it). */']
    rest = []
    files = {}
    for family, style, pkg, stem, name in FACES:
        stretch = '62.5% 100%' if pkg == 'noto-sans-display' else None
        for part, src_subset, rng in (('cyr', 'cyrillic', CYR), ('lat', 'latin', LAT)):
            whole = codepoints(rng)
            source = load(pkg, stem, src_subset)
            if part == 'lat':
                source = with_ruble(source, load(pkg, stem, 'latin-ext'))
                whole.add(RUB)
            source = trimmed(source)
            have = set(source.getBestCmap()) & whole
            core = have & codepoints(CORE[part])
            for key, cps, out in ((f'{name}-{part}', core, css), (f'{name}-{part}-x', have - core, rest)):
                if not cps:
                    continue
                font = only(TTFont(_copy(source)), sorted(cps))
                file, size = save(font, key)
                files[key] = f'/fonts/{file}'
                print(f'{file:44} {size / 1024:6.1f} KB  {len(cps)} characters')
                out.append(face(family, style, stretch, file, CORE[part] if out is css else as_range(cps)))
    with open(os.path.join(ROOT, 'src', 'styles', 'fonts.css'), 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(css + rest) + '\n')
    with open(os.path.join(ROOT, 'src', 'data', 'fonts.json'), 'w', encoding='utf-8', newline='\n') as f:
        json.dump(files, f, indent=2)
        f.write('\n')


def _copy(font):
    b = io.BytesIO()
    font.save(b)
    b.seek(0)
    return b


if __name__ == '__main__':
    main()
