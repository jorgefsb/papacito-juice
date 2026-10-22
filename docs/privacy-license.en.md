# Privacy and licenses

[Español](privacy-license.md) · [English](privacy-license.en.md)

## Data

`papacito-juice.js` stores nothing, reads no cookies, sends no telemetry and only requests same-origin Moki images to verify they exist.

juice 1.2.0 stores the following only in the visitor’s browser:

| `localStorage` key | Writer | Purpose |
|---|---|---|
| `gamedev_sfx` | `juice.js` | Sound enabled/disabled |
| `jz-level` | `juice.js` | Chosen level |
| `jz-menu-seen` | `juice-menu.js` | Avoid repeating invitation frame |
| `jz-hard` | `moki.js` | Hardcore unlocked |
| `moki-escondido:v2` | `moki.js` | Today’s finds, streak, hanging Moki position |

None leaves the browser; clear site data to erase it. Streak only congratulates.

## Licenses

| Material | License | In this repo |
|---|---|---|
| Papacito Juice code/instructions | MIT, [LICENSE](../LICENSE) | Yes |
| Game Feel adapter | MIT | No, pinned download into `vendor/` |
| Cursor líquido | MIT, shader adapted from Pavel Dobryakov (MIT) | No, download/build into `vendor/` |
| juice 1.2.0 | Source repo declares no license at pinned commit | No, downloaded into `vendor/` |
| Moki (art, name, voice) | Not MIT; personal-brand property | No, downloaded into `vendor/` only for authorized integration |

## Personal brand

This profile makes personal-brand pages look and feel consistent. It is not a license to Jorge Suárez’s name/image/voice, to use Moki for another brand, or to create new poses. Nothing here grants new Moki rights. A public demo may show artwork only if its license permits; `vendor/` is not published. Composed documentation media remains subject to the [asset notice](ASSET-NOTICE.md).
