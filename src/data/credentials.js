// CV paths and certificate asset paths are relative to public/.
export const cvPath = 'documents/Froilan-De-Vera-CV.pdf';

// Add records to this array to include them in the matching folder. Image credentials can omit file.
// For PDFs, image supplies the thumbnail and optional preview supplies a larger render for the viewer.
// The file stays available as the original download. A verification URL is optional.
export const credentials = [
  {
    id: 'appbuildersph-hackathon-2026', title: 'AppBuildersPH Hackathon 2026',
    issuer: 'App Builders PH', category: 'Competition',
    kind: 'Certificate of participation', date: '09–10 Oct 2026',
    file: 'certificates/appbuildersph-hackathon-2026.pdf', image: 'certificates/previews/appbuildersph-hackathon-2026.png',
    preview: 'certificates/full/appbuildersph-hackathon-2026.webp',
  },
  {
    id: 'aws-certified-cloud-practitioner', title: 'AWS Certified Cloud Practitioner',
    issuer: 'TESDA Online Program', category: 'Cloud & Development',
    kind: 'Course completion · CLF-C02', date: '24 Oct 2026',
    file: 'certificates/aws-certified-cloud-practitioner.pdf', image: 'certificates/previews/aws-certified-cloud-practitioner.png',
    preview: 'certificates/full/aws-certified-cloud-practitioner.webp',
  },
  {
    id: 'adbi-cybersecurity', title: 'Cybersecurity',
    issuer: 'Asian Development Bank Institute', category: 'CyberSecurity',
    kind: 'Course completion', date: '23 Sep 2026',
    file: 'certificates/adbi-cybersecurity.pdf', image: 'certificates/previews/adbi-cybersecurity.png',
    preview: 'certificates/full/adbi-cybersecurity.webp',
    url: 'https://elearning-adbi.org/certificate-verifier/?&code=197737-179-013-6504',
  },
  {
    id: 'cisco-ethical-hacker', title: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy', category: 'CyberSecurity',
    kind: 'Course completion', date: '22 Sep 2026',
    file: 'certificates/cisco-ethical-hacker.pdf', image: 'certificates/previews/cisco-ethical-hacker.png',
    preview: 'certificates/full/cisco-ethical-hacker.webp',
    url: 'https://www.credly.com/badges/ed5ff8e9-eb44-4473-992d-0b71b69436cb',
  },
  {
    id: 'cisco-introduction-to-cybersecurity', title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy', category: 'CyberSecurity',
    kind: 'Course completion', date: '07 Sep 2026',
    file: 'certificates/cisco-introduction-to-cybersecurity.pdf', image: 'certificates/previews/cisco-introduction-to-cybersecurity.png',
    preview: 'certificates/full/cisco-introduction-to-cybersecurity.webp',
    url: 'https://www.credly.com/badges/cb278950-4e86-49a2-aa89-331fbde2a3c3',
  },
  {
    id: 'dict-ethical-hacker', title: 'Ethical Hacker',
    issuer: 'DICT–ITU DTC Initiative', category: 'CyberSecurity',
    kind: 'Course completion', date: '22 Sep 2026',
    file: 'certificates/dict-ethical-hacker.pdf', image: 'certificates/previews/dict-ethical-hacker.png',
    preview: 'certificates/full/dict-ethical-hacker.webp',
    url: 'https://www.netacad.com/recognitions/verify/0a482bad-1e62-434c-8254-7dedd9948a0f',
  },
  {
    id: 'dict-introduction-to-cybersecurity', title: 'Introduction to Cybersecurity',
    issuer: 'DICT–ITU DTC Initiative', category: 'CyberSecurity',
    kind: 'Course completion', date: '07 Sep 2026',
    file: 'certificates/dict-introduction-to-cybersecurity.pdf', image: 'certificates/previews/dict-introduction-to-cybersecurity.png',
    preview: 'certificates/full/dict-introduction-to-cybersecurity.webp',
    url: 'https://www.netacad.com/recognitions/verify/96e4c2d8-cc85-485a-ac98-3cbf04801bec',
  },
  {
    id: 'cybersecurity-data-forensics', title: 'Cybersecurity Data Forensics',
    issuer: 'Digiforce · DICT · Makerspace Innovhub', category: 'CyberSecurity',
    kind: 'Certificate of attendance', date: '28 Feb 2026',
    file: 'certificates/cybersecurity-data-forensics.png', image: 'certificates/cybersecurity-data-forensics.png',
  },
  {
    id: 'kaspersky-ctf', title: 'Kaspersky CTF',
    issuer: 'Kaspersky', category: 'Competition',
    kind: 'Certificate of participation', date: '30 Aug 2026',
    file: 'certificates/kaspersky-ctf.png', image: 'certificates/kaspersky-ctf.png',
  },
  {
    id: 'tesda-national-certificate-ii-css', title: 'Computer Systems Servicing · NC II',
    issuer: 'TESDA', category: 'Cloud & Development',
    kind: 'National Certificate II', date: '15 Jul 2023',
    file: 'certificates/nc-certificate.pdf', image: 'certificates/previews/nc-certificate.png',
  },
  {
    id: 'claude-code-101', title: 'Claude Code 101', issuer: 'Claude Academy',
    category: 'Badge', kind: 'Digital badge', date: '24 Oct 2026',
    image: 'certificates/previews/claude-code-101-badge.png', file: 'certificates/claude-code-101-badge.pdf',
    preview: 'certificates/full/claude-code-101-badge.webp',
    url: 'https://academy.claude.com/verify/8eb3afad4815245f4cf32abcd68f1aaa',
  },
  {
    id: 'claude-mcp-advanced', title: 'Model Context Protocol: Advanced Topics', issuer: 'Claude Academy',
    category: 'Badge', kind: 'Digital badge', date: '24 Oct 2026',
    image: 'certificates/previews/claude-mcp-advanced-badge.png', file: 'certificates/claude-mcp-advanced-badge.pdf',
    preview: 'certificates/full/claude-mcp-advanced-badge.webp',
    url: 'https://academy.claude.com/verify/485728a66defdcecd813145b815f2e4',
  },
  {
    id: 'google-generative-ai', title: 'Introduction to Generative AI', issuer: 'Google Cloud',
    category: 'Badge', kind: 'Digital badge', date: '07 Oct 2026',
    image: 'certificates/google-generative-ai-badge.png', file: 'certificates/google-generative-ai-badge.png',
  },
  {
    id: 'openai-codex', title: 'Get Started with Codex', issuer: 'OpenAI Academy',
    category: 'Badge', kind: 'Digital badge', date: '—',
    image: 'certificates/openai-get-started-with-codex-badge.png', file: 'certificates/openai-get-started-with-codex-badge.png',
  },
  {
    id: 'dict-cyberpro', title: 'Cybersecurity Professionals Portal · Level 1', issuer: 'DICT',
    category: 'Badge', kind: 'Digital badge', date: '22 Sep 2026',
    image: 'certificates/dict-cyberpro-badge.png', file: 'certificates/dict-cyberpro-badge.png',
    url: 'https://cyberpro.dict.gov.ph/verify/CPB-DM4H-FQFN-6NAF-DP6H',
  },
];
