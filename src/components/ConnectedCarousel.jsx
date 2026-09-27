// Adapted from the connected-carousel component supplied by the user.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import Icon from './Icon.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './ConnectedCarousel.css';

const slideTransition = { duration: .65, ease: [.22, 1, .36, 1] };
const mod = (value, total) => ((value % total) + total) % total;

export default function ConnectedCarousel({ items, renderPreview, onOpen, suspended = false, autoPlayInterval = 6000 }) {
  const rootRef = useRef(null);
  const pointerRef = useRef(null);
  const blockClickRef = useRef(false);
  const elapsedRef = useRef(0);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const progress = useMotionValue(0);
  const total = items.length;
  const activeIndex = total ? mod(page, total) : 0;
  const cardWidth = Math.max(0, Math.min(440, width * (width < 560 ? .82 : .58)));
  const fanSpacing = cardWidth * (width < 560 ? .65 : .66);
  const running = total > 1 && !paused && !hovered && !focused && !suspended && !reducedMotion && visible && pageVisible;

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(rootRef.current);
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame;
    let previous;
    const tick = time => {
      if (previous !== undefined) elapsedRef.current += time - previous;
      previous = time;
      if (elapsedRef.current >= autoPlayInterval) {
        elapsedRef.current = 0;
        progress.set(0);
        setPage(value => value + 1);
        return;
      }
      progress.set(elapsedRef.current / autoPlayInterval);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, page, autoPlayInterval, progress]);

  const move = useCallback(offset => {
    elapsedRef.current = 0;
    progress.set(0);
    setPage(value => value + offset);
  }, [progress]);

  const select = index => {
    let difference = index - activeIndex;
    if (difference > total / 2) difference -= total;
    if (difference < -total / 2) difference += total;
    move(difference);
  };

  const onKeyDown = event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
      rootRef.current?.focus({ preventScroll: true });
    }
  };
  const onPointerDown = event => {
    if (event.button !== 0) return;
    blockClickRef.current = false;
    pointerRef.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = event => {
    if (!pointerRef.current) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    pointerRef.current = null;
    if (total > 1 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      blockClickRef.current = true;
      move(dx < 0 ? 1 : -1);
    }
  };

  // Keep the same content mounted as cards move. Only transforms animate;
  // text and previews never reflow between the featured and adjacent positions.
  const offsets = total <= 1 ? [0] : [-2, -1, 0, 1, 2];

  return <div ref={rootRef} className="connected-carousel" role="region" aria-roledescription="carousel" aria-label="Featured projects" tabIndex={0} onKeyDown={onKeyDown}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    {!total ? <p>No projects in this category yet.</p> : <>
      <div className="carousel-controls"><div className="carousel-arrows"><button type="button" onClick={() => move(-1)} disabled={total < 2} aria-label="Previous project"><Icon name="arrow-left" /></button><span className="carousel-counter">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(total).padStart(2, '0')}</span></span><button type="button" onClick={() => move(1)} disabled={total < 2} aria-label="Next project"><Icon name="arrow-right" /></button></div>{total > 1 && !reducedMotion && <button type="button" className="carousel-pause" aria-label={paused ? 'Play project carousel' : 'Pause project carousel'} aria-pressed={paused} onClick={() => setPaused(value => !value)}><Icon name={paused ? 'play-fill' : 'pause-fill'} /></button>}</div>
      <div className="connected-carousel-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { pointerRef.current = null; }} onClickCapture={event => { if (blockClickRef.current) { event.preventDefault(); event.stopPropagation(); blockClickRef.current = false; } }}>
        {offsets.map(offset => {
          const item = items[mod(page + offset, total)];
          const active = offset === 0;
          const distant = Math.abs(offset) > 1;
          return <motion.div key={page + offset} className={`connected-slide ${active ? 'is-featured' : 'is-peek'}`} initial={false} animate={{ x: -cardWidth / 2 + offset * fanSpacing, y: active ? 0 : 42, rotate: offset * (width < 560 ? 9 : 12), scale: active ? 1 : distant ? .78 : .88, opacity: width && !distant ? (active ? 1 : .65) : 0 }} transition={reducedMotion ? { duration: 0 } : slideTransition} style={{ width: cardWidth, zIndex: active ? 3 : distant ? 1 : 2, pointerEvents: distant ? 'none' : 'auto' }} aria-hidden={!active}>
            <button type="button" className="carousel-featured-content" tabIndex={active ? 0 : -1} onClick={() => active ? onOpen(item) : move(offset)} aria-haspopup={active ? 'dialog' : undefined} aria-label={active ? `View ${item.name} project details` : `Select ${item.name}`}>
              <div className="carousel-project-visual">{renderPreview(item)}</div>
              <div className="carousel-project-copy"><span className="project-category">{item.type} / {item.category}</span><h2>{item.name}</h2><p>{item.tagline}</p><div className="tech-tags">{item.tech.map(tech => <span key={tech}>{tech}</span>)}</div><span className="carousel-open">Explore project <Icon name="arrow-up-right" /></span></div>
            </button>
          </motion.div>;
        })}
      </div>
      <div className="carousel-selectors" role="group" aria-label="Choose a project">{items.map((item, index) => <button type="button" key={item.name} aria-label={`Show ${item.name}`} aria-pressed={index === activeIndex} className={index === activeIndex ? 'is-selected' : ''} onClick={() => select(index)}><span className="carousel-dot-track">{index === activeIndex && <motion.span style={{ scaleX: running ? progress : 1 }} />}</span></button>)}</div>
      <p className="sr-only" aria-live={running ? 'off' : 'polite'} aria-atomic="true">Project {activeIndex + 1} of {total}: {items[activeIndex].name}</p>
    </>}
  </div>;
}
