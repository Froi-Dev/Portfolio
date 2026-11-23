import { STACK } from '../data/portfolio.js';
import '../inner-pages.css';

const localLogos = {
  HTML: 'stack/html',
  CSS: 'stack/css',
  JavaScript: 'javascript',
  React: 'react',
  Bootstrap: 'stack/bootstrap',
  'Tailwind CSS': 'stack/tailwindcss',
  'Kotlin (Mobile)': 'kotlin',
  'Node.js': 'nodejs',
  PHP: 'stack/php',
  MySQL: 'mysql',
  MongoDB: 'stack/mongodb',
  PostgreSQL: 'stack/postgres',
  Supabase: 'stack/supabase',
  OAuth: 'stack/oauth',
  Firebase: 'stack/firebase',
  ChatGPT: 'stack/openai',
  Claude: 'stack/claude',
  'Claude Code': 'stack/claude-code',
  Codex: 'stack/codex',
  'Hugging Face': 'stack/hugging-face',
  Gemini: 'stack/gemini',
  Cursor: 'stack/cursor',
  'GitHub Copilot': 'stack/github-copilot',
  Git: 'git',
  GitHub: 'stack/github',
  Figma: 'stack/figma',
  'VS Code': 'stack/visual-studio-code',
  'Antigravity IDE': 'stack/antigravity',
  'Android Studio': 'stack/androidstudio',
  'Cloudflare Pages': 'stack/cloudflarepages',
  Render: 'stack/render',
  Neon: 'stack/neon',
  Docker: 'stack/docker',
};

const iconPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icons/`;

function TechnologyIcon({ name }) {
  const logo = localLogos[name];
  return logo ? <img src={`${iconPath}${logo}.svg`} width="22" height="22" alt="" loading="lazy" /> : null;
}

export default function TechStack() {
  return (
    <section className="content-section stack" id="stack" tabIndex={-1} aria-labelledby="stack-title">
      <div className="wrap">
        <header className="section-heading">
          <h2 id="stack-title">Tech stack</h2>
          <p>The languages, frameworks, and tools I use to build and ship software.</p>
        </header>
        <div className="toolkit-directory">
          {STACK.map(group => (
            <section className="toolkit-group" key={group.category}>
              <h3>{group.category}</h3>
              <ul className="toolkit-items">
                {group.items.map(item => (
                  <li key={item.name}>
                    <TechnologyIcon name={item.name} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
