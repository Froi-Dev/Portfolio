import Icon from './Icon.jsx';
import GitHubContributions from './GitHubContributions.jsx';

export default function About() {
  return <section className="content-section about" id="about" aria-labelledby="about-title">
    <div className="section-heading"><div><span className="eyebrow">01 / A little context</span><h1 id="about-title">About me<span>.</span></h1></div></div>
    <div className="about-grid about-grid--simple">
      <div className="about-copy"><p className="lead">Curiosity starts the project.<br />Craft brings it to life.</p><p>I'm Froilan De Vera, a full stack developer who builds software with AI at the core of my workflow. I use AI extensively to explore ideas, solve problems, and turn concepts into working web and mobile applications.</p><p>From prototype to product, I focus on practical solutions and the details that make an experience feel right. I'm also studying cybersecurity, learning how systems work, where vulnerabilities arise, and how to build more secure software.</p><div className="about-tags"><span><Icon name="code-slash" /> Full stack development</span><span><Icon name="stars" /> AI-assisted development</span><span><Icon name="shield-check" /> Cybersecurity studies</span></div></div>
    </div>
    <GitHubContributions />
  </section>;
}
