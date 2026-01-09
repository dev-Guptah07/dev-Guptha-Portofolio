import https from 'https';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'public', 'fonts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const families = [
  { name: 'Orbitron', css: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400&display=swap', out: 'Orbitron-Regular.woff2', pkg: 'orbitron', weights: [400] },
  { name: 'Press Start 2P', css: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap', out: 'PressStart2P-Regular.woff2', pkg: 'press-start-2p', weights: [400] },
  { name: 'Poppins', css: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap', outBase: 'Poppins', pkg: 'poppins', weights: [400,500,700] },
];

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/css, */*', ...headers } };
    https.get(url, options, (res) => {
      if (res.statusCode && res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function extractWoff2UrlsFromCss(css) {
  // match url(...) that ends with .woff2
  const re = /url\((https?:[^\)]+\.woff2)\)/g;
  const matches = [];
  let m;
  while ((m = re.exec(css)) !== null) matches.push(m[1]);
  return matches;
}

async function fetchFromWebfontsHelper(family) {
  // Use google-webfonts-helper API as fallback
  const name = encodeURIComponent(family.toLowerCase().replace(/\s+/g, '-'));
  const url = `https://google-webfonts-helper.herokuapp.com/api/fonts/${name}?subsets=latin`;
  try {
    const buf = await fetchUrl(url, { Accept: 'application/json' });
    const json = JSON.parse(buf.toString('utf8'));
    const woff2s = [];
    if (json && json.variants) {
      for (const v of json.variants) {
        if (v && v.files && v.files.woff2) woff2s.push({ weight: v.fontWeight || v.weight || '400', url: v.files.woff2 });
      }
    }
    return woff2s;
  } catch (e) {
    console.error(`  Helper API failed for ${family}: ${e.message}`);
    return [];
  }
}

(async () => {
  try {
    for (const fam of families) {
      console.log(`Processing ${fam.name}...`);
      let cssBuf;
      try {
        cssBuf = await fetchUrl(fam.css);
      } catch (e) {
        console.warn(`  Could not fetch Google CSS for ${fam.name}: ${e.message}`);
      }

      let urls = [];
      if (cssBuf) {
        const css = cssBuf.toString('utf8');
        urls = extractWoff2UrlsFromCss(css);
      }

      if (urls.length === 0) {
        // fallback: use google-webfonts-helper API
        console.log(`  No woff2 URL found in CSS for ${fam.name}, trying helper API...`);
        const helper = await fetchFromWebfontsHelper(fam.name);
        if (helper && helper.length) {
          urls = helper.map(h => h.url);
        }
      }

      // Next fallback: try CDN via @fontsource packages (jsdelivr/unpkg)
      if (urls.length === 0 && fam.pkg) {
        console.log(`  No woff2 URLs found yet for ${fam.name}, trying CDN @fontsource package (${fam.pkg})...`);
        const cdnUrls = [];
        for (const w of fam.weights || [400]) {
          const fileName = `${fam.pkg}-latin-${w}-normal.woff2`;
          const candidates = [
            `https://cdn.jsdelivr.net/npm/@fontsource/${fam.pkg}/files/${fileName}`,
            `https://unpkg.com/@fontsource/${fam.pkg}/files/${fileName}`,
          ];
          for (const c of candidates) {
            try {
              // try a quick fetch to see if it exists
              await fetchUrl(c, { Accept: '*/*' });
              cdnUrls.push(c);
              break; // found this weight
            } catch (e) {
              // continue to next candidate
            }
          }
        }
        if (cdnUrls.length) urls = cdnUrls;
      }

      if (urls.length === 0) {
        console.error(`  No woff2 URLs found for ${fam.name} — skipping.`);
        continue;
      }

      if (fam.outBase) {
        // for families that have multiple weights, pick up to 3 common weights
        const uniq = [...new Set(urls)];
        const wanted = uniq.slice(0, 3); // Regular, Medium, Bold
        let idx = 0;
        for (const u of wanted) {
          const outName = `${fam.outBase}-${idx === 0 ? 'Regular' : idx === 1 ? 'Medium' : 'Bold'}.woff2`;
          console.log(`  Downloading ${outName} from ${u}`);
          const data = await fetchUrl(u);
          fs.writeFileSync(path.join(outDir, outName), data);
          idx++;
        }
      } else {
        const u = urls[0];
        console.log(`  Downloading ${fam.out} from ${u}`);
        const data = await fetchUrl(u);
        fs.writeFileSync(path.join(outDir, fam.out), data);
      }
    }
    console.log('\nDone. Fonts saved to public/fonts/.');
  } catch (err) {
    console.error('Error fetching fonts:', err);
    process.exitCode = 1;
  }
})();
