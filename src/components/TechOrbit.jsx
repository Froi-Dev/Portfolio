import { useEffect, useRef, useState } from 'react';
import OrbitImages from './reactbits/OrbitImages.jsx';
import Icon from './Icon.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

const logos = ['react', 'nodejs', 'javascript', 'mysql', 'kotlin', 'git'].map(name => `${import.meta.env.BASE_URL}icons/${name}.svg`);

export default function TechOrbit() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const stageRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(stageRef.current);
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);
  return <div className="portrait-halo" ref={stageRef}>
    <div className="halo-orbit">
      <OrbitImages images={logos} shape="ellipse" baseWidth={400} radiusX={150} radiusY={34} rotation={-10} duration={18} itemSize={42} responsive paused={paused || reducedMotion || !visible || !pageVisible} showPath pathColor="rgba(30, 169, 121, .45)" pathWidth={1} />
    </div>
    <div className="halo-controls"><a className="halo-label" href="#/stack">My tech orbit <Icon name="arrow-up-right" /></a>{!reducedMotion && <button className="toolkit-pause" aria-label={paused ? 'Play tech logo animation' : 'Pause tech logo animation'} aria-pressed={paused} onClick={() => setPaused(!paused)}><Icon name={paused ? 'play-fill' : 'pause-fill'} /></button>}</div>
    <p className="sr-only">React, Node.js, JavaScript, MySQL, Kotlin and Git.</p>
  </div>;
}
