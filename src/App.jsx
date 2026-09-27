import { useEffect, useRef, useState } from 'react';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import TechStack from './components/TechStack.jsx';
import Contact from './components/Contact.jsx';
import Reveal from './components/Reveal.jsx';
import Certifications from './components/Certifications.jsx';
import AmbientPixels from './components/AmbientPixels.jsx';

const pages = { home: Hero, about: About, projects: Projects, stack: TechStack, certifications: Certifications, contact: Contact };
const pageNames = { home: 'Home', about: 'About', projects: 'Projects', stack: 'Stack', certifications: 'Certifications', contact: 'Contact' };
const currentPage = () => window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'home';

function initialTheme() {
  try { return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'; }
  catch { return 'dark'; }
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [page, setPage] = useState(currentPage);
  const mainRef = useRef(null);
  const Page = Object.hasOwn(pages, page) ? pages[page] : null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c0c0f' : '#ffffff');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage is optional. */ }
  }, [theme]);

  useEffect(() => {
    const update = () => setPage(currentPage());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  useEffect(() => {
    document.title = `${Object.hasOwn(pageNames, page) ? pageNames[page] : 'Page not found'} — Froilan De Vera`;
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  return <>
    <AmbientPixels theme={theme} />
    <a href="#main" className="skip-link" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
    <Navigation theme={theme} setTheme={setTheme} activeSection={page} />
    <div className="page-shell">
      <main id="main" ref={mainRef} tabIndex={-1} className={`route-main${page === 'home' ? ' route-main--home' : ''}`}>
        {Page ? <Reveal key={page} className="route-page"><Page /></Reveal> : <section className="content-section"><span className="eyebrow">404 / Page not found</span><h1>This page isn't here.</h1><a className="button button-primary" href="#/home">Back to Home</a></section>}
      </main>
    </div>
  </>;
}
