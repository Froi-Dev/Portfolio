import PixelSwap from './reactbits/PixelSwap.jsx';
import Icon from './Icon.jsx';
import GitHubContributions from './GitHubContributions.jsx';

export default function About() {
  return <section className="content-section about" id="about" aria-labelledby="about-title">
    <div className="section-heading"><div><span className="eyebrow">01 / A little context</span><h1 id="about-title">The person behind the build<span>.</span></h1></div></div>
    <div className="about-grid">
      <div className="about-copy"><p className="lead">Curiosity starts the project.<br />Craft brings it to life.</p><p>I'm Froilan De Vera, a full stack developer who builds software with AI at the core of my workflow. I use AI extensively to explore ideas, solve problems, and turn concepts into working web and mobile applications.</p><p>From prototype to product, I focus on practical solutions and the details that make an experience feel right. I'm also studying cybersecurity, learning how systems work, where vulnerabilities arise, and how to build more secure software.</p><div className="about-tags"><span><Icon name="code-slash" /> Full stack development</span><span><Icon name="stars" /> AI-assisted development</span><span><Icon name="shield-check" /> Cybersecurity studies</span></div></div>
      <div className="about-swap-wrap"><PixelSwap
        firstContent={<div className="about-note"><span className="mini-label">A note from me / 01</span><Icon name="asterisk" className="note-symbol" /><h3>Good things start<br />with a little curiosity.</h3><span className="note-prompt">Click to take a closer look <Icon name="plus-lg" /></span></div>}
        secondContent={<div className="about-note about-note--back"><span className="mini-label">My approach / 02</span><h3>Make it useful.<br />Make it feel simple.</h3><p>Understand the problem. Build with purpose. Refine the details. Keep learning.</p><span className="note-prompt">That's how I like to work <Icon name="arrow-return-left" /></span></div>}
        pixelSize={64} gap={0} pixelRadius={0} pixelSpin={0} pixelScale={0.35} duration={1400} pixelDuration={450} pattern="random" randomness={0} fade trigger="click" aspectRatio="1 / 1" className="about-swap"
      /></div>
    </div>
    <GitHubContributions />
  </section>;
}
