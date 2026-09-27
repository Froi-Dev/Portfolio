// Essential controls render locally so a delayed icon font cannot hide them.
const controlPaths = {
  'arrow-left': 'M19 12H5m7-7-7 7 7 7',
  'arrow-right': 'M5 12h14m-7-7 7 7-7 7',
  'arrow-up-right': 'M6 18 18 6M6 6h12v12',
  'pause-fill': 'M8 5v14M16 5v14',
  'play-fill': 'm8 5 11 7-11 7Z',
  'x-lg': 'm6 6 12 12M6 18 18 6',
  'check2': 'm5 12 4 4L19 6',
  copy: 'M9 9h11v11H9ZM15 9V4H4v11h5',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  'moon-stars': 'M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5M17 2v4m-2-2h4',
};

export default function Icon({ name, className = '' }) {
  if (controlPaths[name]) return <svg className={`bi control-icon ${className}`} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={controlPaths[name]} /></svg>;
  return <i className={`bi bi-${name} ${className}`} aria-hidden="true" />;
}
