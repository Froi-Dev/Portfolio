import PortfolioShell from '../components/PortfolioShell.jsx';
import '../portfolio.css';

const description = 'Froilan De Vera is a full-stack developer building web, Windows, and Android applications.';

export const metadata = {
  title: { default: 'Froilan De Vera | Full-stack developer', template: '%s | Froilan De Vera' },
  description,
  openGraph: { title: 'Froilan De Vera | Full-stack developer', description, type: 'website' },
};

export const viewport = { themeColor: '#f7f2ea' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-type="service" data-buttons="solid">
      <head>
        <meta name="page-type" content="service" />
        <meta name="site-kind" content="other" />
      </head>
      <body><PortfolioShell>{children}</PortfolioShell></body>
    </html>
  );
}
