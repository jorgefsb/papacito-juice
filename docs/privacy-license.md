# Privacidad y licencias

[Español](privacy-license.md) · [English](privacy-license.en.md)

## Datos

`papacito-juice.js` no guarda nada, no lee cookies, no manda telemetría y solo pide al mismo origen las imágenes de Moki para comprobar que existen.

Lo que sí guarda el paquete juice 1.2.0, siempre en el navegador de la persona:

| Clave de `localStorage` | Quién | Para qué |
|---|---|---|
| `gamedev_sfx` | `juice.js` | Sonido prendido o apagado |
| `jz-level` | `juice.js` | Nivel elegido |
| `jz-menu-seen` | `juice-menu.js` | No repetir el marco de invitación |
| `jz-hard` | `moki.js` | Hardcore desbloqueado |
| `moki-escondido:v2` | `moki.js` | Mokis encontrados hoy, racha, posición del Moki que cuelga |

Nada sale del navegador. Se borra al limpiar los datos del sitio. La racha solo felicita.

## Licencias

| Material | Licencia | En este repo |
|---|---|---|
| Código e instrucciones de Papacito Juice | MIT ([../LICENSE](../LICENSE)) | Sí |
| Adapter de Game Feel | MIT | No, se descarga fijado a `vendor/` |
| Cursor líquido | MIT, con sombreado adaptado de Pavel Dobryakov (MIT) | No, se descarga o construye en `vendor/` |
| juice 1.2.0 | El repo de origen no declara licencia en el commit fijado | No, se descarga a `vendor/` |
| Moki (arte, nombre, voz) | No es MIT. Propiedad de la marca personal | No, se descarga a `vendor/` solo para la integración autorizada |

## Marca personal

Este perfil sirve para que las páginas de la marca personal se vean y se sientan como tales. No es una licencia para usar el nombre, la imagen o la voz de Jorge Suárez, ni para usar a Moki en otra marca, ni para crear poses nuevas. Ningún archivo de este repo otorga derechos nuevos sobre Moki. Una demo pública solo puede mostrar el arte de Moki si su licencia lo permite, por eso `vendor/` no se publica.

Medios de documentación: [aviso de arte y marca](ASSET-NOTICE.md).
