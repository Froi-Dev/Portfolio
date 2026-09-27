// CV paths and certificate asset paths are relative to public/.
export const cvPath = 'documents/Froilan-De-Vera-CV.pdf';

// Titles and dates are transcribed from the supplied files.
// Verification URLs are decoded from the QR codes on those files.
export const certifications = [
  {
    id: 'cisco-ethical-hacker', title: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy', issuerKey: 'cisco',
    group: 'Cybersecurity', kind: 'Course completion', date: '22 Sep 2026',
    file: 'certificates/cisco-ethical-hacker.pdf', image: 'certificates/previews/cisco-ethical-hacker.png',
    url: 'https://www.credly.com/badges/ed5ff8e9-eb44-4473-992d-0b71b69436cb',
  },
  {
    id: 'cisco-introduction-to-cybersecurity', title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy', issuerKey: 'cisco',
    group: 'Cybersecurity', kind: 'Course completion', date: '07 Sep 2026',
    file: 'certificates/cisco-introduction-to-cybersecurity.pdf', image: 'certificates/previews/cisco-introduction-to-cybersecurity.png',
    url: 'https://www.credly.com/badges/cb278950-4e86-49a2-aa89-331fbde2a3c3',
  },
  {
    id: 'dict-ethical-hacker', title: 'Ethical Hacker',
    issuer: 'DICT–ITU DTC Initiative', issuerKey: 'dict',
    group: 'Cybersecurity', kind: 'Course completion', date: '22 Sep 2026',
    file: 'certificates/dict-ethical-hacker.pdf', image: 'certificates/previews/dict-ethical-hacker.png',
    url: 'https://www.netacad.com/recognitions/verify/0a482bad-1e62-434c-8254-7dedd9948a0f',
  },
  {
    id: 'dict-introduction-to-cybersecurity', title: 'Introduction to Cybersecurity',
    issuer: 'DICT–ITU DTC Initiative', issuerKey: 'dict',
    group: 'Cybersecurity', kind: 'Course completion', date: '07 Sep 2026',
    file: 'certificates/dict-introduction-to-cybersecurity.pdf', image: 'certificates/previews/dict-introduction-to-cybersecurity.png',
    url: 'https://www.netacad.com/recognitions/verify/96e4c2d8-cc85-485a-ac98-3cbf04801bec',
  },
  {
    id: 'cybersecurity-data-forensics', title: 'Cybersecurity Data Forensics',
    issuer: 'Digiforce · DICT · Makerspace Innovhub', issuerKey: 'digiforce',
    group: 'Training, competitions & recognition', kind: 'Certificate of attendance', date: '28 Feb 2026',
    file: 'certificates/cybersecurity-data-forensics.png', image: 'certificates/cybersecurity-data-forensics.png',
  },
  {
    id: 'kaspersky-ctf', title: 'Kaspersky CTF',
    issuer: 'Kaspersky', issuerKey: 'kaspersky',
    group: 'Training, competitions & recognition', kind: 'Certificate of participation', date: '30 Aug 2026',
    file: 'certificates/kaspersky-ctf.png', image: 'certificates/kaspersky-ctf.png',
  },
  {
    id: 'dict-cyberpro', title: 'Cybersecurity Professionals Portal',
    issuer: 'DICT', issuerKey: 'dict',
    group: 'Training, competitions & recognition', kind: 'Level 1 · Entry-Level recognition', date: '22 Sep 2026',
    file: 'certificates/dict-cyberpro-badge.png', image: 'certificates/dict-cyberpro-badge.png',
    url: 'https://cyberpro.dict.gov.ph/verify/CPB-DM4H-FQFN-6NAF-DP6H',
  },
];
