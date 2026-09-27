import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, PROJECT_TYPES } from '../data/portfolio.js';
import Icon from './Icon.jsx';
import ConnectedCarousel from './ConnectedCarousel.jsx';
import { PROJECT_MEDIA } from '../data/projectMedia.js';

function ProjectVisual({ project }) {
  const media = PROJECT_MEDIA[project.mark];
  const [failed, setFailed] = useState(false);
  if (!media?.image || failed) return <ProjectPreview project={project} />;
  const src = /^https?:\/\//.test(media.image) ? media.image : `${import.meta.env.BASE_URL}${media.image}`;
  return <img className="project-screenshot" src={src} alt={media.imageAlt || `${project.name} screenshot`} loading="lazy" draggable={false} onError={() => setFailed(true)} />;
}

function ProjectLinks({ project, onClose }) {
  const media = PROJECT_MEDIA[project.mark] || {};
  const links = [['Live demo', media.demoUrl, 'arrow-up-right'], ['Source code', media.repositoryUrl, 'github']];
  return <><h3>Project links</h3><div className="project-link-actions">{links.map(([label, url, icon]) => /^https?:\/\//.test(url || '') ? <a key={label} className="button button-secondary" href={url} target="_blank" rel="noreferrer">{label} <Icon name={icon} /></a> : <button key={label} type="button" className="button button-secondary" disabled>{label} <Icon name={icon} /></button>)}</div>{!media.demoUrl && !media.repositoryUrl && <p className="project-link-note">Mock preview · Live demo and repository links coming soon.</p>}<a className="text-link" href="#/contact" onClick={onClose}>Discuss this project <Icon name="arrow-up-right" /></a></>;
}

function ProjectPreview({ project }) {
  const index = PROJECTS.indexOf(project);
  return <div className={`project-preview preview-${index}`} aria-hidden="true">
    {index === 1 ? <div className="mood-preview"><span className="preview-eyebrow">A moment for yourself</span><div className="mood-flower"><span /><span /><span /><span /></div><strong>How are you, really?</strong><div className="mood-dots">◡ &nbsp; ◡ &nbsp; ◡ &nbsp; ◡</div></div>
      : index === 2 ? <div className="music-preview"><div className="record"><span /></div><div><span className="preview-eyebrow">IN YOUR OWN RHYTHM</span><strong>Good things<br />on repeat.</strong><div className="equalizer">{[40, 70, 48, 90, 60, 100, 50, 75, 35].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div></div></div>
      : index === 6 ? <div className="jewelry-preview"><span className="preview-eyebrow">MADE TO BE YOURS</span><div className="jewelry-ring" /><strong>A little more personal.</strong></div>
      : <div className="dashboard-preview"><div className="preview-toolbar"><span className="preview-brand"><Icon name={index === 0 ? 'wallet2' : index === 3 ? 'people' : index === 4 ? 'calendar3' : 'box-seam'} />{project.name}</span><span>•••</span></div><div className="preview-dashboard-body"><div className="preview-rail"><span /><span /><span /><span /></div><div className="preview-main"><div className="preview-welcome"><span>{index === 0 ? 'Your month, at a glance' : index === 3 ? 'Your campus. Connected.' : index === 4 ? 'A little more organized.' : 'Everything in its place.'}</span><span className="preview-pill">Overview</span></div><div className="preview-metrics"><span><small>{index === 0 ? 'BALANCE' : 'OVERVIEW'}</small><b>{index === 0 ? '₱24,850' : '128'}</b></span><span><small>{index === 0 ? 'SAVED' : 'THIS WEEK'}</small><b>{index === 0 ? '+18.4%' : '+24'}</b></span></div><div className="preview-chart">{[35, 48, 42, 62, 50, 80, 70, 91, 78, 100, 85, 112].map((h, i) => <span key={i} style={{ height: `${h / 1.3}%` }} />)}</div></div></div></div>}
    <span className="preview-caption">Interface concept</span>
  </div>;
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);
  return createPortal(<dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-content"><div className="dialog-top"><span className="eyebrow">{project.category} / {project.type}</span><button className="icon-button" onClick={onClose} aria-label="Close project details" autoFocus><Icon name="x-lg" /></button></div><ProjectVisual project={project} /><div className="dialog-copy"><h2 id="project-dialog-title">{project.name}</h2><p>{project.desc}</p><h3>What it does</h3><ul className="feature-list">{project.features.map(feature => <li key={feature}><Icon name="check2" />{feature}</li>)}</ul><h3>Stack used</h3><div className="tech-tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} onClose={onClose} /></div></div>
  </dialog>, document.body);
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [project, setProject] = useState(null);
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(item => item.type === filter);
  return <section className="content-section projects" id="projects" aria-labelledby="projects-title">
    <div className="section-heading"><div><span className="eyebrow">02 / Selected work</span><h1 id="projects-title">Ideas, made real<span>.</span></h1></div><p>A selection of things I've built.<br />Different problems. The same attention to detail.</p></div>
    <div className="project-filters" role="group" aria-label="Filter projects">{PROJECT_TYPES.map(type => <button key={type} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type === 'Mobile Application' ? 'Mobile' : type}<span>{type === 'All' ? PROJECTS.length : PROJECTS.filter(item => item.type === type).length}</span></button>)}</div>
    <ConnectedCarousel key={filter} items={filtered} renderPreview={item => <ProjectVisual key={item.mark} project={item} />} onOpen={setProject} suspended={Boolean(project)} />
    {project && <ProjectModal project={project} onClose={() => setProject(null)} />}
  </section>;
}
