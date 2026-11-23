import DownloadCV from './DownloadCV.jsx';
import Icon from './Icon.jsx';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Hero() {
  return (
    <section className="home-hero" id="home" tabIndex={-1} aria-labelledby="hero-title" data-enter>
      <div className="wrap hero-layout">
        <div className="poster-headline">
          <h1 id="hero-title"><span>Software</span>{' '}<span>Developer</span></h1>
        </div>
        <div className="hero-identity">
          <p className="hero-name">Froilan{' '}<br />De Vera</p>
          <DownloadCV />
        </div>
        <figure className="hero-portrait">
          <img src={`${basePath}/images/froilan-portrait.webp`} alt="Froilan De Vera" width="870" height="1160" fetchPriority="high" />
        </figure>
        <div className="hero-pitch">
          <p>I build clean, useful tools for web and mobile.</p>
          <a href="#about" className="button button-primary portfolio-action hero-about-button">
            <span className="portfolio-action-label">Know Me Better</span>
            <span className="portfolio-action-icon"><Icon name="arrow-down" /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
