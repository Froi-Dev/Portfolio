import Link from 'next/link';
export default function NotFound() {
  return <section className="content-section"><span className="eyebrow">404 / Page not found</span><h1>This page isn’t here.</h1><Link className="button button-primary" href="/">Back to Home</Link></section>;
}
