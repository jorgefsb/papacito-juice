#!/usr/bin/env node
// Builds vendor/ for the Papacito Juice demo and the browser tests. Everything
// it writes is ignored by Git and checked against pinned sha256 values.
//
//   node scripts/setup-demo.mjs [--juice-dir DIR] [--cursor-dir DIR] [--cursor-css FILE] [--game-feel-dir DIR]
//   node scripts/setup-demo.mjs --verify-only
//
// Juice: all 20 files of juice 1.2.0, including Moki and its artwork. Default
// source is the pinned upstream commit. --juice-dir (or JUICE_DIR) reads a
// local copy of juice/1.2.0 instead. Moki artwork is not covered by this
// repository's MIT license. Fetch it only for the authorized personal-brand
// integration.
// Game Feel adapter: --game-feel-dir (or GAME_FEEL_DIR) points to a checkout of
// the game-feel repository. Without it, setup downloads the intended v1.0.0
// tag. The files must match the pinned hashes, so the profile always runs the
// same generic adapter.
// Cursor líquido: --cursor-dir (or CURSOR_LIQUIDO_DIR) takes either a release
// dist folder (cursor-liquido.js + cursor-liquido.css) or the approved source
// inputs (renderer, adapter, wrapper, with CSS via --cursor-css or
// CURSOR_LIQUIDO_CSS). Without it, setup downloads the intended v1.0.0
// release assets. Either way the renderer bytes must match the golden hash.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const VENDOR = join(ROOT, 'vendor');

const JUICE_COMMIT = 'f1b3b9c77a43ffbcbd331bb88420a436614fdbc3';
export const JUICE = Object.freeze({
  version: '1.2.0',
  repository: 'https://github.com/jorgefsb/game-industry-resources',
  commit: JUICE_COMMIT,
  base: 'https://raw.githubusercontent.com/jorgefsb/game-industry-resources/' + JUICE_COMMIT + '/juice/1.2.0/',
  manifestSha256: 'a4da3499b6e171221a11477c839e08fadbbc846fc687266c5007bace6a2c6568',
  // Every file of that commit's manifest.json, re-checked against it on each run.
  files: Object.freeze({
    'juice.css': '2d02b3e2d968cd5afe9b6174979255b97aa7ad8793c682273a85976f06058981',
    'juice.js': '79ef95b5ee106fcc477f2f79c13bce8dae82401a28a91f328e53f152ac4d9995',
    'juice-menu.css': '1e6d00d4e95c2b6640fd5eb9470552c75eea2744698b8267287c1b80a79edabc',
    'juice-menu.js': '00f0edeb1246003927b1ce8c8ecdc75bfccee46d753a6caac0cf71aa6333b596',
    'hardcore/hardcore.css': '0c727d475e66651f12c5d5a618e1fed365ae1a78195a82f2ca56a07e18f01bcb',
    'hardcore/hardcore.js': 'b4671dfaf0b5853d4f5c950c66cc8920da245c95c7b836ec682af15b1c70dd70',
    'moki/moki.css': 'cf3d67c72dbba1b009d6b78bfc997b5c4f0d85857fb5da1d83a339bac7a68cd2',
    'moki/moki.js': '1d0ab98882934e7a16db6ac27026375664a2415bd2b362f30b263c5ef8ef7b96',
    'moki/moki-asoma.webp': '120bab003c3c676429d88c765dc151a141456845bf22a0674b5c8daf6104f6c0',
    'moki/moki-bandera.webp': 'b3f88a40d4b42232b19febee34e88228ea620dbbfce5a188d5efe5d92e40517a',
    'moki/moki-compu.webp': 'c0fce7567b56c6b93fd3739bcbf98dfc23b32be0abd8cfe717279a3a503a21ed',
    'moki/moki-espalda.webp': 'fd927e2b4a0c65945271679da92a36a81790a94f96e5e03ac8428a2df56446d1',
    'moki/moki-frente.webp': '8de9419f11168bfaf619c81951257e93793ca92b2b960f234b3a5868e699bb15',
    'moki/moki-jugando.webp': '7f3017a91af7b89bd3818eba8f9c0ea799b81d081c8c6c1a2e1471ad36040a7c',
    'moki/moki-lado.webp': '0917c50e6d02c2666443b91598c4ffb698790ed5cab53f34cbb92eb9532fc376',
    'moki/moki-parado.webp': '5e1249af0e16d1f5bebc0de1c71a9048a722db626eb2b859aca7643bb4086ad6',
    'moki/moki-parche.webp': '593d96de0c148d0aeaaaa1323193a7c3fbd9e5b96fb072c3d4be6918044e2a9f',
    'moki/moki-saluda.webp': '8d1f8624634a9f89a52df3edb910ec073e90fa5a5c6263f241b8dca93ea4dfa0',
    'moki/moki-tres-cuartos.webp': '35e671758b36e8219287a04ed6ad6ca1eae26d7da980be8b48a71a3a705580d6',
    'moki/moki-verifica.webp': '09f06fa76797e44399112caf0ea41e201869694638da7decf95f3bb49ab3e903'
  })
});

export const CURSOR = Object.freeze({
  version: '1.0.0',
  repository: 'https://github.com/jorgefsb/cursor-liquido',
  release: 'https://github.com/jorgefsb/cursor-liquido/releases/download/v1.0.0/',
  goldenEngineSha256: '3d478cc836969c216812c7e479724e0e204bbb76a26df24c2414568883021230',
  engineHeader: '/* Fluid cursor v3. Original site module',
  engineBytes: 31176,
  // Approved recovery inputs, accepted only byte for byte.
  sources: Object.freeze({
    renderer: Object.freeze({ file: 'approved-fluid-v3.1.js', sha256: '3d478cc836969c216812c7e479724e0e204bbb76a26df24c2414568883021230' }),
    adapter: Object.freeze({ file: 'approved-engine-adapter.js', sha256: '570bb84eea0856393c106d28a8cc01a18a269ffae31c453d30d88be72372ab2c' }),
    wrapper: Object.freeze({ file: 'liquid-cursor-recovery.js', sha256: 'e4752f306a54c382f996a21cc7469b6dda570a408583b2d16e1d7f5b3e8c33d0' })
  })
});

export const GAME_FEEL = Object.freeze({
  version: '1.0.0',
  repository: 'https://github.com/jorgefsb/game-feel',
  base: 'https://raw.githubusercontent.com/jorgefsb/game-feel/v1.0.0/src/',
  files: Object.freeze({
    'game-feel-cursor.js': '8498ccadcd8ec2d15b9ae14298b0ce26de43a15293fc5daa932e2b4f1a83f4f6',
    'game-feel-cursor.css': 'f523415013433dbef415483a1e68258a9833b42edcccea1d2f8bae3ba4837114'
  })
});

export const sha256 = buf => createHash('sha256').update(buf).digest('hex');

// The renderer travels verbatim inside every bundle. Find it and hash it.
export function engineSha256(bundle) {
  const at = bundle.indexOf(Buffer.from(CURSOR.engineHeader));
  if (at < 0) return null;
  return sha256(bundle.subarray(at, at + CURSOR.engineBytes));
}

export function checkCursorBundle(bundle) {
  const found = engineSha256(bundle);
  if (found !== CURSOR.goldenEngineSha256) {
    throw new Error('cursor-liquido.js does not contain the approved renderer (found ' + found + ', expected ' + CURSOR.goldenEngineSha256 + ')');
  }
  const text = bundle.toString('utf8');
  for (const marker of ['root.FluidEngine=ApprovedEngineAdapter', 'root.LiquidCursor = LiquidCursor']) {
    if (!text.includes(marker)) throw new Error('cursor-liquido.js is missing ' + marker);
  }
}

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--verify-only') out.verifyOnly = true;
    else if (['--juice-dir', '--cursor-dir', '--cursor-css', '--game-feel-dir'].includes(a)) out[a.slice(2)] = argv[++i];
    else throw new Error('unknown argument ' + a);
  }
  return out;
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
  return Buffer.from(await res.arrayBuffer());
}

function expectHash(name, buf, expected) {
  const got = sha256(buf);
  if (got !== expected) throw new Error(name + ': sha256 ' + got + ' does not match ' + expected);
}

async function juiceFiles(dir) {
  const read = name => dir ? readFileSync(join(dir, name)) : download(JUICE.base + name);
  const manifestBuf = await read('manifest.json');
  expectHash('juice manifest.json', manifestBuf, JUICE.manifestSha256);
  const manifest = JSON.parse(manifestBuf);
  if (manifest.version !== JUICE.version) throw new Error('juice manifest version ' + manifest.version);
  const out = new Map([['manifest.json', manifestBuf]]);
  for (const [name, pinned] of Object.entries(JUICE.files)) {
    if (manifest.files[name]?.sha256 !== pinned) throw new Error('pin for ' + name + ' differs from the upstream manifest');
    const buf = await read(name);
    expectHash('juice ' + name, buf, pinned);
    out.set(name, buf);
  }
  return out;
}

async function gameFeelFiles(dir) {
  const out = new Map();
  for (const [name, pinned] of Object.entries(GAME_FEEL.files)) {
    let buf;
    try {
      buf = dir ? readFileSync(join(dir, 'src', name)) : await download(GAME_FEEL.base + name);
    } catch (error) {
      throw new Error('Game Feel adapter not available (' + error.message + '). Pass --game-feel-dir with a game-feel checkout.');
    }
    expectHash('game-feel ' + name, buf, pinned);
    out.set(name, buf);
  }
  return out;
}

async function cursorFiles(dir, cssFile) {
  if (!dir) {
    let js, css, manifest;
    try {
      [js, css, manifest] = await Promise.all(['cursor-liquido.js', 'cursor-liquido.css', 'manifest.json'].map(n => download(CURSOR.release + n)));
    } catch (error) {
      throw new Error('Cursor líquido v1.0.0 release assets are not reachable (' + error.message + '). Pass --cursor-dir with a local release dist folder.');
    }
    return { js, css, origin: 'release ' + CURSOR.release, manifest: JSON.parse(manifest) };
  }
  if (existsSync(join(dir, 'cursor-liquido.js'))) {
    const js = readFileSync(join(dir, 'cursor-liquido.js'));
    const css = readFileSync(cssFile || join(dir, 'cursor-liquido.css'));
    const manifestPath = join(dir, 'manifest.json');
    return { js, css, origin: 'local release dist', manifest: existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath)) : null };
  }
  // Approved source inputs: bundle them in the release load order.
  const parts = Object.values(CURSOR.sources).map(({ file, sha256: pinned }) => {
    const buf = readFileSync(join(dir, file));
    expectHash('cursor ' + file, buf, pinned);
    return buf;
  });
  if (!cssFile) throw new Error('approved source inputs carry no CSS; pass --cursor-css with liquid-cursor.css');
  const banner = Buffer.from('/*! Cursor líquido, approved inputs bundled locally for tests. MIT (c) 2026 Jorge Suárez; fluid shading adapted from Pavel Dobryakov (2017), MIT.\n * golden_engine_sha256 ' + CURSOR.goldenEngineSha256 + ' */\n');
  return { js: Buffer.concat([banner, ...parts]), css: readFileSync(cssFile), origin: 'approved source inputs', manifest: null };
}

// When a release manifest is available, its hashes must agree as well.
function checkAgainstManifest(cursor) {
  if (!cursor.manifest) return;
  const files = cursor.manifest.files || {};
  if (cursor.manifest.golden_engine_sha256 !== CURSOR.goldenEngineSha256) throw new Error('cursor manifest golden_engine_sha256 differs');
  for (const [name, buf] of [['cursor-liquido.js', cursor.js], ['cursor-liquido.css', cursor.css]]) {
    const entry = files['dist/' + name] || files[name];
    if (!entry) throw new Error('cursor manifest lists no ' + name);
    expectHash('cursor ' + name, buf, entry.sha256);
  }
}

function write(rel, buf) {
  const abs = join(VENDOR, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, buf);
}

// Re-hash what is on disk. Tests call this before opening a browser.
export function verifyVendor() {
  const report = JSON.parse(readFileSync(join(VENDOR, 'setup-report.json'), 'utf8'));
  const juiceDir = join(VENDOR, 'juice', JUICE.version);
  expectHash('vendor juice manifest.json', readFileSync(join(juiceDir, 'manifest.json')), JUICE.manifestSha256);
  for (const [name, pinned] of Object.entries(JUICE.files)) expectHash('vendor juice ' + name, readFileSync(join(juiceDir, name)), pinned);
  for (const [name, pinned] of Object.entries(GAME_FEEL.files)) expectHash('vendor game-feel ' + name, readFileSync(join(VENDOR, 'game-feel', name)), pinned);
  const js = readFileSync(join(VENDOR, 'cursor-liquido', 'cursor-liquido.js'));
  checkCursorBundle(js);
  expectHash('vendor cursor-liquido.js', js, report.cursor.files['cursor-liquido.js']);
  expectHash('vendor cursor-liquido.css', readFileSync(join(VENDOR, 'cursor-liquido', 'cursor-liquido.css')), report.cursor.files['cursor-liquido.css']);
  return report;
}

export async function setup(options = {}) {
  const juiceDir = options['juice-dir'] || process.env.JUICE_DIR;
  const cursorDir = options['cursor-dir'] || process.env.CURSOR_LIQUIDO_DIR;
  const cursorCss = options['cursor-css'] || process.env.CURSOR_LIQUIDO_CSS;
  const juice = await juiceFiles(juiceDir && resolve(juiceDir));
  const gameFeelDir = options['game-feel-dir'] || process.env.GAME_FEEL_DIR;
  const gameFeel = await gameFeelFiles(gameFeelDir && resolve(gameFeelDir));
  const cursor = await cursorFiles(cursorDir && resolve(cursorDir), cursorCss && resolve(cursorCss));
  checkCursorBundle(cursor.js);
  checkAgainstManifest(cursor);

  rmSync(VENDOR, { recursive: true, force: true });
  for (const [name, buf] of juice) write(join('juice', JUICE.version, name), buf);
  write('cursor-liquido/cursor-liquido.js', cursor.js);
  write('cursor-liquido/cursor-liquido.css', cursor.css);
  for (const [name, buf] of gameFeel) write(join('game-feel', name), buf);
  // Origins are described, never written as local paths.
  const report = {
    juice: { version: JUICE.version, commit: JUICE.commit, origin: juiceDir ? 'local copy' : JUICE.base, files: Object.fromEntries([...juice].map(([n, b]) => [n, sha256(b)])) },
    gameFeel: { version: GAME_FEEL.version, origin: gameFeelDir ? 'local checkout' : GAME_FEEL.base, files: Object.fromEntries([...gameFeel].map(([n, b]) => [n, sha256(b)])) },
    cursor: { version: CURSOR.version, origin: cursor.origin, golden_engine_sha256: CURSOR.goldenEngineSha256, files: { 'cursor-liquido.js': sha256(cursor.js), 'cursor-liquido.css': sha256(cursor.css) } }
  };
  write('setup-report.json', Buffer.from(JSON.stringify(report, null, 2) + '\n'));
  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const opts = args(process.argv.slice(2));
    if (!opts.verifyOnly) console.log('Moki artwork is not MIT. It is downloaded for the authorized personal-brand integration only. See NOTICES.');
    const report = opts.verifyOnly ? verifyVendor() : await setup(opts);
    console.log((opts.verifyOnly ? 'vendor/ verified: ' : 'vendor/ ready: ') + (Object.keys(report.juice.files).length - 1) + ' juice files + manifest (Moki included), Game Feel adapter ' + report.gameFeel.version + ', cursor ' + report.cursor.origin + ', golden engine ' + CURSOR.goldenEngineSha256.slice(0, 12));
  } catch (error) {
    console.error('setup-demo: ' + error.message);
    process.exit(1);
  }
}
