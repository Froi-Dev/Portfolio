'use client';

import { useEffect, useRef, useState } from 'react';
import { createWinterScene } from '../lib/winterScene.js';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function HolidayExperience() {
  const [moving, setMoving] = useState(false);
  const background = useRef(null);
  const effects = useRef(null);
  const snow = useRef(null);
  const engine = useRef(null);
  const audio = useRef(null);
  const resumeAudio = useRef(false);

  useEffect(() => {
    const scene = createWinterScene(background.current, effects.current, snow.current, false);
    const track = audio.current;
    engine.current = scene;
    function syncVisibility() {
      if (document.hidden) {
        resumeAudio.current = !track.paused;
        track.pause();
      } else if (resumeAudio.current) {
        resumeAudio.current = false;
        void track.play().catch(() => {});
      }
    }
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      document.removeEventListener('visibilitychange', syncVisibility);
      track.pause();
      scene.destroy();
      engine.current = null;
    };
  }, []);

  function toggleAnimation() {
    engine.current?.setMoving(!moving);
    setMoving(!moving);
  }

  return (
    <>
      <div className="seasonal-controls">
        <button className="button button-secondary" type="button" onClick={toggleAnimation}>
          {moving ? 'Pause animation' : 'Play animation'}
        </button>
        <audio ref={audio} controls loop preload="none" aria-label="We Wish You a Merry Christmas"
          src={`${basePath}/audio/christmas-carol.wav`} />
      </div>
      <div className="seasonal-scene" role="img" aria-label="Snowy Christmas village beneath a crescent moon">
        <canvas ref={background} aria-hidden="true" />
        <canvas ref={effects} aria-hidden="true" />
        <canvas ref={snow} aria-hidden="true" />
        <noscript><img src={`${basePath}/images/christmas/village-light.png`} alt="Snowy Christmas village" /></noscript>
      </div>
    </>
  );
}
