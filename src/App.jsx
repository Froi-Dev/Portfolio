'use client';

import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import TechStack from './components/TechStack.jsx';
import Contact from './components/Contact.jsx';
import Certifications from './components/Certifications.jsx';
import Reveal from './components/Reveal.jsx';

const pages = { home: Hero, about: About, projects: Projects, stack: TechStack, certifications: Certifications, contact: Contact };
export default function App({ page = 'home' }) {
  const Page = pages[page];
  return <Reveal key={page} className="route-page"><Page /></Reveal>;
}
