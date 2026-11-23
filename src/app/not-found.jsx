import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="content-section">
      <div className="wrap">
        <header className="section-heading">
          <h1>Page not found</h1>
        </header>
        <Link className="button button-primary" href="/">Return home</Link>
      </div>
    </section>
  );
}
