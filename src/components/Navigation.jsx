import Icon from './Icon.jsx';

const links = [
  ['home', 'Home', 'house'], ['about', 'About', 'person'],
  ['projects', 'Projects', 'grid'], ['stack', 'Stack', 'layers'], ['certifications', 'Certifications', 'patch-check'], ['contact', 'Contact', 'chat-square-text'],
];

export default function Navigation({ theme, setTheme, activeSection }) {
  return <aside className="sidebar" aria-label="Site navigation">
    <a className="sidebar-brand" href="#/home" aria-label="Froilan De Vera, home"><span className="brand-name">Froilan De Vera</span></a>
    <div className="sidebar-main">
      <span className="sidebar-label">Explore</span>
      <nav className="side-links" aria-label="Primary">{links.map(([id, label, icon], index) =>
        <a href={`#/${id}`} key={id} className={`side-link ${activeSection === id ? 'is-active' : ''}`} aria-label={label} aria-current={activeSection === id ? 'page' : undefined}><Icon name={icon} /><span className={id === 'certifications' ? 'nav-cert-label' : ''}>{label}</span>{id === 'certifications' && <span className="nav-cert-short" aria-hidden="true">Certs</span>}<span className="nav-index">0{index + 1}</span></a>
      )}</nav>
      <div className="sidebar-note"><span className="mini-label">Currently</span><p>Turning ideas into<br />things people use.</p></div>
    </div>
    <div className="sidebar-bottom">
      <div className="theme-row"><span className="mini-label">Appearance</span><div className="theme-switch" role="group" aria-label="Color theme"><button onClick={() => setTheme('light')} aria-label="Light theme" aria-pressed={theme === 'light'}><Icon name="sun" /></button><button onClick={() => setTheme('dark')} aria-label="Dark theme" aria-pressed={theme === 'dark'}><Icon name="moon-stars" /></button></div></div>
      <a className="sidebar-email" href="mailto:froilandevera.dev@gmail.com"><span>Have something in mind?</span>froilandevera.dev@gmail.com <Icon name="arrow-up-right" /></a>
      <span className="sidebar-location"><Icon name="geo-alt" /> Based in the Philippines</span>
    </div>
  </aside>;
}
