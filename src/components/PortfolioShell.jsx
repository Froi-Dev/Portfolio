'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation.jsx';
import { portfolioHref } from '../lib/portfolioLinks.js';

function Footer({ onPortfolio }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-layout">
        <a className="wordmark" href={portfolioHref('home', onPortfolio)} aria-label="Froilan De Vera home">Froilan.</a>
        <nav aria-label="Footer">
          <a href="https://github.com/Froi-Dev" target="_blank" rel="noreferrer">GitHub</a>
          <a href={portfolioHref('contact', onPortfolio)}>Contact</a>
        </nav>
        <small>© Froilan De Vera</small>
      </div>
    </footer>
  );
}

export default function PortfolioShell({ children }) {
  const onPortfolio = usePathname() === '/';
  return (
    <div className="portfolio-site">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation onPortfolio={onPortfolio} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer onPortfolio={onPortfolio} />
    </div>
  );
}
