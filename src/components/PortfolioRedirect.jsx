'use client';

import { useEffect } from 'react';
import { portfolioHref, portfolioSections } from '../lib/portfolioLinks.js';

export default function PortfolioRedirect({ section }) {
  useEffect(() => {
    function followBookmark() {
      const { hash, origin, search } = window.location;
      const oldSection = hash.match(/^#\/([a-z]+)\/?$/)?.[1];
      const project = section === 'projects' ? hash.match(/^#(project-[a-z0-9]+)$/)?.[1] : undefined;
      const target = project || section || (Object.hasOwn(portfolioSections, oldSection) ? oldSection : undefined);
      if (!target) return;
      const destination = new URL(portfolioHref(target), origin);
      destination.search = search;
      window.location.replace(destination.href);
    }

    followBookmark();
    if (section) return;
    window.addEventListener('hashchange', followBookmark);
    return () => window.removeEventListener('hashchange', followBookmark);
  }, [section]);

  if (!section) return null;

  return (
    <section className="content-section wrap">
      <h1>{portfolioSections[section]}</h1>
      <p>This section is now part of the main portfolio.</p>
      <a className="text-link" href={portfolioHref(section)}>Go to {portfolioSections[section]}</a>
    </section>
  );
}
