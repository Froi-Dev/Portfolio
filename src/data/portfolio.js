// Project descriptions reflect the supplied system banners.
// Add verified technology stacks when available.
export const PROJECTS = [
  {
    mark: 'CT',
    type: 'Tools',
    category: 'Education',
    name: 'ClassTrack',
    tagline: 'Monitor classroom participation, attendance, and live class sessions.',
    tech: [],
    desc: 'A desktop and web classroom participation monitoring system with a live session dashboard. The banner shows the interface with a simulated camera demo.',
    features: [
      'Live participation queue and hand-raise tracking',
      'Class and student management',
      'Attendance and seating overview',
      'Session history and class reports'
    ]
  },
  {
    mark: 'CH',
    type: 'Web App',
    category: 'Collaboration',
    name: 'CollHuborate',
    tagline: 'Create a workspace, assign tasks, and track project progress together.',
    tech: [],
    desc: 'A project collaboration platform that brings team workspaces, tasks, and deliverables into one place. The banner shows sample workspaces and tasks in the app.',
    features: [
      'Dedicated workspaces for each project',
      'Task assignments with priorities and deadlines',
      'Progress tracking across task statuses',
      'Shared files, submissions, and team activity'
    ]
  },
  {
    mark: 'CTF',
    type: 'Tools',
    category: 'Cybersecurity',
    name: 'CTF ToolKit',
    tagline: 'Decode, investigate, and discover with a cybersecurity analysis workspace.',
    tech: [],
    desc: 'A cybersecurity analysis platform bringing cryptography, forensics, and OSINT tools together. The banner highlights the decoder, layered recipes, and flag candidates.',
    features: [
      'Cryptography decoder with chained operations',
      'Recipe-based decoding with intermediate output',
      'Flag candidate identification',
      'Forensics, network analysis, and OSINT workspaces'
    ]
  },
  {
    mark: 'MX',
    type: 'Mobile Application',
    category: 'Music',
    name: 'Melodix',
    tagline: 'Build your library, organize playlists, and take your music with you.',
    tech: [],
    desc: 'An Android music app for finding tracks, building a personal library, and listening wherever you go, with downloads and offline playback.',
    features: [
      'Track search and personal music library',
      'Playlist creation and import',
      'Music downloads for offline playback',
      'Dedicated home, search, library, and settings views'
    ]
  },
  {
    mark: 'VA',
    type: 'Web App',
    category: 'Content Verification',
    name: 'Verif.AI',
    tagline: 'Check AI content, news, and images with context for Filipino readers.',
    tech: [],
    desc: 'A Philippine-focused content validation platform and browser extension for checking AI content, news, and images in English, Filipino, and Taglish.',
    features: [
      'AI content detection and fact verification',
      'Source analysis with confidence and context',
      'Browser extension for scanning selected text or images',
      'Support for English, Filipino, and Taglish'
    ]
  }
];

export const STACK = [
    {
      category: 'Frontend', items: [
        { name: 'HTML', icon: 'devicon-html5-plain colored', devicon: true },
        { name: 'CSS', icon: 'devicon-css3-plain colored', devicon: true },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored', devicon: true },
        { name: 'React', icon: 'devicon-react-original colored', devicon: true },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored', devicon: true },
        { name: 'Tailwind CSS', icon: 'bi-wind', color: '#38bdf8' },
        { name: 'Kotlin (Mobile)', icon: 'devicon-kotlin-plain colored', devicon: true }
      ]
    },
    {
      category: 'Backend', items: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored', devicon: true },
        { name: 'PHP', icon: 'devicon-php-plain colored', devicon: true },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored', devicon: true },
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', devicon: true },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', devicon: true },
        { name: 'Supabase', icon: 'bi-lightning-charge', color: '#3ecf8e' },
        { name: 'OAuth', icon: 'bi-shield-lock', color: '#34d399' },
        { name: 'Firebase', icon: 'devicon-firebase-plain colored', devicon: true }
      ]
    },
    {
      category: 'AI Technologies', items: [
        { name: 'ChatGPT', icon: 'bi-stars', color: '#10a37f' },
        { name: 'Claude', icon: 'bi-magic', color: '#da7756' },
        { name: 'Claude Code', icon: 'bi-terminal', color: '#da7756' },
        { name: 'Codex', icon: 'bi-code-square', color: '#10a37f' },
        { name: 'Hugging Face', icon: 'bi-emoji-smile', color: '#f5b929' },
        { name: 'Gemini', icon: 'bi-gem', color: '#4285f4' },
        { name: 'Cursor', icon: 'bi-cursor', color: '#6366f1' },
        { name: 'GitHub Copilot', icon: 'bi-robot', color: '#8957e5' }
      ]
    },
    {
      category: 'Developer Tools', items: [
        { name: 'Git', icon: 'devicon-git-plain colored', devicon: true },
        { name: 'GitHub', icon: 'devicon-github-original colored', devicon: true },
        { name: 'Figma', icon: 'devicon-figma-plain colored', devicon: true },
        { name: 'VS Code', icon: 'devicon-vscode-plain colored', devicon: true },
        { name: 'Antigravity IDE', icon: 'bi-rocket-takeoff', color: '#818cf8' },
        { name: 'Android Studio', icon: 'bi-phone', color: '#3ddc84' }
      ]
    },
    {
      category: 'Cloud & DevOps', items: [
        { name: 'Cloudflare Pages', icon: 'bi-cloud', color: '#f6821f' },
        { name: 'Render', icon: 'bi-hdd-network', color: '#a78bfa' },
        { name: 'Neon', icon: 'bi-database', color: '#00e599' },
        { name: 'Docker', icon: 'devicon-docker-plain colored', devicon: true }
      ]
    }
  ];


export const PROJECT_TYPES = ['All', ...new Set(PROJECTS.map(project => project.type))];

