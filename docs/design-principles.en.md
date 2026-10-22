# Profile principles

[Español](design-principles.md) · [English](design-principles.en.md)

Generic principles (trigger/response, proportion, layers, levels, sound consent, ethical loops, QA) are [Game Feel’s](https://github.com/jorgefsb/game-feel/blob/main/docs/design-principles.en.md). This guide adds personal-brand rules. In a conflict this profile governs personal-brand pages.

## Scope

- Applies to Jorge Suárez personal-brand pages/apps.
- Does not apply to other brands/companies. They keep their identity and, if desired, use Game Feel with their own profile and permission.
- Ask before editing if ownership is unclear.

## Content stays unchanged

Align format, not substance. Text, figures, sections, links, CTAs and language selectors remain. New text requires an approved proposal.

## Brand in two lines

- **Color:** background `#0A0A0A`, surface `#161616`, signature accent `#FF6B35`, amber `#FFA500`. Main text `#FFFFFF`, secondary `#B7B3AD`, border `#8A7E70`, ink `#22211F`. Paper/kraft remain kit proposals, not approved new-UI tokens. Dark ink on orange; never paper as text. No neon or glow. One accent per screen.
- **Type:** Outfit 700 headings, Inter 400 body through `--brand-font-heading` and `--brand-font-body`. Radii: 6 for controls, 12 cards, 18 panels.

The [public brandkit](https://brandkit.jorgesuarez.com.mx/) is authoritative in any conflict.

## Responses

- `jz-tap` on buttons; success on form completion, shake for errors, celebrations only for significant moments (confirmed payment, all Mokis found).
- Existing integration particles use `#FF6B35`, `#FFA500`, `#F4E8D5` behind text. The last value is existing runtime behavior, not approval of paper-colored text or new paper UI.
- Brief accent flash, no glow; only `transform`/`opacity`; no permanent loops.

## Sound

Initially enabled (`data-jz-sound="on"`) with visible mute control. Respect saved mute. Never sound before a gesture. juice sounds under 150 ms; brand exceptions: Moki’s “¡Ay!” and party fanfare.

## Moki, always

- Always present; without Moki this is not Papacito Juice.
- Only authorized Moki-library artwork. Never mirrored. New poses require brandkit rules and a new package version.
- Daily hiding spots: `arriba`, `saluda`, `cuelga`, `asoma`, with `data-moki-id`. More spots than `data-moki-show`. Never repeat a pose on a page.
- Never cover text/buttons. Still in Nada; responds at key moments.
- Finding all today’s Mokis celebrates and unlocks Hardcore. A real achievement, not a shortcut.

## Return loop

Daily hide-and-seek changes spots every day. Streak only congratulates, never punishes. No false scarcity, invented counters or personal data.

## Page rules

- Every page links back to https://jorgesuarez.com.mx.
- Minimum 44 px tap targets, no covered buttons, working languages.
- No visible internal notes in public copy.
