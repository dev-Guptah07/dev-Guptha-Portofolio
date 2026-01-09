import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'src');
const badLines = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (/\.\w+$/.test(full)) {
      const ext = path.extname(full).toLowerCase();
      if (['.js', '.ts', '.vue', '.css', '.scss', '.html'].includes(ext)) {
        const content = fs.readFileSync(full, 'utf8');
        const lines = content.split(/\r?\n/);
        lines.forEach((line, i) => {
          const m = line.match(/font-family\s*:\s*(.*);?/i);
          if (m) {
            // if the same line does not include var(--) then flag it
            if (!/var\(--/.test(line)) {
              badLines.push({ file: full, line: i + 1, text: line.trim() });
            }
          }
        });
      }
    }
  }
}

walk(root);

if (badLines.length) {
  console.error('\nFound literal `font-family` usages (not using CSS tokens):\n');
  badLines.forEach(b => console.error(`${b.file}:${b.line}  ${b.text}`));
  console.error('\nPlease update these to use CSS tokens (e.g. var(--font-futuristic)) or your utility classes.');
  process.exit(1);
}

console.log('No literal font-family usages detected.');
process.exit(0);
