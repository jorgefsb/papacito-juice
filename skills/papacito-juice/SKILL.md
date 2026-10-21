---
name: papacito-juice
description: "Use when building or editing a page of Jorge Suárez's personal brand: brand tokens, juice levels, sound, Moki hide and seek, Cursor líquido and QA. Not for other brands."
version: 1.0.0
license: MIT
author: Jorge Suárez
author_note: "Instructions only. No license to Moki artwork or to the personal brand."
---

# Papacito Juice

The personal-brand profile of Game Feel. Read the sibling Game Feel skill first: principles, layers, levels, ethical loops and QA live there. This file adds what is specific to Jorge Suárez's personal brand. If they conflict, this profile wins for the personal brand.

Related, separate repositories (intended public homes, check they exist before linking them):

- Game Feel (generic method and cursor adapter): https://github.com/jorgefsb/game-feel
- Cursor líquido (pointer trail engine, no mascot): https://github.com/jorgefsb/cursor-liquido
- Papacito Juice (this profile): https://github.com/jorgefsb/papacito-juice

## 1. Scope

- Applies to pages and apps of the personal brand only.
- Never to other brands or companies. They keep their identity and, if they want juice, use Game Feel with their own profile, their own mascot or none, and their own approval.
- If you do not know who owns a site, ask before touching it.
- This profile is not a license to impersonate Jorge Suárez or to use Moki elsewhere.

## 2. Content does not change

Align format, not message. Words, figures, sections, links, calls to action and the language switch stay as they are. New copy is a proposal that needs approval.

## 3. Sources of truth

1. The owner's most recent explicit decision.
2. The public brandkit: https://brandkit.jorgesuarez.com.mx
3. The juice package: `jorgefsb/game-industry-resources`, folder `juice/<version>/` with its `manifest.json`. Read hashes from the manifest of the pinned commit, never from old notes.

If two sources conflict, the higher one wins. Record the conflict instead of resolving it silently.

## 4. Brand in two lines

- Colour: background #0A0A0A, surface #161616, single accent #FF6B35, amber #FFA500. Text on dark #FFFFFF, secondary #B7B3AD, border #8A7E70. Paper #F4E8D5, kraft #B99168, ink #22211F. Text on orange is ink. Paper is never a text colour. No neon, no glow. One accent per screen.
- Type: Outfit 700 for headings, Inter 400 for body, through `--brand-font-heading` and `--brand-font-body`. Radii 6 controls, 12 cards, 18 panels, 999 pills.

## 5. Always Moki

A Papacito Juice page ALWAYS includes Moki. A page with juice and a cursor but without Moki is generic Game Feel, not Papacito Juice. Never call a missing-asset page a complete installation.

- Only authorized artwork from the Moki library, as shipped in the juice package. Never mirrored. Never generate or edit poses outside the brandkit rules. New poses enter as a new package version.
- Daily hide and seek: spots `arriba`, `saluda`, `cuelga`, `asoma` with stable `data-moki-id`. More spots than `data-moki-show`. Spots change every day and never sit together. Never the same pose twice on a page.
- Moki never covers text or buttons. Still in Nada. Reacts at key moments (success, error, payment). No permanent loops.
- Finding all of today's Mokis gives a party and unlocks Hardcore. That achievement is real. Never ship `data-jz-hard="open"` on a personal-brand page. Tests may use it as a fixture only.

## 6. Levels and Cursor líquido

| Juega | `data-jz-level` | Cursor líquido | Moki |
|---|---|---|---|
| Nada | `off` | off | present and still |
| Poquito | `subtle` | 7 px dots, orange, dark and cream | reacts |
| Mucho | `full` | 10 CSS px fluid | reacts more |
| Hardcore | `hard` | 18 CSS px fluid | bigger party |

No fifth stable level. Poquito is the default, the home page starts in Mucho through `<html data-jz-default="full">`. That is page configuration, never a script calling `JZ.setLevel`, which would overwrite the visitor's choice. Reduced motion forces Nada.

Cursor líquido goes through the unchanged Game Feel adapter. One cursor owner: while it lives, the old Hardcore pointer dots are hidden with page CSS and celebrations stay. The cursor never controls Moki, sound or achievements.

## 7. Sound

On by default (`data-jz-sound="on"`) with a visible mute toggle. A muted choice is kept. Nothing plays before the first gesture. Juice sounds stay under 150 ms. Brand exceptions: Moki's «¡Ay!» and the party fanfare. The toggle's visible text and `aria-label` match, its state is in `aria-pressed`.

## 8. Installing

1. Copy `juice/1.2.0/` byte for byte (core, menu, `hardcore/`, `moki/` with its WebP files and `manifest.json`) to the site's own origin. No CDN. Verify every sha256 in the repo and once served.
2. Add Cursor líquido 1.0.0 dist and the Game Feel 1.0.0 adapter, unchanged and hash-checked.
3. `<html lang="es" data-jz-sound="on" data-moki-show="5">`, plus `data-jz-default="full"` on the home page.
4. Head order: brand tokens, site CSS, `juice.css`, `juice-menu.css`, `hardcore.css`, `moki.css`, cursor CSS, adapter CSS. Scripts at the end with `defer` in the same order, then the profile and the site script.
5. `await PapacitoJuice.mount({ page: 'home' | 'page' })`. If it rejects, the install is incomplete. Fix it, do not hide the error.
6. Never edit a published version. Fixes ship as a new version.

## 9. Page rules

Every page links back to https://jorgesuarez.com.mx. 44 px minimum taps. Nothing on top of a button at any width. Both languages work. No internal notes visible in public text.

## 10. QA before publishing

At 320, 375, 390 and 1440 px, each language, normal and reduced motion: every URL responds, nothing overlaps on mobile, `scrollWidth <= innerWidth` at every level, sound on at load with no audio before a gesture and mute kept after reload, Nada turns everything off, Hardcore locked until all Mokis are found, distinct Moki poses, contrast 4.5:1 for text, no new console errors, served juice matches the manifest, exactly one visible pointer trail, content identical before and after. Browser emulation is not a physical device test. Say which one you ran.

## 11. Delivery

Follow the current request's scope. A request for a prototype does not authorize production, DNS or a merge. Every integration keeps a backup point and a written rollback. Verify live after publishing and roll back at once if something fails.

## 12. Writing

Visible text is short Mexican Spanish with an English version. No long dashes, no filler, no AI vocabulary.
