import { SantaHat, ChristmasLights, HolidayGreeting } from './HolidayExperience.jsx';
import Link from 'next/link';
import Icon from './Icon.jsx';
import TechOrbit from './TechOrbit.jsx';
import Reveal from './Reveal.jsx';
import DownloadCV from './DownloadCV.jsx';
import { STACK } from '../data/portfolio.js';
import AnimatedText from './AnimatedText.jsx';

const portrait = `${(process.env.NEXT_PUBLIC_BASE_PATH || '') + '/'}images/froilan-portrait.png`;
const technologyCount = new Set(STACK.flatMap(group => group.items.map(item => item.name))).size;

function Portrait() {
  return <figure className="portrait-card glass-panel">
    <div className="portrait-image">
      <img src={portrait} alt="Froilan De Vera" className="portrait-fallback" fetchPriority="high" />
      <SantaHat className="portrait-hat" />
      <div className="portrait-snow" aria-hidden="true" />
      <TechOrbit />
    </div>
  </figure>;
}

export default function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <HolidayGreeting />
    <div className="hero-intro"><Reveal className="hero-copy">
      <span className="eyebrow">Developer · Designer · Creator · Tech <span className="status-dot" /></span>
      <div className="christmas-name"><SantaHat className="name-hat" /><h1 id="hero-title"><AnimatedText text="Froilan" />{' '}<br /><AnimatedText text="De Vera" /><span className="name-dot">.</span></h1><ChristmasLights /></div>
      <p className="hero-role"><AnimatedText text="Full Stack & AI-Assisted Developer" wrap /></p>
      <p className="hero-description">I turn ideas into clean, useful digital experiences. From the first sketch to the final build, I care about how things work—and how they feel.</p>
      <div className="hero-actions"><Link href="/projects/" className="button button-primary">Explore my work <Icon name="arrow-up-right" /></Link><DownloadCV /></div>
      <div className="hero-socials"><a href="https://github.com/Froi-Dev" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow-up-right" /></a><a href="mailto:froilandevera.dev@gmail.com"><Icon name="envelope" /> Email <Icon name="arrow-up-right" /></a></div>
    </Reveal><Reveal className="hero-showcase" delay={0.12}><Portrait /></Reveal>
      <div className="hero-stats">{[['4 years', 'Personal & academic development'], ['12+', 'Projects completed'], [`${technologyCount}+`, 'Technologies & tools']].map(([value, label]) => <div className="hero-stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div>
    <div className="holiday-bottom"><span className="holiday-edition">✧ THE CHRISTMAS EDITION</span></div>
  </section>;
}

