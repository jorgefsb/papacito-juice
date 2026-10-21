// Contract tests for src/papacito-juice.js in a minimal DOM stand-in.
// The browser suite repeats the important checks with the real packages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const SOURCE = readFileSync(new URL('../../src/papacito-juice.js', import.meta.url), 'utf8');
const BASE = 'http://site.test/vendor/juice/1.2.0/moki/';

function load({ attrs = { 'data-jz-sound': 'on' }, jz = { level: 'subtle' }, jzh = { version: '1.2.0' }, moki = 'ok', dock = true, gameFeel = 'ok', broken = [] } = {}) {
  const map = new Map(Object.entries(attrs));
  const writes = [];
  const mounts = [];
  const document = {
    documentElement: {
      getAttribute: k => (map.has(k) ? map.get(k) : null),
      setAttribute: (k, v) => { writes.push(k); map.set(k, v); },
      removeAttribute: k => { writes.push(k); map.delete(k); }
    },
    querySelector: sel => {
      if (sel === '.jz-dock') return dock ? {} : null;
      if (sel === '.moki .moki__img') return { src: BASE + 'moki-frente.webp' };
      return null;
    }
  };
  class Image {
    decode() {
      const name = this.src.slice(BASE.length);
      return broken.includes(name) ? Promise.reject(new Error('404')) : Promise.resolve();
    }
  }
  const win = {
    document, Image, JZ: jz, JZH: jzh,
    Moki: moki === 'ok' ? { version: '1.2.0', poses: () => ['frente', 'saluda'], found: () => [] } : moki,
    GameFeelCursor: gameFeel === 'ok' ? {
      mount(o) {
        const h = { options: o, destroyed: false, destroy() { h.destroyed = true; } };
        mounts.push(h);
        return h;
      }
    } : gameFeel
  };
  win.window = win;
  vm.runInNewContext(SOURCE, win);
  return { pj: win.PapacitoJuice, mounts, writes, map };
}

test('profile: juice 1.2.0, Moki, sound on, home starts full, other pages subtle', () => {
  const { pj } = load();
  assert.equal(pj.profile.mascot, 'Moki');
  assert.equal(pj.profile.juice, '1.2.0');
  assert.equal(pj.profile.sound, 'on');
  assert.deepEqual({ ...pj.profile.start }, { home: 'full', page: 'subtle' });
  assert.equal(pj.artwork.length, 12);
});

test('mount runs the same generic adapter, always following Juega', async () => {
  const { pj, mounts, writes } = load();
  const h = await pj.mount({ color: '#FF6B35', followJuice: false });
  assert.equal(mounts.length, 1);
  assert.equal(mounts[0].options.followJuice, true);
  assert.equal(mounts[0].options.requireJuice, true);
  assert.equal(mounts[0].options.color, '#FF6B35');
  assert.ok(!('page' in mounts[0].options) && !('gameFeel' in mounts[0].options));
  assert.deepEqual(h.poses, ['frente', 'saluda']);
  assert.deepEqual(writes, [], 'the profile writes no attribute itself');
  assert.equal(pj.current, h);
  h.destroy();
  assert.equal(mounts[0].destroyed, true);
  assert.equal(pj.current, null);
});

test('repeated mount keeps one cursor', async () => {
  const { pj, mounts } = load();
  await pj.mount();
  await pj.mount();
  assert.equal(mounts.filter(m => !m.destroyed).length, 1);
});

const rejects = async (opts, mountOpts, pattern) => {
  const env = load(opts);
  await assert.rejects(env.pj.mount(mountOpts), pattern);
  assert.equal(env.mounts.length, 0, 'nothing is mounted');
  assert.deepEqual(env.writes, [], 'nothing is changed');
};

test('missing Moki is an error, never a silent success', async () => {
  await rejects({ moki: null }, undefined, /authorized Moki 1\.2\.0 is not installed.*always includes Moki/);
  await rejects({ moki: { version: '1.1.0', poses: () => ['frente'] } }, undefined, /Moki 1\.2\.0/);
  await rejects({ moki: { version: '1.2.0', poses: () => [] } }, undefined, /no hide spots/);
});

test('missing Moki artwork is reported by file name', async () => {
  await rejects({ broken: ['moki-espalda.webp', 'moki-asoma.webp'] }, undefined, /moki-asoma\.webp, moki-espalda\.webp/);
});

test('missing juice, menu, Hardcore or adapter are errors', async () => {
  await rejects({ jz: null }, undefined, /window\.JZ/);
  await rejects({ dock: false }, undefined, /Juega menu/);
  await rejects({ jzh: null }, undefined, /hardcore/);
  await rejects({ gameFeel: null }, undefined, /GameFeelCursor/);
});

test('start level is page configuration, checked before anything runs', async () => {
  await rejects({}, { page: 'home' }, /add <html data-jz-default="full">/);
  await rejects({ attrs: { 'data-jz-sound': 'on', 'data-jz-default': 'full' } }, { page: 'page' }, /remove <html data-jz-default="full">/);
  await rejects({ attrs: {} }, undefined, /data-jz-sound="on"/);
  await rejects({}, { page: 'landing' }, /unknown page/);
  const { pj } = load({ attrs: { 'data-jz-sound': 'on', 'data-jz-default': 'full' } });
  assert.equal((await pj.mount({ page: 'home' })).page, 'home');
});

test('never sets level, sound or the Hardcore unlock', () => {
  assert.ok(!/setLevel|localStorage|data-jz-hard|jz-hard/.test(SOURCE.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')));
});
