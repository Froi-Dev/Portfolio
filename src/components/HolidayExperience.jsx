'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import ChristmasIcon from './ChristmasIcon.jsx';
import { gsap } from 'gsap';
import useMediaQuery from '../hooks/useMediaQuery.js';
import { createWinterScene } from '../lib/winterScene.js';

const HolidayContext = createContext(null);
export const useHoliday = () => useContext(HolidayContext);

export function HolidayProvider({ children }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [motionChoice, setMotionChoice] = useState(null);
  const moving = motionChoice ?? !reducedMotion;
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioTrack = useRef(null);
  const mounted = useRef(false), wanted = useRef(true), playingRef = useRef(false), request = useRef(0);
  const startMusic = useCallback(async () => {
    const attempt = ++request.current;
    try {
      const track = audioTrack.current;
      if (!track) return;
      track.volume = .85;
      await track.play();
      if (!mounted.current || attempt !== request.current || !wanted.current) {
        if (!wanted.current) track.pause();
        return;
      }
      playingRef.current = true; setPlaying(true); setAutoplayBlocked(false); setAudioError(false);
    } catch {
      if (mounted.current && attempt === request.current) { setAutoplayBlocked(true); setAudioError(false); setPlaying(false); }
    }
  }, []);
  useEffect(() => {
    mounted.current = true;
    if (!document.hidden && wanted.current) void startMusic();
    const firstInteraction = event => {
      if (!wanted.current || playingRef.current || document.hidden || event.target?.closest?.('[data-music-control]')) return;
      void startMusic();
    };
    const visibility = () => {
      if (!document.hidden && wanted.current) void startMusic();
    };
    document.addEventListener('pointerdown', firstInteraction);
    document.addEventListener('keydown', firstInteraction);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      mounted.current = false; request.current++;
      document.removeEventListener('pointerdown', firstInteraction);
      document.removeEventListener('keydown', firstInteraction);
      document.removeEventListener('visibilitychange', visibility);
      audioTrack.current?.pause(); playingRef.current = false;
    };
  }, [startMusic]);
  const toggleMusic = async () => {
    if (busy) return;
    if (playingRef.current) {
      wanted.current = false; request.current++; audioTrack.current?.pause(); playingRef.current = false;
      setPlaying(false); setAutoplayBlocked(false); return;
    }
    wanted.current = true; setBusy(true);
    try { await startMusic(); } finally { if (mounted.current) setBusy(false); }
  };
  return <>
    <audio ref={audioTrack} autoPlay loop preload="auto" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/christmas-carol.wav`} aria-hidden="true"
      onPlaying={() => { if (wanted.current) { playingRef.current = true; setPlaying(true); setAutoplayBlocked(false); setAudioError(false); } }}
      onPause={() => { playingRef.current = false; setPlaying(false); }}
      onError={() => { setAudioError(true); setPlaying(false); }} />
    <HolidayContext.Provider value={{ moving, reducedMotion, toggleMotion: () => setMotionChoice(!moving), playing, busy, audioError, autoplayBlocked, toggleMusic }}>
      {children}
    </HolidayContext.Provider>
  </>;
}

export function WinterScene() {
  const { moving } = useHoliday();
  const staticRef = useRef(null), effectsRef = useRef(null), snowRef = useRef(null), engineRef = useRef(null);
  useEffect(() => {
    const engine = createWinterScene(staticRef.current, effectsRef.current, snowRef.current, !matchMedia('(prefers-reduced-motion: reduce)').matches);
    engineRef.current = engine;
    return () => { engine.destroy(); engineRef.current = null; };
  }, []);
  useEffect(() => { engineRef.current?.setMoving(moving); }, [moving]);
  return <>
    <div className={`winter-background${moving ? '' : ' winter-background--paused'}`} aria-hidden="true"><canvas ref={staticRef} /><canvas ref={effectsRef} /></div>
    <canvas ref={snowRef} className="winter-snowfall" aria-hidden="true" />
  </>;
}

export function HolidayControls() {
  const { moving, toggleMotion, playing, busy, audioError, autoplayBlocked, toggleMusic } = useHoliday();
  return <div className="holiday-controls">
    <button type="button" onClick={toggleMotion} title={moving ? 'Pause Christmas animations' : 'Resume Christmas animations'} aria-pressed={moving} aria-label={moving ? 'Pause Christmas animations' : 'Resume Christmas animations'}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4m10 14-1-4 4-1M4 14l4 1-1 4m10-14-1 4 4 1" /></svg>
      <span>{moving ? 'Snow on' : 'Animation paused'}</span>
    </button>
    <button data-music-control className={playing ? 'christmas-music-button music-is-playing' : 'christmas-music-button'} type="button" onClick={toggleMusic} title={playing ? 'Pause Christmas music' : 'Play Christmas music'} disabled={busy} aria-pressed={playing} aria-label={playing ? 'Pause Christmas music' : 'Play We Wish You a Merry Christmas'}>
      <span className="holiday-bell"><ChristmasIcon name="bell" /></span><span className="music-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="christmas-music-label">{audioError ? 'Audio unavailable · Retry' : busy ? 'Starting music…' : playing ? 'Merry Christmas · Playing' : autoplayBlocked ? 'Tap for Christmas music' : 'Christmas music'}</span>
      <Icon name={playing ? 'pause-fill' : 'play-fill'} />
    </button>

  </div>;
}

export function SantaHat({ className = '' }) {
  return <svg className={`santa-hat ${className}`} viewBox="0 0 240 150" aria-hidden="true">
    <defs><linearGradient id={`hat-red-${className}`} x2="1" y2="1"><stop stopColor="#fb4a58" /><stop offset=".4" stopColor="#cc1836" /><stop offset="1" stopColor="#8a122b" /></linearGradient></defs>
    <path d="M24 117Q34 30 133 15Q197 0 211 56L216 89 192 96Q187 59 167 52Q147 46 128 65L145 120Z" fill={`url(#hat-red-${className})`} stroke="#95142d" strokeWidth="2" />
    <path d="M40 101Q68 40 124 27" stroke="#ffb1b4" strokeWidth="3" opacity=".45" fill="none" />
    <path d="M153 48q-19 9-28 26" stroke="#820d29" strokeWidth="2" opacity=".45" fill="none" />
    <path d="M20 108Q78 86 146 110L147 135Q80 115 17 136Z" fill="#fffdf9" stroke="#d6dfdf" strokeWidth="2" />
    {Array.from({ length: 18 }, (_, index) => <circle key={index} cx={22 + index * 7} cy={113 + Math.sin(index * .2) * -5} r={5 + index % 3} fill="#fffdf9" />)}
    <circle cx="208" cy="97" r="21" fill="#fffdf9" stroke="#d6dfdf" strokeWidth="2" />
    {Array.from({ length: 10 }, (_, index) => <circle key={index} cx={208 + Math.cos(index * .63) * 17} cy={97 + Math.sin(index * .63) * 17} r="5" fill="#fffdf9" />)}
  </svg>;
}

export function ChristmasLights() {
  const svgRef = useRef(null);
  const animationsRef = useRef([]);
  const { moving } = useHoliday();
  useEffect(() => {
    const context = gsap.context(() => {
      animationsRef.current = [...svgRef.current.querySelectorAll('.light-bulb')].map((bulb, index) =>
        gsap.fromTo(bulb, { opacity: .45 }, { opacity: 1, duration: 1 + index % 5 * .22, delay: -index * .19, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true })
      );
    }, svgRef);
    return () => { context.revert(); animationsRef.current = []; };
  }, []);
  useEffect(() => { animationsRef.current.forEach(animation => animation.paused(!moving)); }, [moving]);
  const colors = ['#d83243', '#0b974b', '#e5ac18', '#d32f7c', '#128b51', '#ed7627'];
  return <svg ref={svgRef} className="christmas-lights" viewBox="0 0 380 35" aria-hidden="true">
    <path d="M2 4Q50 27 96 9T191 9T286 9T378 5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    {Array.from({ length: 15 }, (_, index) => {
      const x = 12 + index * 25, y = 10 + Math.sin(x / 30) * 7;
      return <g key={index} className="light-bulb" style={{ animationDelay: `${-index * .24}s` }}><path d={`M${x} ${y - 3}v7`} stroke="#355e42" strokeWidth="1.5" /><ellipse cx={x} cy={y + 7} rx="3" ry="4.2" fill={colors[index % colors.length]} /></g>;
    })}
  </svg>;
}

export function HolidayGreeting() {
  return <div className="holiday-greeting" aria-label="Merry Christmas!">
    <pre aria-hidden="true">{'*\\|/*\n--*--\n*/|\\*'}</pre>
    <div><span>Merry</span><br />Christmas!<small aria-hidden="true">········ <ChristmasIcon name="bow" /> ········</small></div>
    <pre aria-hidden="true">{'*\\|/*\n--*--\n*/|\\*'}</pre>
  </div>;
}
