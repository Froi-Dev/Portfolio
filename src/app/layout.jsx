import PortfolioShell from '../components/PortfolioShell.jsx';
import '../styles.css';
import '../refinements.css';
import '../pages.css';
import '../responsive.css';
import '../christmas.css';

export const metadata = {
  title: { default: 'Froilan De Vera — The Christmas Edition', template: '%s — Froilan De Vera' },
  description: 'Full Stack & AI-Assisted Developer. Clean, useful digital experiences, with a little Christmas magic.',
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#f4f7fa' };

export default function RootLayout({ children }) {
  return <html lang="en" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700,800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css" />
    </head>
    <body><PortfolioShell>{children}</PortfolioShell></body>
  </html>;
}
