// New project details and stacks are verified against their local source folders.
// Existing project details reflect the supplied system banners.
export const PROJECTS = [
  {
    mark: 'DC',
    type: 'Web App',
    category: 'Ordering System',
    name: 'DŌU Cookie',
    tagline: 'Choose a cookie box, build your bag, and prepare an order preview.',
    tech: ['React', 'TypeScript', 'Vite', 'Radix UI'],
    desc: 'A responsive Dubai chewy cookie ordering storefront with product box selection, quantity controls, a persistent shopping bag, and a delivery details flow. Checkout validates the details and generates a downloadable order preview; the current demo does not submit orders or process payments.',
    features: [
      'Browse and compare 2, 6, and 12-cookie boxes with sample prices',
      'Choose box quantities and add them to a persistent shopping bag',
      'Review item totals and sample delivery charges',
      'Enter delivery details with Philippine mobile number validation',
      'Generate and download a clearly labeled order preview'
    ]
  },
  {
    mark: 'RN',
    type: 'Desktop App',
    category: 'Productivity',
    name: 'RustNote',
    tagline: 'Write in tabs, float sticky notes, and keep your ideas within reach.',
    tech: ['Rust', 'Win32', 'RichEdit', 'SQLite'],
    desc: 'A native Windows rich-text editor with document tabs and floating sticky notes. Local SQLite storage, autosave, and session recovery keep writing available offline.',
    features: [
      'Rich-text formatting and RTF document support',
      'Move notes between editor tabs and floating sticky windows',
      'Pin notes on top with color, opacity, and editing-lock controls',
      'Autosave, session recovery, and archived closed-note recovery',
      'Find and replace with external-file change detection'
    ]
  },
  {
    mark: 'FN',
    type: 'Desktop App',
    category: 'Network Monitoring',
    name: 'FroiNet',
    tagline: 'Keep live upload, download, and recent traffic in view.',
    tech: ['Rust', 'egui / eframe', 'OpenGL', 'sysinfo'],
    desc: 'A lightweight Windows network monitor with live upload and download rates in a floating overlay. Compact and detailed views make it easy to watch activity while working.',
    features: [
      'Live network rates updated every second',
      '60-sample traffic chart with session peaks and adapter details',
      'Compact and detailed views in a movable overlay',
      'Always-on-top and adjustable opacity controls',
      'Saved layout and settings with offscreen window recovery'
    ]
  },
  {
    mark: 'FF',
    type: 'Desktop App',
    category: 'File Management',
    name: 'Flux File Manager',
    tagline: 'Browse, organize, and understand your Windows storage.',
    tech: ['Rust', 'egui / eframe', 'Windows APIs', 'Serde'],
    desc: 'A native Windows file manager built in Rust, combining responsive browsing, storage analysis, and everyday file operations. This portable beta includes search, duplicate discovery, and Recycle Bin tools.',
    features: [
      'Drive and folder browsing with sorting, filters, and image thumbnails',
      'Create, rename, copy, cut, and paste with Windows clipboard support',
      'Recursive search by filename, extension, size, and modified date',
      'Storage breakdowns and SHA-256 verified duplicate discovery',
      'Recycle Bin browsing, recycling, and file restoration'
    ]
  },
  {
    mark: 'CR',
    type: 'Web App',
    category: 'Customer Support',
    name: 'CareRoute A.I',
    tagline: 'Suggest FAQ answers and route sensitive tickets to people.',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite'],
    desc: 'A local customer-support triage dashboard that organizes tickets and routes sensitive requests to human review. Routine requests use approved FAQ suggestions, with an optional local language model through Ollama.',
    features: [
      'Ticket submission with persistent local storage',
      'Category and priority detection with rules for human escalation',
      'Offline FAQ suggestions and optional Ollama-assisted triage',
      'Searchable inbox with status, priority, category, and routing filters',
      'Agent review, editing, approval, and preserved decision history'
    ]
  },
  {
    mark: 'MX',
    type: 'Mobile Application',
    category: 'Music',
    name: 'Melodix',
    tagline: 'Find tracks, build playlists, and listen offline on Android.',
    tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Media3'],
    desc: 'An Android music app for searching tracks, downloading audio, organizing a local library, and listening offline with background playback.',
    features: [
      'YouTube track search and audio downloads with progress tracking',
      'Offline library with favorites, recently played, and most played tracks',
      'Editable playlists with custom covers and track ordering',
      'Spotify playlist import',
      'Background playback with queues, shuffle, repeat, and playback speed'
    ]
  },
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

