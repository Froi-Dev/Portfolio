import { notFound } from 'next/navigation';
import PortfolioRedirect from '../../components/PortfolioRedirect.jsx';
import { portfolioSections } from '../../lib/portfolioLinks.js';

const oldSections = Object.keys(portfolioSections).filter(section => section !== 'home');

export const dynamicParams = false;

export function generateStaticParams() {
  return oldSections.map(page => ({ page }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return { title: portfolioSections[page] || 'Page not found', robots: { index: false, follow: true } };
}

export default async function PortfolioPage({ params }) {
  const { page } = await params;
  if (!oldSections.includes(page)) notFound();
  return <PortfolioRedirect section={page} />;
}
