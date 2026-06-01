# FullPond — Landing page (refactor)

Rediseño de alto impacto del sitio de FullPond, manteniendo el mismo contenido.
Tono profesional y confiable (estilo Deel / Remote / Toptal).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (tokens en `src/app/globals.css`)
- **Motion** (Framer Motion) para animaciones sutiles en scroll

## Cómo correrlo

```bash
npm install      # solo la primera vez
npm run dev      # http://localhost:3000
```

Producción:

```bash
npm run build && npm run start
```

## ⚠️ Antes de publicar

Reemplaza la URL del **Google Form** de aplicantes en
[`src/lib/site.ts`](src/lib/site.ts) → `applicantFormUrl`
(actualmente es un placeholder). Ahí también viven el email y teléfono.

## Qué cambió respecto al original

- **Paleta consolidada.** Los 4 sistemas de color que chocaban (azul cielo,
  marrón, morado, gris) se unificaron en: **azul de marca** (único acento) +
  **ink** (azul-marino profundo, reemplaza el marrón apagado) + neutros.
  Los tokens están en `globals.css`; cambiar la marca es trivial.
- **Logo con símbolo.** Una marca llamada "Pond" ahora tiene un logomark
  (gota + ondas), antes era solo texto.
- **Íconos reales** en problemas/solución y categorías (antes eran `x` y `✓`
  en texto plano).
- **Tipografía** con carácter: Sora (titulares) + Inter (cuerpo).
- **Animaciones** sutiles y profesionales (reveal en scroll, hover, marquee),
  con respeto a `prefers-reduced-motion`.

## Estructura

```
src/
  app/            layout (fuentes + metadata), page (compone secciones), globals.css
  components/     Nav, Hero, Obstacles, Talent, ConnectBanner, Process,
                  Benefits, Marquee, ApplyCta, Footer, icons, ui/
  lib/site.ts     contacto + enlaces (única fuente de verdad)
```
