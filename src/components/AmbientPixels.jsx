import { Component, lazy, Suspense, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';

const PixelBlast = lazy(() => import('./reactbits/PixelBlast.jsx'));

class BackgroundBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function AmbientPixels({ theme }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 900px), (pointer: coarse)');
  const [supported] = useState(() => {
    try {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return false;
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return true;
    } catch { return false; }
  });
  return <div className="site-pixels" aria-hidden="true">
    <div className="site-grain" style={{ backgroundImage: `url("${import.meta.env.BASE_URL}images/grain.svg")` }} />
    {!reducedMotion && supported && <div className="site-pixel-animation"><BackgroundBoundary><Suspense fallback={null}>
      <PixelBlast variant="circle" pixelSize={compact ? 8 : 6} color={theme === 'light' ? '#000000' : '#ffffff'} patternScale={3} patternDensity={1.2} pixelSizeJitter={0.5} enableRipples={false} liquid={false} antialias={!compact} speed={0.6} edgeFade={0} transparent />
    </Suspense></BackgroundBoundary></div>}
  </div>;
}
