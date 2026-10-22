// Real browser suite for the Papacito Juice profile demo, with authorized Moki.
// Run `npm run setup` first. vendor/ is re-hashed before any page opens.
import assert from 'node:assert/strict';
import { JUICE, verifyVendor } from '../../scripts/setup-demo.mjs';
import { EXPECTED, chooseLevel, open, suite, sweep } from './harness.mjs';

const vendor = verifyVendor();
console.log('vendor verified: golden engine ' + vendor.cursor.golden_engine_sha256.slice(0, 12) + ', juice ' + vendor.juice.version + ' @ ' + vendor.juice.commit.slice(0, 7) + ', game-feel ' + vendor.gameFeel.version);

const PAGE = 'examples/';
const ready = page => page.evaluate(() => window.papacitoReady.then(() => true));
const stats = page => page.evaluate(() => PapacitoJuice.current.cursor.stats);
const INTERACTIVE = 'a, button:not(.moki), input, label, h1, h2, h3, p, output, .jz-dock, .idea-card';

// Every Moki box against every control or text box. Boxes include hidden states.
const overlaps = page => page.evaluate(sel => {
  const hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  const out = [];
  for (const m of document.querySelectorAll('.moki')) {
    const r = m.getBoundingClientRect();
    for (const el of document.querySelectorAll(sel)) {
      if (m.contains(el) || el.closest('.jz-panel[hidden]')) continue;
      const q = el.getBoundingClientRect();
      if (q.width && q.height && hit(r, q)) out.push(m.getAttribute('data-moki-spot') + ' x ' + (el.id || el.tagName));
    }
  }
  return out;
}, INTERACTIVE);

// Click every Moki of today, one after another, with real pointer events.
async function findAllMokis(page) {
  const spots = await page.locator('.moki').count();
  for (let i = 0; i < spots; i++) {
    await page.locator('.moki').nth(i).click();
    await page.waitForFunction(n => Moki.found().length === n, i + 1);
  }
  await page.waitForSelector('.moki-party');
  await page.waitForFunction(() => !document.querySelector('#jz-panel input[value=hard]').disabled);
  await page.keyboard.press('Escape');
  await page.evaluate(() => scrollTo(0, 0));
}

await suite('papacito-juice', async ({ browser, url, test, shot }) => {
  const page = await open(browser, url, PAGE);
  await ready(page);

  await test('stable 1.0.1 cursor and quality-safe adapter are loaded', async () => {
    const v = await page.evaluate(() => ({ cursor: LiquidCursor.version, gameFeel: GameFeelCursor.version, adapter: FluidEngine.name }));
    assert.deepEqual(v, { cursor: '1.0.1', gameFeel: '1.0.1', adapter: 'QualitySafeAdapter' });
    const input = await page.evaluate(() => {
      const cursor = getComputedStyle(document.body).cursor;
      scrollTo(0, 120);
      return new Promise(resolve => requestAnimationFrame(() => {
        const scroll = scrollY;
        scrollTo(0, 0);
        resolve({ cursor, scroll });
      }));
    });
    assert.notEqual(input.cursor, 'none', 'the native pointer must stay visible');
    assert.ok(input.scroll > 0, 'the cursor must not block scrolling');
    return { ...v, input };
  });

  await test('profile mounts with real Moki 1.2.0: distinct poses, authorized artwork bytes', async () => {
    const v = await page.evaluate(async files => {
      const poses = Moki.poses();
      const imgs = [...document.querySelectorAll('.moki .moki__img')];
      const hashes = {};
      for (const img of imgs) {
        await img.decode();
        const buf = await (await fetch(img.src)).arrayBuffer();
        const hex = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buf))].map(b => b.toString(16).padStart(2, '0')).join('');
        const name = 'moki/' + img.src.split('/').pop();
        hashes[name] = hex === files[name];
      }
      return { poses, spots: imgs.length, decoded: imgs.every(i => i.naturalWidth > 0), hashes, owner: document.documentElement.getAttribute('data-game-feel-cursor'), version: Moki.version };
    }, JUICE.files);
    assert.equal(v.version, '1.2.0');
    assert.equal(v.poses.length, 5);
    assert.equal(new Set(v.poses).size, 5, 'no pose repeats on the page');
    assert.ok(v.decoded);
    assert.ok(Object.values(v.hashes).every(Boolean), JSON.stringify(v.hashes));
    assert.equal(v.owner, 'liquid');
    return { poses: v.poses, owner: v.owner };
  });

  await test('Hardcore is locked until today\'s Mokis are found, the profile does not unlock it', async () => {
    const v = await page.evaluate(() => ({ disabled: document.querySelector('#jz-panel input[value=hard]').disabled, stored: localStorage.getItem('jz-hard'), attr: document.documentElement.getAttribute('data-jz-hard') }));
    assert.deepEqual(v, { disabled: true, stored: null, attr: null });
    return v;
  });

  for (const level of ['off', 'subtle', 'full']) {
    await test('Juega ' + level + ' maps to ' + EXPECTED[level].intensity + ', Moki stays', async () => {
      await chooseLevel(page, level);
      await sweep(page, [220, 470], [760, 640]);
      const s = await stats(page);
      for (const key of ['intensity', 'layer', 'radius']) assert.equal(s[key], EXPECTED[level][key]);
      const moki = await page.evaluate(() => ({ count: document.querySelectorAll('.moki').length, still: [...document.querySelectorAll('.moki')].every(m => m.classList.contains('is-still')) }));
      assert.equal(moki.count, 5);
      if (level === 'off') assert.ok(moki.still, 'Moki is still in Nada');
      await shot(page, 'desktop-' + level + '.png');
      return { intensity: s.intensity, radius: s.radius, moki };
    });
  }

  await test('finding all Mokis with real clicks unlocks Hardcore, which maps to 18 px', async () => {
    await findAllMokis(page);
    await chooseLevel(page, 'hard');
    // A fresh instance: SwiftShader can trip the engine's own frame budget
    // after the earlier sweeps, which pauses the fluid by design.
    await page.evaluate(() => PapacitoJuice.mount());
    await sweep(page, [180, 500], [800, 620], 30, 45);
    const v = await page.evaluate(() => {
      const old = [...document.querySelectorAll('.jzh-t')];
      return { found: Moki.found().length, stored: localStorage.getItem('jz-hard'), s: GameFeelCursor.current.stats, old: old.length, oldVisible: old.filter(e => getComputedStyle(e).display !== 'none').length };
    });
    assert.equal(v.found, 5);
    assert.equal(v.stored, '1', 'written by moki.js after the win');
    assert.equal(v.s.intensity, 'hardcore');
    assert.equal(v.s.fluid.radius, 18);
    assert.equal(v.s.fluid.state, 'running');
    assert.ok(v.old > 0);
    assert.equal(v.oldVisible, 0, 'one visible trail');
    await page.click('#tap');
    const celebration = await page.evaluate(() => [...document.querySelectorAll('.jzh-p')].filter(e => getComputedStyle(e).display !== 'none').length);
    assert.ok(celebration > 0);
    await shot(page, 'desktop-hard.png');
    return { found: v.found, intensity: v.s.intensity, oldTrailNodes: v.old, visibleOldTrail: v.oldVisible, celebrationParticles: celebration };
  });

  await test('clicks and typing work at every level', async () => {
    for (const level of ['off', 'subtle', 'full', 'hard']) {
      await chooseLevel(page, level);
      await page.fill('#note', '');
      await page.locator('#note').pressSequentially('Hola, ñandú 123');
      assert.equal(await page.inputValue('#note'), 'Hola, ñandú 123');
      await page.click('#save');
      assert.match(await page.textContent('#note-status'), /Nota guardada: Hola, ñandú 123/);
    }
    const layers = await page.evaluate(() => [...document.querySelectorAll('.liquid-cursor-layer,.liquid-original-dots')].map(e => getComputedStyle(e).pointerEvents));
    assert.ok(layers.every(p => p === 'none'));
    return 'ok';
  });

  await test('Moki never covers controls or text at 1280 px', async () => {
    const v = await overlaps(page);
    assert.deepEqual(v, []);
    return { overlaps: 0 };
  });

  await test('destroy restores compatibility, remount is clean', async () => {
    await page.evaluate(() => PapacitoJuice.current.destroy());
    const after = await page.evaluate(() => ({ owner: document.documentElement.hasAttribute('data-game-feel-cursor'), layers: document.querySelectorAll('.liquid-cursor-layer').length, moki: document.querySelectorAll('.moki').length, level: JZ.level }));
    assert.deepEqual(after, { owner: false, layers: 0, moki: 5, level: 'hard' });
    await page.evaluate(async () => { await PapacitoJuice.mount(); await PapacitoJuice.mount(); });
    const again = await page.evaluate(() => ({ layers: document.querySelectorAll('.liquid-cursor-layer').length, owner: document.documentElement.getAttribute('data-game-feel-cursor') }));
    assert.deepEqual(again, { layers: 2, owner: 'liquid' });
    return { after, again };
  });

  await test('same origin only, no console errors', async () => {
    assert.deepEqual(page.foreign, []);
    assert.deepEqual(page.errors, []);
    return { requests: page.requests.length };
  });
  await page.context().close();

  await test('missing moki.js: mount rejects with a clear error and changes nothing', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.route('**/moki/moki.js', r => r.abort());
    const q = await ctx.newPage();
    await q.goto(url + PAGE);
    const v = await q.evaluate(() => window.papacitoReady.then(() => 'mounted', e => e.message));
    const state = await q.evaluate(() => ({ owner: document.documentElement.hasAttribute('data-game-feel-cursor'), layers: document.querySelectorAll('.liquid-cursor-layer').length, shown: document.getElementById('cursor-status').textContent }));
    assert.match(v, /authorized Moki 1\.2\.0 is not installed/);
    assert.deepEqual({ owner: state.owner, layers: state.layers }, { owner: false, layers: 0 });
    assert.match(state.shown, /not installed/);
    await shot(q, 'missing-moki.png');
    await ctx.close();
    return { error: v };
  });

  await test('missing Moki artwork: mount rejects and names the file', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.route('**/moki/moki-verifica.webp', r => r.fulfill({ status: 404, body: 'not found' }));
    const q = await ctx.newPage();
    await q.goto(url + PAGE);
    const v = await q.evaluate(() => window.papacitoReady.then(() => 'mounted', e => e.message));
    assert.match(v, /artwork is missing or unreadable: moki-verifica\.webp/);
    assert.equal(await q.evaluate(() => document.documentElement.hasAttribute('data-game-feel-cursor')), false);
    await ctx.close();
    return { error: v };
  });

  await test('home pages start in Mucho through page configuration', async () => {
    const p = await open(browser, url, PAGE, { init: () => { new MutationObserver((_, o) => { if (document.documentElement) { document.documentElement.setAttribute('data-jz-default', 'full'); o.disconnect(); } }).observe(document, { childList: true }); } });
    const inner = await p.evaluate(() => window.papacitoReady.then(() => 'mounted', e => e.message));
    assert.match(inner, /remove <html data-jz-default="full">/, 'the demo declares page:"page", so a home config is refused');
    const v = await p.evaluate(async () => { const h = await PapacitoJuice.mount({ page: 'home' }); return { page: h.page, level: JZ.level, intensity: h.cursor.stats.intensity, stored: localStorage.getItem('jz-level') }; });
    assert.deepEqual(v, { page: 'home', level: 'full', intensity: 'mucho', stored: null });
    await p.context().close();
    return v;
  });

  await test('reduced motion from the first load: Nada, still Moki, no dots', async () => {
    const p = await open(browser, url, PAGE, { reducedMotion: 'reduce' });
    await ready(p);
    await sweep(p, [200, 500], [700, 560], 16, 45);
    const v = await p.evaluate(() => ({ level: JZ.level, intensity: PapacitoJuice.current.cursor.stats.intensity, dots: document.querySelectorAll('.liquid-original-dot').length, still: [...document.querySelectorAll('.moki')].every(m => m.classList.contains('is-still')), moki: document.querySelectorAll('.moki').length }));
    assert.deepEqual(v, { level: 'off', intensity: 'nada', dots: 0, still: true, moki: 5 });
    await p.context().close();
    return v;
  });

  await test("the visitor's mute and level choices are not overridden", async () => {
    const p = await open(browser, url, PAGE, { init: () => { localStorage.setItem('gamedev_sfx', 'off'); localStorage.setItem('jz-level', 'off'); } });
    await ready(p);
    const v = await p.evaluate(() => ({ pressed: document.querySelector('.juice-sfx').getAttribute('aria-pressed'), level: JZ.level, intensity: PapacitoJuice.current.cursor.stats.intensity, sfx: localStorage.getItem('gamedev_sfx'), stored: localStorage.getItem('jz-level') }));
    assert.deepEqual(v, { pressed: 'false', level: 'off', intensity: 'nada', sfx: 'off', stored: 'off' });
    await p.context().close();
    return v;
  });

  await test('375 px: Juega works, nothing overflows, Moki covers nothing', async () => {
    const p = await open(browser, url, PAGE, { viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
    await ready(p);
    // Test-only fixture: opens Hardcore without the daily hunt. Not a production setting.
    await p.evaluate(() => { document.documentElement.setAttribute('data-jz-hard', 'open'); document.dispatchEvent(new CustomEvent('jz:unlock-hard')); });
    const out = {};
    for (const level of ['off', 'subtle', 'full', 'hard']) {
      await chooseLevel(p, level);
      await p.click('#tap');
      const v = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, s: PapacitoJuice.current.cursor.stats.intensity }));
      assert.ok(v.sw <= v.iw, level + ' overflows: ' + v.sw + ' > ' + v.iw);
      assert.equal(v.s, EXPECTED[level].intensity);
      await p.evaluate(() => scrollTo(0, 0));
      await shot(p, 'mobile-' + level + '.png');
      out[level] = v.sw;
    }
    assert.deepEqual(await overlaps(p), []);
    assert.deepEqual(p.errors, []);
    await p.context().close();
    return out;
  });
});
