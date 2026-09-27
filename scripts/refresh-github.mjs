import { readFile, writeFile } from 'node:fs/promises';

const username = 'Froi-Dev';
const source = `https://github.com/users/${username}/contributions`;
const destination = new URL('../src/data/github-contributions.json', import.meta.url);
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

try {
  const response = await fetch(source, {
    headers: { Accept: 'text/html', 'User-Agent': 'Froi-Dev-Portfolio' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  const html = await response.text();
  const counts = new Map();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const count = match[2].trim().match(/^(No|[\d,]+) contributions? on /);
    if (count) counts.set(attribute(match[1], 'for'), count[1] === 'No' ? 0 : Number(count[1].replaceAll(',', '')));
  }
  const days = [...html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)].map(([tag]) => ({
    date: attribute(tag, 'data-date'),
    count: counts.get(attribute(tag, 'id')),
    level: Number(attribute(tag, 'data-level')),
  })).sort((a, b) => a.date.localeCompare(b.date));
  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const total = totalMatch ? Number(totalMatch[1].replaceAll(',', '')) : NaN;
  // Preserve the previous snapshot if GitHub changes its HTML or returns incomplete data.
  if (days.length < 365 || new Set(days.map(day => day.date)).size !== days.length ||
      days.some(day => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || !Number.isInteger(day.level) || day.level < 0 || day.level > 4) ||
      days.reduce((sum, day) => sum + day.count, 0) !== total) {
    throw new Error('GitHub calendar data was incomplete or changed format');
  }
  await writeFile(destination, JSON.stringify({ username, total, fetchedAt: new Date().toISOString(), source, days }, null, 2) + '\n');
  console.log(`Updated @${username}: ${total} contributions across ${days.length} days.`);
} catch (error) {
  let cached;
  try { cached = JSON.parse(await readFile(destination, 'utf8')); } catch { /* No usable fallback. */ }
  if (process.argv.includes('--allow-stale') && cached?.days?.length && cached.username === username) {
    console.warn(`GitHub refresh unavailable (${error.message}). Keeping snapshot from ${cached.fetchedAt}.`);
  } else {
    console.error(`Could not refresh GitHub contributions: ${error.message}`);
    process.exitCode = 1;
  }
}
