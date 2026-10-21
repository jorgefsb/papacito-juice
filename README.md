# Papacito Juice

Perfil de la marca personal de Jorge Suárez para [Game Feel](https://github.com/jorgefsb/game-feel). Junta juice 1.2.0 (núcleo, menú «Juega», sonido y Hardcore), **Moki autorizado** con sus escondidas diarias y [Cursor líquido](https://github.com/jorgefsb/cursor-liquido) por el mismo adapter genérico de Game Feel.

> Estado: repositorio local listo para publicarse como `https://github.com/jorgefsb/papacito-juice`. Esa URL y las de Game Feel y Cursor líquido son el destino previsto, no enlaces ya verificados. No hay paquete en npm.

**Papacito Juice siempre incluye a Moki.** Una página con juice y cursor pero sin Moki no es una instalación de Papacito Juice: es Game Feel genérico. `PapacitoJuice.mount()` falla con un error claro si Moki o su arte no están instalados.

Este perfil es para propiedades de la marca personal. No da licencia para usar la identidad de Jorge Suárez, hablar en su nombre ni usar a Moki. Otras marcas usan Game Feel con su propia mascota o sin mascota.

## Por qué existe

Game Feel define principios, niveles y QA comunes. Lo propio de una marca (colores, mascota, sonido de arranque, logro de Hardcore, nivel inicial de la home) vive en un perfil. Este repo es ese perfil hecho código: valida que la página esté completa y luego monta el adapter genérico, sin copiarlo ni cambiar su comportamiento.

| Pieza | Qué pone | Dónde vive |
|---|---|---|
| Cursor líquido 1.0.0 | La estela del puntero, sin Moki | Repo propio |
| Game Feel 1.0.0 | Método genérico y `GameFeelCursor` | Repo propio |
| Papacito Juice 1.0.0 | Tokens de marca, reglas del perfil y `PapacitoJuice.mount` | Este repo |
| juice 1.2.0 con Moki | Niveles, sonido, menú, Hardcore, Moki y su arte | `jorgefsb/game-industry-resources` |

Arquitectura en [docs/architecture.md](docs/architecture.md). Principios del perfil en [docs/design-principles.md](docs/design-principles.md).

## Los cuatro niveles

| Juega | `data-jz-level` | Cursor líquido | Moki |
|---|---|---|---|
| Nada | `off` | `nada`, sin efecto | Presente y quieto |
| Poquito | `subtle` | `poquito`, puntos de 7 px naranja, oscuro y crema | Se asoma y reacciona |
| Mucho | `full` | `mucho`, fluido de 10 px | Reacciona con más cuerpo |
| Hardcore | `hard` | `hardcore`, fluido de 18 px | Fiesta más grande |

Arranque: Poquito en páginas internas, Mucho en la home. Hardcore se abre al encontrar a todos los Mokis del día. `prefers-reduced-motion` fuerza Nada. No hay quinto nivel estable. «Legendario» es solo propuesta ([docs/roadmap.md](docs/roadmap.md)).

## Instalar en una página de la marca personal

1. **juice 1.2.0 completo**, los 20 archivos del manifest, Moki y su arte incluidos, copiados byte por byte al mismo origen. El arte de Moki no es MIT: úsalo solo en la integración autorizada de la marca personal.
2. **Cursor líquido 1.0.0** (`cursor-liquido.js`, `cursor-liquido.css`), con el renderer dorado.
3. **Game Feel 1.0.0** (`game-feel-cursor.js`, `game-feel-cursor.css`), sin cambios.
4. **Este perfil**: `src/papacito-juice.css` y `src/papacito-juice.js`.
5. **HTML**:

```html
<html lang="es" data-jz-sound="on" data-moki-show="5">          <!-- home: agrega data-jz-default="full" -->
<link rel="stylesheet" href="/papacito-juice/papacito-juice.css">
<link rel="stylesheet" href="/juice/1.2.0/juice.css">
<link rel="stylesheet" href="/juice/1.2.0/juice-menu.css">
<link rel="stylesheet" href="/juice/1.2.0/hardcore/hardcore.css">
<link rel="stylesheet" href="/juice/1.2.0/moki/moki.css">
<link rel="stylesheet" href="/vendor/cursor-liquido/cursor-liquido.css">
<link rel="stylesheet" href="/game-feel/game-feel-cursor.css">
…
<section class="panel"><span data-moki="arriba" data-moki-id="inicio-arriba"></span> …</section>
…
<script src="/juice/1.2.0/juice.js" defer></script>
<script src="/juice/1.2.0/juice-menu.js" defer></script>
<script src="/juice/1.2.0/hardcore/hardcore.js" defer></script>
<script src="/juice/1.2.0/moki/moki.js" defer></script>
<script src="/vendor/cursor-liquido/cursor-liquido.js" defer></script>
<script src="/game-feel/game-feel-cursor.js" defer></script>
<script src="/papacito-juice/papacito-juice.js" defer></script>
<script src="/js/sitio.js" defer></script>   <!-- await PapacitoJuice.mount({ page: 'home' }) o { page: 'page' } -->
```

Escondites de Moki, reglas de página y rollback en [docs/integration.md](docs/integration.md).

## API

`await PapacitoJuice.mount(options)` devuelve un handle o rechaza con un mensaje que dice qué falta.

| Opción | Default | Qué hace |
|---|---|---|
| `page` | `'page'` | `'home'` exige `<html data-jz-default="full">`, `'page'` exige que no esté. El nivel de arranque es configuración de la página, nunca algo que el script escribe. |
| `gameFeel` | `window.GameFeelCursor` | El adapter genérico a montar. |
| `cursor`, `color`, `touch`, `obstacleSelector`, `container` | los de Game Feel | Se pasan tal cual a `GameFeelCursor.mount`. `followJuice` y `requireJuice` siempre van en `true`. |

Antes de montar valida: `window.JZ`, el dock de «Juega», `window.JZH` 1.2.0, `window.Moki` 1.2.0 con al menos un escondite, el arte de las 12 poses que `moki.js` puede pedir, `data-jz-sound="on"`, el nivel de arranque y `GameFeelCursor`. Si algo falla, no cambia nada.

Handle: `handle.cursor` (el handle de Game Feel), `handle.poses` (`Moki.poses()`), `handle.page`, `handle.profile`, `handle.destroy()`. También `PapacitoJuice.current`, `.profile`, `.artwork`, `.version`.

El perfil **nunca** escribe el nivel, el sonido, el desbloqueo de Hardcore ni nada de Moki. Moki usa sus propias exportaciones 1.2.0 (`Moki.poses()`, `Moki.found()`, `Moki.poke(id)`, `Moki.reset()`, `Moki.celebrate()`) y su propio DOM (`[data-moki]`). Este repo no inventa un selector ni una API de mascota.

## Probar la demo y los tests

```sh
npm ci
npm run setup -- --game-feel-dir ruta/a/game-feel --cursor-dir ruta/a/cursor-liquido/dist
npm run demo            # http://127.0.0.1:<puerto>/examples/
npm test                # unitarios y de contrato
npm run test:browser    # Chromium real, Moki real
```

`npm run setup` baja los 20 archivos de juice 1.2.0 del commit fijado (Moki incluido) y verifica cada sha256. El adapter de Game Feel sale de `--game-feel-dir` (o `GAME_FEEL_DIR`) o del tag previsto `v1.0.0`, y debe coincidir con sus hashes fijados. Cursor líquido sale de `--cursor-dir` (o `CURSOR_LIQUIDO_DIR`) como en Game Feel, o de los insumos aprobados más `--cursor-css`. Todo queda en `vendor/`, ignorado por Git, incluido el arte de Moki.

Sin `vendor/` completo la demo muestra el error de instalación y no se llama Papacito Juice. La suite usa Chromium headless con WebGL por SwiftShader y viewports emulados, no teléfonos físicos. Capturas en `qa/` (ignorado), resumen en [reports/browser-report.json](reports/browser-report.json).

## Fuentes fijadas

| Pieza | Fijación |
|---|---|
| juice 1.2.0 | `jorgefsb/game-industry-resources` en `f1b3b9c77a43ffbcbd331bb88420a436614fdbc3`, carpeta `juice/1.2.0` (rama `feat/juice-1.1.0-moki`, main todavía no la trae). `manifest.json` `a4da3499b6e171221a11477c839e08fadbbc846fc687266c5007bace6a2c6568`. Los 20 sha256 están en [scripts/setup-demo.mjs](scripts/setup-demo.mjs) y se comparan contra ese manifest en cada corrida. |
| Game Feel 1.0.0 | `game-feel-cursor.js` `8498ccadcd8ec2d15b9ae14298b0ce26de43a15293fc5daa932e2b4f1a83f4f6`, `game-feel-cursor.css` `f523415013433dbef415483a1e68258a9833b42edcccea1d2f8bae3ba4837114` |
| Cursor líquido 1.0.0 | renderer dorado `3d478cc836969c216812c7e479724e0e204bbb76a26df24c2414568883021230` |

## Límites conocidos

- La estela vieja de Hardcore se oculta con CSS mientras el cursor vive. `hardcore.js` sigue creando hasta 29 nodos invisibles. Detalle en [docs/architecture.md](docs/architecture.md).
- `moki.js` 1.2.0 guarda el desbloqueo en `localStorage["jz-hard"]` después de la primera fiesta del día y desde entonces Hardcore queda abierto en ese navegador. Es comportamiento del paquete. Este perfil no lo cambia ni lo adelanta.
- La página anfitriona carga Outfit e Inter. El perfil no baja fuentes y cae a fuentes del sistema.
- Los releases de Game Feel y Cursor líquido aún no están publicados. Hasta entonces usa `--game-feel-dir` y `--cursor-dir`.

## English quickstart

Papacito Juice is the personal-brand profile of Game Feel. It always includes authorized Moki 1.2.0. Without Moki, `PapacitoJuice.mount()` rejects with a clear message and changes nothing. Use plain Game Feel for any other brand.

```sh
npm ci
npm run setup -- --game-feel-dir path/to/game-feel --cursor-dir path/to/cursor-liquido/dist
npm run demo
npm test && npm run test:browser
```

On a personal-brand page, load juice 1.2.0 (all 20 files), Cursor líquido 1.0.0, the Game Feel adapter and `src/papacito-juice.{css,js}`, then `await PapacitoJuice.mount({ page: 'home' })` on the home page (with `data-jz-default="full"`) or `{ page: 'page' }` elsewhere. Levels: `off`→nada, `subtle`→7 px dots, `full`→10 px fluid, `hard`→18 px fluid, unlocked by finding all of today's Mokis. Moki artwork is not MIT and is not granted by this repository.

## Licencia

Código e instrucciones: MIT ([LICENSE](LICENSE)). Moki, su arte y la marca personal no son MIT y no se incluyen. juice y Cursor líquido se descargan de sus fuentes. Ver [NOTICES](NOTICES) y [docs/privacy-license.md](docs/privacy-license.md).
