export const PROJECTS = [
    {
      mark: 'ET',
      type: 'Web App',
      category: 'Finance',
      name: 'Expense Tracker',
      tagline: 'A clean, fast way to log spending and see where the money actually goes.',
      tech: ['React', 'Node.js', 'MongoDB'],
      desc: 'A personal finance dashboard that turns raw transactions into readable trends, with budgets that adjust as spending habits change.',
      features: [
        'Category-based budgeting with live progress bars',
        'Monthly trend charts built from real transaction history',
        'CSV import for bank statements',
        'Multi-currency support'
      ]
    },
    {
      mark: 'MH',
      type: 'Mobile Application',
      category: 'Health',
      name: 'Mental Health App',
      tagline: 'Daily check-ins and guided journaling for calmer, more consistent days.',
      tech: ['Kotlin', 'Jetpack Compose', 'Firebase'],
      desc: 'A mobile companion for mood tracking and guided journaling, designed to feel calm rather than clinical.',
      features: [
        'Daily mood check-in with gentle reminders',
        'Guided journaling prompts',
        'Private, on-device-first data model',
        'Weekly reflection summaries'
      ]
    },
    {
      mark: 'MP',
      type: 'Web App',
      category: 'Media',
      name: 'Music Player',
      tagline: 'A distraction-free player with playlists, queueing, and a focus on sound.',
      tech: ['JavaScript', 'HTML5 Audio', 'Firebase'],
      desc: 'A lightweight web music player focused on a fast, uncluttered listening experience with real-time queue management.',
      features: [
        'Drag-to-reorder playback queue',
        'Custom playlists with shareable links',
        'Waveform-based seek bar',
        'Offline caching for recent tracks'
      ]
    },
    {
      mark: 'CS',
      type: 'Website',
      category: 'Social',
      name: 'Campus Social Network',
      tagline: 'A closed community space for students to share, plan, and stay in the loop.',
      tech: ['PHP', 'MySQL', 'Bootstrap'],
      desc: 'A campus-only social platform for clubs, events, and announcements, built to reduce reliance on scattered group chats.',
      features: [
        'Verified student authentication',
        'Event pages with RSVP tracking',
        'Club-specific discussion boards',
        'Admin moderation dashboard'
      ]
    },
    {
      mark: 'RS',
      type: 'Web App',
      category: 'Operations',
      name: 'Reservation System',
      tagline: 'Booking and scheduling that keeps double-bookings from ever happening.',
      tech: ['React', 'Node.js', 'MySQL'],
      desc: 'A booking platform for small venues, handling availability, confirmations, and reminders end to end.',
      features: [
        'Real-time availability calendar',
        'Automated email/SMS confirmations',
        'Role-based staff access',
        'Exportable booking reports'
      ]
    },
    {
      mark: 'IS',
      type: 'Tools',
      category: 'Operations',
      name: 'Inventory System',
      tagline: 'Stock levels, purchase orders, and low-stock alerts in one dashboard.',
      tech: ['PHP', 'MySQL', 'Bootstrap'],
      desc: 'An inventory management tool for small retailers, tracking stock movement across multiple locations.',
      features: [
        'Low-stock alerts with reorder suggestions',
        'Barcode-friendly product lookup',
        'Multi-location stock transfer',
        'Sales & stock history reports'
      ]
    },
    {
      mark: 'JC',
      type: 'Web App',
      category: 'E-commerce',
      name: 'Jewelry Customization App',
      tagline: 'Design a piece in real time and see the price update as choices change.',
      tech: ['React', 'Node.js', 'Firebase'],
      desc: 'An interactive configurator letting customers build custom jewelry pieces and preview them before ordering.',
      features: [
        'Real-time visual customization',
        'Dynamic pricing based on materials',
        'Saved designs & wishlists',
        'Order tracking dashboard'
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


export const PROJECT_TYPES = ['All', 'Website', 'Web App', 'Mobile Application', 'Tools'];

