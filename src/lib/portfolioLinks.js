export const portfolioSections = {
  home: 'Home',
  about: 'About',
  projects: 'Projects',
  stack: 'Stack',
  certifications: 'Certificates',
  contact: 'Contact',
};

export function portfolioHref(section, onPortfolio = false) {
  return onPortfolio ? `#${section}` : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/#${section}`;
}
