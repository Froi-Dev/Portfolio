import { useEffect, useRef, useState } from 'react';
import DitherVeil from './reactbits/DitherVeil.jsx';
import Icon from './Icon.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import TechOrbit from './TechOrbit.jsx';
import Reveal from './Reveal.jsx';
import DownloadCV from './DownloadCV.jsx';
import { STACK } from '../data/portfolio.js';
import AnimatedText from './AnimatedText.jsx';

const portrait = `${import.meta.env.BASE_URL}images/froilan-portrait.png`;
const technologyCount = new Set(STACK.flatMap(group => group.items.map(item => item.name))).size;

function Portrait() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const frameRef = useRef(null);
  const [surfaceKey, setSurfaceKey] = useState(0);
  useEffect(() => {
    let previousSize = '';
    let timer;
    const observer = new ResizeObserver(([entry]) => {
      const size = `${Math.round(entry.contentRect.width)}:${Math.round(entry.contentRect.height)}`;
      if (previousSize && size !== previousSize) {
        window.clearTimeout(timer);
        // Recreate the WebGL surface after resizing while preserving registry source.
        timer = window.setTimeout(() => setSurfaceKey(value => value + 1), 160);
      }
      previousSize = size;
    });
    observer.observe(frameRef.current);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);
  const [supportsWebGL] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) return false;
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return true;
    } catch { return false; }
  });
  return <figure className="portrait-card glass-panel">
    <div ref={frameRef} className="portrait-image">
      <img src={portrait} alt="Portrait of Froilan De Vera" className="portrait-fallback" fetchpriority="high" />
      {supportsWebGL && !reducedMotion && <div className="portrait-effect" aria-hidden="true"><DitherVeil key={surfaceKey} src={portrait} pattern="floyd" pixelSize={1} levels={16} palette="rgb" contrast={1} brightness={0.03} reverse inkColor="#120f17" paperColor="#f4f1ea" revealRadius={160} softness={0.8} linger={0.5} fit="cover" /></div>}
      <span className="portrait-corner portrait-corner--tl" /><span className="portrait-corner portrait-corner--br" />
      <TechOrbit />
    </div>
  </figure>;
}

export default function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-intro"><Reveal className="hero-copy">
      <span className="eyebrow">Developer. Builder. Curious mind. <span className="wave">↗</span></span>
      <h1 id="hero-title"><AnimatedText text="Froilan" />{' '}<br /><AnimatedText text="De Vera" /><span className="name-dot">.</span></h1>
      <p className="hero-role"><AnimatedText text="Full Stack & AI-Assisted Developer" wrap /></p>
      <p className="hero-description">I turn ideas into clean, useful digital experiences. From the first sketch to the final build, I care about how things work—and how they feel.</p>
      <div className="hero-actions"><a href="#/projects" className="button button-primary">Explore my work <Icon name="arrow-up-right" /></a><DownloadCV /></div>
      <div className="hero-socials"><a href="https://github.com/Froi-Dev" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow-up-right" /></a><a href="mailto:froilandevera.dev@gmail.com"><Icon name="envelope" /> Email <Icon name="arrow-up-right" /></a></div>
    </Reveal><Reveal className="hero-showcase" delay={0.12}><Portrait /></Reveal>
      <div className="hero-stats">{[['4 years', 'Personal & academic development'], ['12+', 'Projects completed'], [`${technologyCount}+`, 'Technologies & tools']].map(([value, label]) => <div className="hero-stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div>
  </section>;
}

