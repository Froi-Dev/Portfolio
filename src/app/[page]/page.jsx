import { notFound } from 'next/navigation';
import App from '../../App.jsx';

const pages = { about: 'About', projects: 'Projects', stack: 'Tech Stack', certifications: 'Certifications', contact: 'Contact' };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map(page => ({ page })); }
export async function generateMetadata({ params }) {
  const { page } = await params;
  return { title: pages[page] || 'Page not found' };
}
export default async function PortfolioPage({ params }) {
  const { page } = await params;
  if (!Object.hasOwn(pages, page)) notFound();
  return <App page={page} />;
}
