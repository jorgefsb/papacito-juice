# Architecture

[Español](architecture.md) · [English](architecture.en.md)

Papacito Juice has no engine of its own. It validates the page and mounts the generic Game Feel adapter. Adapter rationale (one pointer owner, CSS-hiding the old Hardcore trail, idempotence) lives in [Game Feel architecture](https://github.com/jorgefsb/game-feel/blob/main/docs/architecture.en.md).

## Layers

```
<html data-jz-sound="on" data-moki-show="5" [data-jz-default="full" on home]>
juice.js · juice-menu.js · hardcore.js · moki.js (1.2.0)
cursor-liquido.js (1.0.1)
game-feel-cursor.js (1.0.1)
papacito-juice.js (this repo)
```

From top to bottom: page configuration; level/sound/menu/Hardcore/Moki; pointer trail; one cursor following Juega; profile validation and mounting.

## What `PapacitoJuice.mount` does

1. Validate page configuration: `data-jz-sound="on"` and initial level appropriate to `page` (Mucho for `home`, Poquito otherwise).
2. Validate runtime: `window.JZ`, Juega dock (`.jz-dock`), `window.JZH` 1.2.0, `window.Moki` 1.2.0 with at least one hiding spot (`Moki.poses()`), and `window.GameFeelCursor`.
3. Validate artwork: decode all 12 images `moki.js` 1.2.0 may request from the directory it resolved. Name any missing image in the error.
4. Only then call `GameFeelCursor.mount({ followJuice: true, requireJuice: true, … })`. This is the same adapter file/hash any other brand uses.

Nothing is written before step 4. Failure leaves the page unchanged and rejects the promise with a reason.

## State the profile does not touch

| State | Owner | Profile behavior |
|---|---|---|
| `data-jz-level`, `localStorage["jz-level"]` | juice and visitor | Cursor reads; profile never writes |
| `localStorage["gamedev_sfx"]` | juice and visitor | Untouched; mute respected |
| `localStorage["jz-hard"]` | `moki.js` on hide-and-seek completion | Untouched, never advanced |
| Spots, poses, phrases, party | `moki.js` | Untouched; Moki’s own Nada rule keeps him still |
| `data-game-feel-cursor` | `GameFeelCursor` | Adapter sets/removes |

## Why initial level is configuration

At load, `juice.js` chooses saved visitor choice first, then `data-jz-default="full"`, otherwise Poquito. Calling `JZ.setLevel('full')` afterwards would overwrite and save the visitor’s choice. Home declares `data-jz-default="full"` in HTML; `mount({ page: 'home' })` only checks it.

## Lifecycle

- Another `mount` destroys the previous handle; one cursor.
- `destroy` destroys the cursor and restores the previous `data-game-feel-cursor`. Moki, juice and menu remain unchanged.
