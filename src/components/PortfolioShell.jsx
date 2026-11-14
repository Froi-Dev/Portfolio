'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navigation from './Navigation.jsx';
import { HolidayProvider, WinterScene, HolidayControls, useHoliday } from './HolidayExperience.jsx';

function Shell({ children }) {
  const [theme, setTheme] = useState('light');
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const page = pathname.split('/').filter(Boolean).at(-1) || 'home';
  const mainRef = useRef(null);
  const { moving } = useHoliday();
  const router = useRouter();
  useEffect(() => {
    try { setTheme(localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'); } catch { /* Optional storage. */ }
    setReady(true);
    // Old bookmarks continue to resolve after migrating from Vite hash navigation.
    const legacy = location.hash.match(/^#\/(home|about|projects|stack|certifications|contact)\/?$/);
    if (legacy) router.replace(legacy[1] === 'home' ? '/' : `/${legacy[1]}/`);
  }, [router]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#191a1d' : '#eef1f4');
    if (ready) try { localStorage.setItem('portfolio-theme', theme); } catch { /* Optional storage. */ }
  }, [theme, ready]);
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return <div className={moving ? 'christmas-site' : 'christmas-site christmas-site--paused'}>
    <WinterScene />
    <a href="#main" className="skip-link" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
    <Navigation theme={theme} setTheme={setTheme} activeSection={page} />
    <aside className="holiday-side-controls" aria-label="Christmas controls"><HolidayControls /></aside>
    <div className="page-shell"><main id="main" ref={mainRef} tabIndex={-1} className={`route-main${page === 'home' ? ' route-main--home' : ''}`}>{children}</main></div>
  </div>;
}

export default function PortfolioShell({ children }) {
  return <HolidayProvider><Shell>{children}</Shell></HolidayProvider>;
}
