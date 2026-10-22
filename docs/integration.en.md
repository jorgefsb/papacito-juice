# Integration

[Español](integration.md) · [English](integration.en.md)

For a personal-brand page. [The demo](../examples/index.html) follows these steps.

## 1. Same-origin files

- Complete juice 1.2.0: the 20 `manifest.json` files plus manifest, including `moki/moki.js`, `moki/moki.css` and 12 WebP images. Verify every SHA-256 locally and after serving. Never edit a published version.
- Cursor líquido 1.0.1: `cursor-liquido.js`, `cursor-liquido.css`, approved renderer.
- Game Feel 1.0.1: `game-feel-cursor.js`, `game-feel-cursor.css`, hashes pinned in `scripts/setup-demo.mjs`.
- This profile: `src/papacito-juice.css`, `src/papacito-juice.js`.

`node scripts/setup-demo.mjs` downloads and verifies these into `vendor/` for the demo.

## 2. HTML

- `<html lang="es" data-jz-sound="on" data-moki-show="5">`. Home adds `data-jz-default="full"`.
- `<button type="button" class="juice-sfx"></button>` at the header’s right edge, where `juice-menu.js` inserts Juega.
- CSS order: `papacito-juice.css`, site CSS, `juice.css`, `juice-menu.css`, `hardcore.css`, `moki.css`, `cursor-liquido.css`, `game-feel-cursor.css`.
- Deferred scripts: `juice.js`, `juice-menu.js`, `hardcore.js`, `moki.js`, `cursor-liquido.js`, `game-feel-cursor.js`, `papacito-juice.js`, site script.

## 3. Moki hiding spots

`moki.js` 1.2.0 replaces each `[data-moki]` with a `.moki` button.

| Type | Appearance | Required space |
|---|---|---|
| `arriba` | Above container top (`bottom: 100%`) | Clear top margin without text |
| `saluda` | Standing on container top edge | As above, with Moki-height clearance |
| `cuelga` | Hanging on a thread from container top | About 190 px clear band |
| `asoma` | Peeking from container right edge | About 140 px clear band |

- Provide more spots than `data-moki-show`; `moki.js` picks today’s spots and removes the rest.
- Stable `data-moki-id` per spot; fix `data-moki-pose` only when needed.
- Adjust side with `style="--moki-r: 8%"`.
- `.moki` is a button box. Never place it over text/controls or hide it. The suite measures this at 1280 and 375 px.
- A short page can use `data-moki-show="1"` or `"2"`.

## 4. Mount

```js
const profile = await PapacitoJuice.mount({ page: 'home' }); // or { page: 'page' }
```

A rejection means incomplete installation. Display/log the error; do not hide it or call that page Papacito Juice.

## 5. Hardcore

Unlocks when the visitor finds all of today’s Mokis. `moki.js` celebrates, saves `jz-hard` and notifies the menu using `jz:unlock-hard`. Never set `data-jz-hard="open"` in production. Tests use it only as a mobile Hardcore fixture without playing hide-and-seek.

## 6. Rollback

1. `profile.destroy()` or remove `papacito-juice.js` and adapter: cursor disappears, original Hardcore trail returns.
2. Removing `moki.js` and `moki.css` removes Moki, but the page is no longer Papacito Juice. Use generic Game Feel instead.
3. To return to an earlier juice version change the versioned directory, never edit its files.

## 7. Verify

`npm test`, `npm run test:browser`, plus Game Feel QA at 375/1280 px, normal and reduced motion.
