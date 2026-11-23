import GitHubContributions from './GitHubContributions.jsx';
import '../inner-pages.css';

export default function About() {
  return (
    <section className="content-section about" id="about" tabIndex={-1} aria-labelledby="about-title">
      <div className="wrap about-layout">
        <h2 id="about-title">About me</h2>
        <div className="about-copy">
          <p className="about-lead">I’m Froilan De Vera, a 22-year-old full-stack developer who likes building tools that make everyday work easier.</p>
          <dl className="about-focus">
            <div>
              <dt>What I’m doing now</dt>
              <dd>I’m building web, Windows, and Android apps with AI-assisted workflows while studying cybersecurity.</dd>
            </div>
            <div>
              <dt>What I want to build</dt>
              <dd>I want to make software that’s easy to pick up, dependable in daily use, and secure by design.</dd>
            </div>
          </dl>
          <GitHubContributions />
        </div>
      </div>
    </section>
  );
}
