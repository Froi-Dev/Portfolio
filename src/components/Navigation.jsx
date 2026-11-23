import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { portfolioHref, portfolioSections } from '../lib/portfolioLinks.js';

const sections = Object.entries(portfolioSections);

function moveLinkFocus(event) {
  if (!['ArrowUp', 'ArrowDown'].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
  const links = Array.from(event.currentTarget.querySelectorAll('a'));
  const index = links.indexOf(document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  links[index + (event.key === 'ArrowDown' ? 1 : -1)]?.focus({ preventScroll: true });
}

function SectionLinks({ active, onPortfolio, onNavigate }) {
  return (
    <ul className="site-nav-list">
      {sections.map(([id, label], index) => (
        <li key={id}>
          <a href={portfolioHref(id, onPortfolio)} aria-current={index === active ? 'location' : undefined}
            onClick={onNavigate}>
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Navigation({ onPortfolio }) {
  const [current, setCurrent] = useState(0);
  const drawer = useRef(null);
  const menu = useRef(null);
  const active = onPortfolio ? current : -1;

  useEffect(() => {
    if (!onPortfolio) return;
    const targets = sections.map(([id]) => document.getElementById(id));
    let frame = 0;

    function update() {
      frame = 0;
      const viewport = window.innerHeight;
      const bottom = document.documentElement.scrollHeight - viewport;
      if (bottom > 0 && window.scrollY >= bottom - 2) {
        setCurrent(sections.length - 1);
        return;
      }

      const next = targets.findLastIndex(section => section && section.getBoundingClientRect().top <= viewport * .32);
      setCurrent(Math.max(0, next));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, [onPortfolio]);

  useEffect(() => {
    function closeOutside(event) {
      const panel = drawer.current;
      if (panel?.open && !panel.contains(event.target)) panel.open = false;
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  function navigate(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (drawer.current?.open) drawer.current.open = false;
    if (!onPortfolio || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hash = event.currentTarget.hash;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleMenuKeys(event) {
    if (event.key !== 'Escape' || !drawer.current.open) return;
    event.preventDefault();
    drawer.current.open = false;
    menu.current?.focus();
  }

  return (
    <header className="site-header">
      <div className="wrap header-layout">
        <a className="wordmark" href={portfolioHref('home', onPortfolio)} aria-label="Froilan De Vera home">Froilan.</a>
        <nav className="site-nav desktop-nav" aria-label="Primary" onKeyDown={moveLinkFocus}>
          <SectionLinks active={active} onPortfolio={onPortfolio} onNavigate={navigate} />
        </nav>
        <details className="nav-drawer" ref={drawer} onKeyDown={handleMenuKeys}>
          <summary className="nav-menu" ref={menu} aria-controls="mobile-navigation">
            <Icon name="menu" className="nav-open-icon" />
            <Icon name="x-lg" className="nav-close-icon" />
            Menu
          </summary>
          <nav className="site-nav mobile-nav" id="mobile-navigation" aria-label="Primary" onKeyDown={moveLinkFocus}>
            <SectionLinks active={active} onPortfolio={onPortfolio} onNavigate={navigate} />
          </nav>
        </details>
      </div>
    </header>
  );
}
