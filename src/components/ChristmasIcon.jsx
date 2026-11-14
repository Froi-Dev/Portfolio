export default function ChristmasIcon({ name, size = 18 }) {
  const paths = {
    bell: <><path d="M7 16h10l-1.5-2V9a3.5 3.5 0 0 0-7 0v5L7 16Zm3 3h4M12 3v2" /><path d="m15 4 3-2-1 4 4 1-4 1" stroke="#4e9b66" /><circle cx="16" cy="7" r="1.2" fill="#c65060" stroke="none" /></>,
    gift: <><path d="M4 10h16v10H4zM3 6h18v4H3zM12 6v14" /><path d="M12 6C5 7 6 0 10 3l2 3Zm0 0c7 1 6-6 2-3l-2 3Z" stroke="#4e9b66" /></>,
    tree: <><path d="m12 3-5 6h3l-5 6h4l-5 5h16l-5-5h4l-5-6h3L12 3ZM12 20v3" /><circle cx="10" cy="13" r="1" fill="#c65060" stroke="none" /><circle cx="14" cy="18" r="1" fill="#c65060" stroke="none" /></>,
    bow: <><path d="M11 10C4 1 0 6 4 11l7 1Zm2 0c7-9 11-4 7 1l-7 1ZM10 12l-4 8 4-2 1 3 2-8m1-1 4 8-4-2-1 3" /><circle cx="12" cy="11" r="2" /></>,
  };
  return <svg className="christmas-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.gift}</svg>;
}
