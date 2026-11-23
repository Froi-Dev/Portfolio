'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS, PROJECT_TYPES } from '../data/portfolio.js';
import { PROJECT_MEDIA } from '../data/projectMedia.js';
import useMediaQuery from '../hooks/useMediaQuery.js';
import Icon from './Icon.jsx';
import ProjectStackIcon from './ProjectStackIcon.jsx';
import '../projects.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const projectId = project => `project-${project.mark.toLowerCase()}`;
const projectGroups = PROJECT_TYPES.map(type => ({
  type,
  items: type === 'All' ? PROJECTS : PROJECTS.filter(project => project.type === type),
}));
const still = { duration: 0 };
const printSpring = { type: 'spring', stiffness: 240, damping: 26, mass: .9 };
const printTransition = { default: printSpring, opacity: { duration: .24 } };
const printPoses = {
  left: { x: '-4%', y: '-3%', rotate: -5, scale: .96, opacity: .74 },
  right: { x: '4%', y: '-5%', rotate: 5, scale: .96, opacity: .65 },
  front: { x: '0%', y: '0%', rotate: 0, scale: 1, opacity: 1 },
};
const printVariants = {
  leave: direction => direction
    ? { x: direction > 0 ? '-12%' : '12%', y: '-7%', scale: .94, opacity: 0, transition: { duration: .26 } }
    : { opacity: 0, transition: still },
};

function ProjectVisual({ project, loading = 'lazy', decorative = false }) {
  const [failed, setFailed] = useState(false);
  const { image, imageAlt } = PROJECT_MEDIA[project.mark] || {};
  if (!image || failed) {
    return <span className="project-image-fallback"><span>Preview unavailable</span></span>;
  }
  const src = /^https?:\/\//.test(image) ? image : `${basePath}/${image}`;
  return <img className="project-screenshot" src={src} alt={decorative ? '' : imageAlt || `${project.name} project preview`}
    loading={loading} draggable={false} onError={() => setFailed(true)} />;
}

function ProjectLinks({ project, onDiscuss }) {
  const media = PROJECT_MEDIA[project.mark] || {};
  const links = [['Open live demo', media.demoUrl], ['View source code', media.repositoryUrl]];
  return (
    <footer className="project-link-actions">
      {links.filter(([, url]) => /^https?:\/\//.test(url || '')).map(([label, url]) => (
        <a key={label} className="button button-secondary" href={url} target="_blank" rel="noreferrer">
          {label} <Icon name="arrow-up-right" />
        </a>
      ))}
      <a className="button button-primary project-discuss" href="#contact" onClick={onDiscuss}>
        Discuss project <Icon name="arrow-right" />
      </a>
    </footer>
  );
}

function ProjectModal({ project, opener, onClose }) {
  const dialogRef = useRef(null);
  const returnFocus = useRef(true);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflowY = previousOverflow;
      if (!returnFocus.current) return;
      const indexButton = document.getElementById(projectId(project))?.querySelector('button');
      if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
      else if (indexButton?.getClientRects().length) indexButton.focus();
      else document.querySelector('.showcase-preview')?.focus({ preventScroll: true });
    };
  }, [opener, project]);

  function discussProject(event) {
    if (event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const contact = document.getElementById('contact');
    if (!contact) return;
    event.preventDefault();
    returnFocus.current = false;
    onClose();
    window.requestAnimationFrame(() => {
      if (window.location.hash !== '#contact') window.history.pushState(null, '', '#contact');
      contact.focus({ preventScroll: true });
      contact.scrollIntoView({ block: 'start' });
    });
  }

  return createPortal(
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="project-dialog-content">
        <header className="project-dialog-header">
          <div>
            <p className="project-dialog-kind">{project.type} / {project.category}</p>
            <h2 id="project-dialog-title">{project.name}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close project details" autoFocus>
            <Icon name="x-lg" />
          </button>
        </header>
        <div className="project-dialog-body">
          <div className="project-dialog-intro">
            <div className="project-dialog-image"><ProjectVisual project={project} loading="eager" /></div>
            <p className="project-dialog-summary">{project.desc}</p>
          </div>
          <div className="project-dialog-details">
            <section>
              <h3>What it does</h3>
              <ul className="project-dialog-features">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            </section>
            {project.tech.length > 0 && (
              <section>
                <h3>Stack used</h3>
                <ul className="project-dialog-stack">
                  {project.tech.map(technology => (
                    <li key={technology}><ProjectStackIcon technology={technology} /><span>{technology}</span></li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
        <ProjectLinks project={project} onDiscuss={discussProject} />
      </article>
    </dialog>,
    document.body,
  );
}

function ProjectShowcase({ items, active, direction, onSelect, onOpen }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const swipeStart = useRef(null);
  const ignoreClick = useRef(false);
  const project = items[active];
  const hasMultiple = items.length > 1;
  const prints = [
    { item: project, position: 'front' },
    ...(items.length > 2 ? [{ item: items[(active - 1 + items.length) % items.length], position: 'left' }] : []),
    ...(hasMultiple ? [{ item: items[(active + 1) % items.length], position: 'right' }] : []),
  ];
  const motionDirection = reducedMotion ? 0 : direction;

  function step(direction) {
    onSelect(items[(active + direction + items.length) % items.length].mark, direction);
  }

  function handleKeys(event) {
    if (!hasMultiple || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  function startSwipe(event) {
    if (!event.isPrimary || event.button !== 0) return;
    ignoreClick.current = false;
    if (hasMultiple && event.pointerType !== 'mouse') {
      swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    }
  }

  function finishSwipe(event) {
    const start = swipeStart.current;
    if (!start || start.id !== event.pointerId) return;
    swipeStart.current = null;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) < 42 || Math.abs(x) < Math.abs(y) * 1.35) return;
    ignoreClick.current = true;
    step(x < 0 ? 1 : -1);
  }

  function openPreview(event) {
    if (event.detail > 0 && ignoreClick.current) {
      ignoreClick.current = false;
      return;
    }
    onOpen(project, event.currentTarget);
  }

  return (
    <section className="project-showcase" aria-label="Project showcase" aria-roledescription="carousel" onKeyDown={handleKeys}>
      <div className="showcase-stack">
        <button className="showcase-preview" type="button" aria-haspopup="dialog" aria-label={`View ${project.name} details`}
          onPointerDown={startSwipe} onPointerUp={finishSwipe}
          onPointerCancel={() => { swipeStart.current = null; }} onClick={openPreview}>
          <AnimatePresence initial={false} custom={motionDirection}>
            {prints.map(({ item, position }) => {
              const pose = printPoses[position];
              return (
                <motion.span
                  key={item.mark}
                  className={`showcase-print${position === 'front' ? '' : ' showcase-back'}`}
                  data-position={position}
                  aria-hidden="true"
                  initial={motionDirection ? { ...pose, y: '-9%', scale: .92, opacity: 0 } : false}
                  animate={pose}
                  exit="leave"
                  variants={printVariants}
                  transition={motionDirection ? printTransition : still}
                >
                  <ProjectVisual project={item} decorative />
                </motion.span>
              );
            })}
          </AnimatePresence>
        </button>
      </div>

      <div className="showcase-info">
        <motion.div
          className="showcase-description"
          key={project.mark}
          initial={motionDirection ? { x: motionDirection * 17, opacity: .82 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={motionDirection ? { duration: .44, ease: [.16, 1, .3, 1] } : still}
        >
          <h3>{project.name}</h3>
          <p className="showcase-type">{project.type} / {project.category}</p>
          <p className="showcase-tagline">{project.tagline}</p>
        </motion.div>
        <div className="showcase-actions">
          <div className="showcase-navigation" role="group" aria-label="Browse projects">
            <button className="icon-button" type="button" onClick={() => step(-1)} aria-label="Previous project" title="Previous project" disabled={!hasMultiple}>
              <Icon name="arrow-left" />
            </button>
            <span className="showcase-counter" role="status"><span className="sr-only">{project.name}, project </span>{active + 1} of {items.length}</span>
            <button className="icon-button" type="button" onClick={() => step(1)} aria-label="Next project" title="Next project" disabled={!hasMultiple}>
              <Icon name="arrow-right" />
            </button>
          </div>
          <button className="button button-primary" type="button" aria-haspopup="dialog" onClick={event => onOpen(project, event.currentTarget)}>
            View project details
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectIndex({ items, onOpen }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="project-index" aria-labelledby="project-index-title">
      <h3 id="project-index-title">
        <span className="project-index-heading">Project index</span>
        <button className="project-index-toggle" type="button" aria-controls="project-index-entries"
          aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
          <span>Project index</span>
          <span className="project-index-toggle-end"><span>{items.length} {items.length === 1 ? 'project' : 'projects'}</span><Icon name="arrow-down" /></span>
        </button>
      </h3>
      <ul id="project-index-entries" data-expanded={expanded}>
        {items.map(project => (
          <li id={projectId(project)} key={project.mark}>
            <button type="button" className="project-index-entry" aria-haspopup="dialog" onClick={event => onOpen(project, event.currentTarget)}>
              <span><strong>{project.name}</strong><span>{project.category}</span></span>
              <Icon name="arrow-up-right" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState({ mark: PROJECTS[0]?.mark, direction: 0 });
  const [selection, setSelection] = useState(null);
  const filtered = projectGroups.find(group => group.type === filter).items;
  const activeIndex = filtered.findIndex(project => project.mark === activeProject.mark);

  useEffect(() => {
    function openLinkedProject() {
      const hash = window.location.hash.slice(1);
      const linkedProject = PROJECTS.find(item => projectId(item) === hash);
      if (linkedProject) {
        if (window.matchMedia('(max-width: 700px)').matches) {
          document.getElementById('projects')?.scrollIntoView({ block: 'start' });
        }
        setFilter('All');
        setActiveProject({ mark: linkedProject.mark, direction: 0 });
        setSelection({ project: linkedProject, opener: null });
      }
    }
    openLinkedProject();
    window.addEventListener('hashchange', openLinkedProject);
    return () => window.removeEventListener('hashchange', openLinkedProject);
  }, []);

  function openProject(project, opener) {
    if (project.mark !== activeProject.mark) {
      setActiveProject({ mark: project.mark, direction: 0 });
    }
    setSelection({ project, opener });
  }

  function closeProject() {
    if (window.location.hash === `#${projectId(selection.project)}`) {
      window.history.replaceState(null, '', '#projects');
    }
    setSelection(null);
  }

  return (
    <section className="content-section projects" id="projects" tabIndex={-1} aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-heading">
          <h2 id="projects-title">Projects</h2>
          <p>Browse the web, desktop, mobile, and cybersecurity tools I’ve built.</p>
        </div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          {projectGroups.map(({ type, items }) => {
            const label = type === 'Mobile Application' ? 'Mobile' : type;
            return (
              <button type="button" key={type} aria-pressed={filter === type}
                aria-label={`${label}, ${items.length} ${items.length === 1 ? 'project' : 'projects'}`}
                onClick={() => {
                  setFilter(type);
                  setActiveProject({ mark: activeProject.mark, direction: 0 });
                }}>
                {label}<span>{items.length}</span>
              </button>
            );
          })}
        </div>
        {filtered.length > 0 ? (
          <>
            <ProjectShowcase
              items={filtered}
              active={Math.max(0, activeIndex)}
              direction={activeIndex < 0 ? 0 : activeProject.direction}
              onSelect={(mark, direction) => setActiveProject({ mark, direction })}
              onOpen={openProject}
            />
            <ProjectIndex items={filtered} onOpen={openProject} />
          </>
        ) : <p>No projects in this category.</p>}
      </div>
      {selection && <ProjectModal key={selection.project.mark} {...selection} onClose={closeProject} />}
    </section>
  );
}
