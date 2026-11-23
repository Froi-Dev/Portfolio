const iconPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icons/`;

const logos = {
  React: 'react',
  Kotlin: 'kotlin',
  PostgreSQL: 'stack/postgres',
  TypeScript: 'stack/typescript',
  Vite: 'stack/vite',
  'Radix UI': 'stack/radixui',
  Rust: 'stack/rust',
  SQLite: 'stack/sqlite',
  OpenGL: 'stack/opengl',
  Python: 'stack/python',
  FastAPI: 'stack/fastapi',
  'Jetpack Compose': 'stack/jetpackcompose',
  Express: 'stack/express',
  Pydantic: 'stack/pydantic',
  PyTorch: 'stack/pytorch',
  Redis: 'stack/redis',
};

// Use descriptive glyphs for system APIs and libraries without a separate mark.
const windows = 'M3 4.5 21 2v20L3 19.5zM11 3.4v17.2M3 12h18';
const glyphs = {
  Win32: windows,
  'Windows APIs': windows,
  RichEdit: 'M5 4h10l4 4v12H5zM9 10h6m-6 4h6m-6 3h3',
  'egui / eframe': 'M3 5h18v14H3zM3 9h18M10 9v10m3-6h5m-5 3h5',
  sysinfo: 'M3 12h4l2-6 4 12 2-6h6',
  Serde: 'm9 5-5 7 5 7m6-14 5 7-5 7M11 15l2-6',
  Room: 'M19 6c0 1.7-3.1 3-7 3S5 7.7 5 6s3.1-3 7-3 7 1.3 7 3ZM5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  Media3: 'M4 5h16v14H4zM10 9l5 3-5 3z',
  WebSocket: 'M3 8h17m-4-4 4 4-4 4M21 16H4m4-4-4 4 4 4',
  Uvicorn: 'M4 4h16v7H4zM4 14h16v6H4zm3-6h2m-2 9h2',
  YOLO: 'M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5m8-6a3 3 0 1 0 0 6 3 3 0 1 0 0-6z',
};

const code = 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14';

export default function ProjectStackIcon({ technology }) {
  if (Object.hasOwn(logos, technology)) {
    return <img src={`${iconPath}${logos[technology]}.svg`} width="18" height="18" alt="" />;
  }

  const path = Object.hasOwn(glyphs, technology) ? glyphs[technology] : code;
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
