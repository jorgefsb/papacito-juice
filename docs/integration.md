# Integración

Pasos para una página de la marca personal. La demo [../examples/index.html](../examples/index.html) los sigue.

## 1. Archivos al mismo origen

- juice 1.2.0 completo: los 20 archivos de su `manifest.json` más el manifest. Incluye `moki/moki.js`, `moki/moki.css` y las 12 imágenes WebP. Verifica cada sha256 en el repo y ya servido. Nunca edites una versión publicada.
- Cursor líquido 1.0.1: `cursor-liquido.js` y `cursor-liquido.css`, renderer dorado.
- Game Feel 1.0.1: `game-feel-cursor.js` y `game-feel-cursor.css`, con los hashes fijados en `scripts/setup-demo.mjs`.
- Este perfil: `src/papacito-juice.css` y `src/papacito-juice.js`.

`node scripts/setup-demo.mjs` hace la descarga y la verificación de todo eso en `vendor/` para la demo.

## 2. HTML

- `<html lang="es" data-jz-sound="on" data-moki-show="5">`. La home agrega `data-jz-default="full"`.
- `<button type="button" class="juice-sfx"></button>` en el borde derecho del header. Ahí `juice-menu.js` pone «Juega».
- CSS en este orden: `papacito-juice.css`, CSS del sitio, `juice.css`, `juice-menu.css`, `hardcore.css`, `moki.css`, `cursor-liquido.css`, `game-feel-cursor.css`.
- Scripts con `defer`: `juice.js`, `juice-menu.js`, `hardcore.js`, `moki.js`, `cursor-liquido.js`, `game-feel-cursor.js`, `papacito-juice.js` y el script del sitio.

## 3. Escondites de Moki

`moki.js` 1.2.0 cambia cada `[data-moki]` por un botón `.moki`. Tipos:

| Tipo | Dónde aparece | Cómo dejarle espacio |
|---|---|---|
| `arriba` | Encima del borde superior de su contenedor (`bottom: 100%`) | Margen libre arriba del panel, sin texto |
| `saluda` | De pie sobre el borde superior del contenedor | Igual que `arriba`, con más alto (el de Moki) |
| `cuelga` | Colgando de un hilo desde arriba del contenedor | Una franja vacía de unos 190 px |
| `asoma` | Asomado desde el borde derecho del contenedor | Una franja vacía de unos 140 px |

- Pon más escondites que `data-moki-show`. `moki.js` elige los del día y quita los demás.
- Usa `data-moki-id` estable por escondite. `data-moki-pose` fija una pose solo si hace falta.
- Ajusta el lado con `style="--moki-r: 8%"`.
- La caja de `.moki` es un botón. Nunca debe quedar encima de texto o controles, ni escondido. La suite lo mide en 1280 y 375 px.
- Una página corta puede usar `data-moki-show="1"` o `"2"`.

## 4. Montar

```js
const profile = await PapacitoJuice.mount({ page: 'home' }); // o { page: 'page' }
```

Si rechaza, la instalación está incompleta. Muestra o registra el mensaje. No lo escondas y no llames a la página Papacito Juice.

## 5. Hardcore

Se abre cuando la persona encuentra a todos los Mokis del día. `moki.js` hace la fiesta, guarda `jz-hard` y avisa al menú con `jz:unlock-hard`. No pongas `data-jz-hard="open"` en producción. Los tests lo usan solo como fixture para probar Hardcore en móvil sin jugar las escondidas.

## 6. Rollback

1. `profile.destroy()` o quitar `papacito-juice.js` y el adapter: el cursor se va y la estela original de Hardcore vuelve.
2. Quitar `moki.js` y `moki.css` saca a Moki, pero entonces la página ya no es Papacito Juice. Usa Game Feel genérico.
3. Volver a la versión anterior de juice es cambiar la carpeta versionada, nunca editar archivos.

## 7. Verificar

`npm test` y `npm run test:browser`, más la QA de Game Feel en 375 y 1280 px, normal y con movimiento reducido.
