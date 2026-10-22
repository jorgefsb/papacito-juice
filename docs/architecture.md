# Arquitectura

[Español](architecture.md) · [English](architecture.en.md)

Papacito Juice no tiene motor propio. Es una capa delgada que valida la página y monta el adapter genérico de Game Feel. Las razones del adapter (un solo dueño del puntero, por qué la estela vieja de Hardcore se oculta con CSS, idempotencia) están en la arquitectura de Game Feel: https://github.com/jorgefsb/game-feel/blob/main/docs/architecture.md.

## Capas

```
<html data-jz-sound="on" data-moki-show="5" [data-jz-default="full" en la home]>   configuración de la página
juice.js · juice-menu.js · hardcore.js · moki.js (1.2.0)                            nivel, sonido, menú, Hardcore, Moki
cursor-liquido.js (1.0.1)                                                            estela del puntero
game-feel-cursor.js (1.0.1)                                                          un solo cursor que sigue Juega
papacito-juice.js (este repo)                                                        valida el perfil y monta lo anterior
```

## Qué hace `PapacitoJuice.mount`

1. Revisa la configuración de la página: `data-jz-sound="on"` y el nivel de arranque que corresponde a `page` (`home` en Mucho, el resto en Poquito).
2. Revisa el runtime: `window.JZ`, el dock de «Juega» (`.jz-dock`), `window.JZH` 1.2.0, `window.Moki` 1.2.0 con al menos un escondite (`Moki.poses()`), y `window.GameFeelCursor`.
3. Revisa el arte: decodifica las 12 imágenes que `moki.js` 1.2.0 puede pedir, en la misma carpeta que `moki.js` resolvió. Si falta una, la nombra.
4. Solo entonces llama `GameFeelCursor.mount({ followJuice: true, requireJuice: true, … })`. El adapter es el mismo archivo, con el mismo hash, que usa cualquier otra marca.

Hasta el paso 4 no se escribe nada. Un fallo deja la página exactamente como estaba y la promesa rechaza con el motivo.

## Lo que el perfil no toca

| Estado | Dueño | El perfil |
|---|---|---|
| `data-jz-level` y `localStorage["jz-level"]` | juice y la persona | Lo lee el cursor, nadie lo escribe |
| `localStorage["gamedev_sfx"]` | juice y la persona | No lo toca. Apagar el sonido se respeta |
| `localStorage["jz-hard"]` | `moki.js` al ganar las escondidas | No lo toca ni lo adelanta |
| Escondites, poses, frases, fiesta | `moki.js` | No los toca. Moki queda quieto en Nada por su propia regla |
| `data-game-feel-cursor` | `GameFeelCursor` | Lo pone y lo quita el adapter |

## Por qué el nivel de arranque es configuración

`juice.js` decide el nivel inicial cuando carga: la elección guardada de la persona gana, luego `data-jz-default="full"`, y si no, Poquito. Un script que llamara `JZ.setLevel('full')` después pisaría la elección de la persona y la guardaría. Por eso la home declara `data-jz-default="full"` en su HTML y `mount({ page: 'home' })` solo verifica que esté.

## Ciclo de vida

- `mount` otra vez destruye el handle anterior. Un solo cursor.
- `destroy` destruye el cursor y devuelve `data-game-feel-cursor` a su valor previo. Moki, juice y el menú siguen igual.
