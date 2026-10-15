import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const result = await build({
  root,
  configFile: false,
  plugins: [
    {
      name: 'standalone-hash-router',
      enforce: 'pre',
      transform(code, id) {
        if (id.replaceAll('\\', '/').endsWith('/src/main.jsx')) {
          return code.replace(/\bBrowserRouter\b/g, 'HashRouter');
        }
      },
    },
    react(),
  ],
  build: {
    write: false,
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    modulePreload: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});

if (Array.isArray(result)) throw new Error('Unexpected multiple build results');
const entries = result.output;
const htmlEntry = entries.find(x => x.type === 'asset' && x.fileName === 'index.html');
if (!htmlEntry) throw new Error('Missing index.html');
let html = String(htmlEntry.source);
for (const entry of entries) {
  if (entry.type === 'chunk') {
    if (entry.imports.length || entry.dynamicImports.length) throw new Error('Standalone bundle still has external imports');
    const script = entry.code.replace(/<\/script/gi, '<\\/script');
    const marker = new RegExp(`<script\\b[^>]*src="/?${entry.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*><\\/script>`);
    if (!marker.test(html)) throw new Error('Missing script reference: ' + entry.fileName);
    html = html.replace(marker, () => `<script type="module">${script}</script>`);
  } else if (entry.fileName.endsWith('.css')) {
    const css = String(entry.source).replace(/<\/style/gi, '<\\/style');
    const marker = new RegExp(`<link\\b[^>]*href="/?${entry.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`);
    if (!marker.test(html)) throw new Error('Missing stylesheet reference: ' + entry.fileName);
    html = html.replace(marker, () => `<style>${css}</style>`);
  } else if (entry.fileName !== 'index.html') {
    throw new Error('Unexpected separate asset: ' + entry.fileName);
  }
}
if (/<script\b[^>]*\bsrc=|<link\b[^>]*rel="stylesheet"/i.test(html)) {
  throw new Error('Standalone HTML still has external script or stylesheet references');
}
const packages = ['react', 'react-dom', 'react-router', 'react-router-dom', '@remix-run/router', 'scheduler'];
const licenses = [];
for (const pkg of packages) {
  const folder = path.join(root, 'node_modules', pkg);
  const info = JSON.parse(await readFile(path.join(folder, 'package.json'), 'utf8'));
  let text;
  for (const candidate of ['LICENSE', 'LICENSE.md', 'LICENSE.txt']) {
    try { text = await readFile(path.join(folder, candidate), 'utf8'); break; } catch {}
  }
  if (!text) throw new Error('Missing third-party license: ' + pkg);
  licenses.push(`${pkg} ${info.version}\n${text.trim()}`);
}
const licenseText = 'LinguaFlow bundled runtime dependencies\n\n' + licenses.join('\n\n==============================\n\n') + '\n';
const licenseComment = `\n<!--\n${licenseText.replaceAll('--', '- -')}-->\n`;
html += licenseComment;
await mkdir(path.join(root, 'docs'), { recursive: true });
await writeFile(path.join(root, '语流学习平台-免安装版.html'), html);
await writeFile(path.join(root, 'docs/index.html'), html);
await writeFile(path.join(root, 'THIRD_PARTY_LICENSES.txt'), licenseText);
console.log(`Standalone HTML: ${Buffer.byteLength(html)} bytes; scripts and styles are embedded. GitHub Pages copy synchronized.`);
