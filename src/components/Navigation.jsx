import Link from 'next/link';
import Icon from './Icon.jsx';
import ChristmasIcon from './ChristmasIcon.jsx';

const links = [
  ['home', 'Home', 'house'], ['about', 'About', 'person'],
  ['projects', 'Projects', 'grid'], ['stack', 'Stack', 'layers'], ['certifications', 'Certifications', 'patch-check'], ['contact', 'Contact', 'chat-square-text'],
];

export default function Navigation({ theme, setTheme, activeSection }) {
  return <aside className="sidebar" aria-label="Site navigation">
    <Link className="sidebar-brand" href="/" aria-label="Froilan De Vera, home"><span className="brand-name">Froilan De Vera</span></Link>
    <div className="sidebar-main">
      <span className="sidebar-label">Explore</span>
      <nav className="side-links" aria-label="Primary">{links.map(([id, label, icon], index) =>
        <Link href={id === 'home' ? '/' : `/${id}/`} key={id} className={`side-link ${activeSection === id ? 'is-active' : ''}`} aria-label={label} aria-current={activeSection === id ? 'page' : undefined}><Icon name={icon} /><span className={id === 'certifications' ? 'nav-cert-label' : ''}>{label}</span>{id === 'certifications' && <span className="nav-cert-short" aria-hidden="true">Certs</span>}<span className="nav-index">F{index + 1}</span></Link>
      )}</nav>
      <div className="sidebar-note"><span className="mini-label">Currently</span><p>Turning ideas into<br />things people use.</p></div>
    </div>
    <div className="sidebar-bottom">
      <div className="theme-row"><span className="mini-label">Appearance</span><div className="theme-switch" role="group" aria-label="Color theme"><button onClick={() => setTheme('light')} aria-label="Light theme" aria-pressed={theme === 'light'}><Icon name="sun" /></button><button onClick={() => setTheme('dark')} aria-label="Dark theme" aria-pressed={theme === 'dark'}><Icon name="moon-stars" /></button></div></div>
      <div className="sidebar-christmas"><strong><ChristmasIcon name="gift" /> Merry Christmas!</strong><p><ChristmasIcon name="tree" /> Building, learning,<br />and shipping in the<br />holiday spirit.</p><small>© Froilan De Vera. All rights reserved.</small></div>
    </div>
  </aside>;
}
