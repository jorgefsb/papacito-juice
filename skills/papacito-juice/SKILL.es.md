# Papacito Juice

[Español](SKILL.es.md) · [English](SKILL.md)

Perfil de marca personal de Game Feel. Lee primero el skill hermano de Game Feel: principios, capas, niveles, loops éticos y QA. Este archivo añade lo propio de Jorge Suárez y manda para su marca personal si hay conflicto.

Repos separados (destinos públicos previstos; verifica que existan antes de enlazar): [Game Feel](https://github.com/jorgefsb/game-feel), método/adaptador genérico; [Cursor líquido](https://github.com/jorgefsb/cursor-liquido), motor del puntero sin mascota; [Papacito Juice](https://github.com/jorgefsb/papacito-juice), este perfil.

## 1. Alcance

- Solo páginas/apps de la marca personal.
- Nunca otras marcas o empresas: conservan identidad y, si quieren, usan Game Feel con perfil, mascota propia o ninguna y aprobación propia.
- Pregunta quién es dueño antes de tocar el sitio.
- No es licencia para suplantar a Jorge ni usar a Moki en otra marca.

## 2. El contenido no cambia

Alinea formato, no mensaje. Palabras, cifras, secciones, enlaces, CTAs y selector de idioma quedan. Texto nuevo requiere propuesta aprobada.

## 3. Fuentes de verdad

1. Decisión explícita más reciente del dueño.
2. [Brandkit público](https://brandkit.jorgesuarez.com.mx).
3. `jorgefsb/game-industry-resources`, `juice/<version>/` con `manifest.json`: hashes del manifest del commit fijado, no notas viejas.

La fuente superior manda. Registra conflictos, no los resuelvas en silencio.

## 4. Marca en dos líneas

- Color: fondo #0A0A0A, superficie #161616, acento #FF6B35, ámbar #FFA500. Texto #FFFFFF, secundario #B7B3AD, borde #8A7E70, tinta #22211F. Papel/kraft siguen propuestos, no son tokens aprobados para nueva UI. Texto sobre naranja en tinta; papel nunca como texto. Sin neón ni glow. Un acento por pantalla.
- Outfit 700 para títulos e Inter 400 para cuerpo mediante `--brand-font-heading` y `--brand-font-body`. Radios: 6 controles, 12 tarjetas, 18 paneles, 999 píldoras.

## 5. Moki siempre

Una página Papacito Juice SIEMPRE incluye a Moki. Juice y cursor sin Moki es Game Feel genérico, no Papacito Juice. Falta de assets no es instalación completa.

- Solo arte autorizado del banco de Moki entregado con juice. Nunca espejado, generado o editado fuera de reglas del brandkit. Poses nuevas requieren nueva versión.
- Escondidas diarias: `arriba`, `saluda`, `cuelga`, `asoma`, `data-moki-id` estable. Más escondites que `data-moki-show`, cambian a diario y nunca juntos. Sin repetir pose en una página.
- Nunca tapa texto/botones. Quieto en Nada; reacciona en momentos clave (éxito, error, pago). Sin loops permanentes.
- Encontrar todos los Mokis del día da fiesta y abre Hardcore. Logro real. Nunca enviar `data-jz-hard="open"` en marca personal; solo fixture de tests.

## 6. Niveles y Cursor líquido

| Juega | `data-jz-level` | Cursor líquido | Moki |
|---|---|---|---|
| Nada | `off` | apagado | presente y quieto |
| Poquito | `subtle` | puntos 7 px naranja, oscuro, crema | reacciona |
| Mucho | `full` | fluido 10 px CSS | reacciona más |
| Hardcore | `hard` | fluido 18 px CSS | fiesta mayor |

Sin quinto nivel estable. Poquito por defecto, home en Mucho por `<html data-jz-default="full">`, nunca `JZ.setLevel` que pisa lo elegido. Reduced motion fuerza Nada.

Cursor líquido pasa por adapter Game Feel intacto. Un dueño: CSS de página oculta puntos viejos de Hardcore mientras vive y conserva celebraciones. Nunca controla Moki, sonido ni logros.

## 7. Sonido

Prendido por defecto (`data-jz-sound="on"`) con mute visible. Respeta mute guardado, no suena antes del primer gesto. Sonidos juice menores de 150 ms; excepciones «¡Ay!» y fanfarria de Moki. Texto visible y `aria-label` coinciden, estado en `aria-pressed`.

## 8. Instalar

1. Copia `juice/1.2.0/` byte a byte (núcleo, menú, `hardcore/`, `moki/` con WebP y `manifest.json`) al origen del sitio, sin CDN. Verifica cada sha256 local y servido.
2. `dist` Cursor líquido 1.0.1 y adapter Game Feel 1.0.1 intactos y verificados.
3. `<html lang="es" data-jz-sound="on" data-moki-show="5">`, más `data-jz-default="full"` en home.
4. Head: tokens, CSS del sitio, `juice.css`, `juice-menu.css`, `hardcore.css`, `moki.css`, CSS cursor/adapter. Scripts `defer` en ese orden, luego perfil y sitio. El orden exacto del perfil está en [integración](../../docs/integration.md).
5. `await PapacitoJuice.mount({ page: 'home' })` o `{ page: 'page' }`. Si rechaza, arregla instalación, no ocultes error.
6. Nunca edites una versión publicada: arreglo implica nueva versión.

## 9. Reglas de página

Enlace a https://jorgesuarez.com.mx, taps mínimos 44 px, nada sobre botones a ningún ancho, ambos idiomas funcionan, sin notas internas visibles.

## 10. QA antes de publicar

320/375/390/1440 px, cada idioma, normal/reduced motion: URLs responden, sin superposición móvil, `scrollWidth <= innerWidth` en todo nivel, sonido encendido al cargar pero no antes de gesto, mute persiste, Nada apaga todo, Hardcore cerrado hasta hallar todos los Mokis, poses distintas, contraste texto 4.5:1, consola sin errores nuevos, hashes servidos iguales al manifest, una estela visible, contenido idéntico antes/después. Emulación no es prueba física: di cuál ejecutaste.

## 11. Entrega

Respeta alcance del pedido: prototipo no autoriza producción, DNS ni merge. Conserva respaldo y rollback escrito. Después de publicar verifica en vivo y revierte si falla.

## 12. Escritura

Español mexicano corto con versión inglesa. Sin rayas largas, relleno ni vocabulario de IA.
