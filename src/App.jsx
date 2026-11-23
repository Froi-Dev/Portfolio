import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import TechStack from './components/TechStack.jsx';
import Contact from './components/Contact.jsx';
import Certifications from './components/Certifications.jsx';
import PortfolioRedirect from './components/PortfolioRedirect.jsx';

export default function App() {
  return (
    <div className="portfolio-page">
      <PortfolioRedirect />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Certifications />
      <Contact />
    </div>
  );
}
