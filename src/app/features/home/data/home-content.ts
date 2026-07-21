import { PortfolioContent } from '../../../shared/models/portfolio.model';

export const HOME_CONTENT: PortfolioContent = {
  fullName: 'Engr. Jatsen P. Gesta',
  role: 'Software Engineer',
  contact: {
    phone: '+63 962 192 6650',
    email: 'jatsen.gesta99@gmail.com',
    linkedin: 'linkedin.com/in/jatsengesta',
    location: 'Trece Martires, Cavite, Philippines',
  },
  hero: {
    badge: 'I Build Reliable Full-Stack Solutions',
    titleLead: 'Software Engineer with',
    titleAccent: 'Production Experience',
    summary:
      'Nearly 3 years of hands-on experience in full-stack development, performance optimization, and scalable solution delivery from implementation to deployment.',
    ctaLabel: 'Contact Me',
    ctaLink: '#contact',
  },
  about: {
    heading: 'I Design and Build Systems That Scale',
    description:
      'I focus on end-to-end software delivery, including requirements analysis, implementation, testing, and deployment. I write optimized SQL, build robust APIs, and collaborate across teams to ship reliable features on time.',
    highlights: [
      'Full-stack development with Angular, TypeScript, Java, and Python',
      'Performance optimization through efficient SQL and backend scripts',
      'Strong collaboration with developers and QA in production environments',
      'Version control, debugging, and software quality best practices',
    ],
    stats: [
      { label: 'Years Experience', value: '3+' },
      { label: 'Current Role Since', value: '2023' },
      { label: 'Core Focus', value: 'Full-Stack' },
    ],
  },
  services: [
    {
      title: 'Full-Stack Development',
      description: 'Build and maintain production-ready web applications using modern frontend and backend technologies.',
    },
    {
      title: 'API & CRUD Features',
      description: 'Develop API endpoints and business features with clean validation and reliable data handling.',
    },
    {
      title: 'Performance Optimization',
      description: 'Improve system performance and reliability by optimizing SQL queries, scripts, and data flows.',
    },
    {
      title: 'Bug Fixing & Refactoring',
      description: 'Resolve issues quickly and refactor legacy code to improve maintainability and delivery speed.',
    },
  ],
  experiences: [
    {
      role: 'Software Engineer',
      company: 'E-Science Corporation',
      location: 'Muntinlupa City, Philippines',
      type: 'Full-time (Hybrid)',
      period: 'July 2023 - Present',
      bullets: [
        'Developed and maintained production-ready full-stack applications following established coding standards and best practices.',
        'Implemented new features and system enhancements based on approved business requirements and technical specifications.',
        'Analyzed assigned tasks by reviewing requirements, estimating development effort, and identifying potential risks prior to implementation.',
        'Optimized SQL queries and database scripts to enhance system performance, scalability, and data reliability.',
        'Resolved bugs, refactored existing code, and contributed to continuous system improvements and maintainability.',
        'Collaborated closely with developers and QA testers to deliver stable, reliable, and high-quality application features.',
        'Utilized AI-assisted development tools such as GitHub Copilot, Amazon Q, Codex, and prompt engineering techniques to improve coding efficiency, accelerate debugging, and streamline delivery timelines.',
      ],
      tags: ['Angular', 'TypeScript', 'Java', 'SQL', 'AWS', 'Git', 'Agile', 'GitHub Copilot', 'Amazon Q'],
    },
    {
      role: 'Software Engineer Intern',
      company: 'E-Science Corporation',
      location: 'Muntinlupa City, Philippines',
      type: 'Internship (Hybrid)',
      period: 'March 2023 - June 2023',
      bullets: [
        'Assisted in developing API features including CRUD operations.',
        'Practiced SQL query validation for file uploads and data processing.',
        'Applied version control, debugging, and real-world development workflows.',
      ],
      tags: ['Angular', 'Java', 'SQL', 'Git'],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Engineering',
      school: 'Technological University of the Philippines - Dasmarinas, Cavite',
      period: '2019 - 2023',
      details: [
        'Relevant coursework: Data Structures & Algorithms, OOP, Python, Full-Stack Web Development, SQL Database, Computer Networks, Software Engineering, Operating Systems',
      ],
    },
  ],
  skillCategories: [
    {
      category: 'Languages & Frameworks',
      items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Angular'],
    },
    {
      category: 'Cloud & Dev Tools',
      items: ['AWS Lambda', 'AWS Cognito', 'AWS S3', 'CloudWatch', 'Git', 'Jira'],
    },
    {
      category: 'Other Strengths',
      items: ['Microservices', 'Serverless', 'SQL', 'Communication', 'Agile Collaboration'],
    },
  ],
  projects: [
    {
      id: 'pet-bottle-points',
      name: 'PET Bottle to Points System',
      category: 'Web App',
      stack: 'Django + Python',
      summary: 'Student project that converts PET bottle collection into a points-based reward workflow.',
      date: 'Q2 2023',
      tags: ['Python', 'Django', 'SQL', 'JavaScript', 'HTML', 'CSS'],
      role: 'Full-Stack Developer',
      previewImage: 'assets/images/pet-bottle-points.png',
      timeline: { started: 'Mar 2023', shipped: 'May 2023' },
      sections: [
        {
          heading: 'Why I Built This',
          body: 'This was a capstone-adjacent project aimed at promoting environmental awareness. The idea was to gamify recycling — students submit PET bottles and earn points redeemable for rewards, making sustainability tangible and fun.',
        },
        {
          heading: 'How It Works',
          body: 'The Angular frontend lets users log bottle submissions and track their points balance. A REST API handles CRUD operations backed by a SQL database. Admins can verify submissions and manage the rewards catalog.',
        },
        {
          heading: 'How to Use',
          body: 'Students register, submit bottle counts, and watch their points grow. Admins approve submissions and manage rewards. The dashboard shows leaderboards and redemption history.',
        },
      ],
    },
    {
      id: 'estyrascollection',
      name: "Estyra's Collection",
      category: 'Web App',
      stack: 'Angular + TypeScript',
      summary: 'Online fashion store for stylish and elegant women\'s outfits — fast, responsive, and seamless across all devices.',
      liveUrl: 'https://estyrascollection.online/',
      date: 'Q2 2025',
      tags: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
      role: 'Frontend Developer',
      timeline: { started: 'Q1 2025', shipped: 'Q2 2025' },
      mockupType: 'browser-mobile',
      previewImage: 'assets/images/estyras-collection.png',
      sections: [
        {
          heading: 'Why I Built This',
          body: "Estyra's Collection needed a modern online presence that matched the brand's identity — stylish, elegant, and empowering. I built a fast, responsive storefront that lets customers browse trendy outfits effortlessly, whether on mobile or desktop.",
        },
        {
          heading: 'How It Works',
          body: 'Built with Angular and TypeScript for a component-driven, maintainable codebase. The site is fully responsive using modern CSS, ensuring a seamless shopping experience across all screen sizes. JavaScript powers interactive UI elements for a smooth, engaging feel.',
        },
        {
          heading: 'How to Use',
          body: 'Visit the live site to browse the collection — from casual everyday wear to chic statement pieces. Explore categories, view outfit details, and discover styles designed to highlight individuality for both everyday lifestyle and special occasions.',
        },
      ],
    },
  ],
  certifications: [
    {
      name: 'Model Context Protocol (MCP): Hands-On with Agentic AI',
      issuer: 'LinkedIn',
      date: 'Jun 2026',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/4dee2a2181da6be0c833c506d3798a656f40851b13626e5a4e8edbe3ca3e39d3',
      imageUrl: 'assets/images/certificates/Model Context Protocol (MCP)- Hands-On with Agentic AI.jpeg',
    },
    {
      name: 'Claude Code 4: Agentic Coding for Professional Developers',
      issuer: 'LinkedIn',
      date: 'Jun 2026',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/ac8f9702df814971c7aa740939cdb799be9ddbf69261ca4da07f887ea496ac84',
      imageUrl: 'assets/images/certificates/Claude Code 4- Agentic Coding for Professional Developers.jpeg',
    },
    {
      name: 'Claude Code 101: From Prompt to Product',
      issuer: 'LinkedIn',
      date: 'Jun 2026',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/c1386ebdb7f88ae735fe5211e7717c093ceae351480f526a8d1ef348dffbe482',
      imageUrl: 'assets/images/certificates/Claude Code 101- From Prompt to Product.jpeg',
    },
    {
      name: 'Leadership Mindsets',
      issuer: 'LinkedIn Learning Community',
      date: 'May 2026',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/7fc9961d8ffbad68b87c044b36c135f71dcede50f7d73e9db69a7232f2398b66',
      imageUrl: 'assets/images/certificates/Leadership Mindset.jpeg',
    },
    {
      name: 'Emerging Leader Foundations',
      issuer: 'LinkedIn Learning Community',
      date: 'May 2026',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/a87cc7e7553d2d7f2dfe8f6e8ebd0f6f83bbd491ab2856dbdeb48e88d1d8c806',
      imageUrl: 'assets/images/certificates/Emerging Leader Foundations.jpeg',
    },
    {
      name: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM',
      date: 'May 2026',
      credentialUrl: 'https://www.credly.com/badges/f7557100-8175-4716-a873-f4df287ea506/public_url',
      imageUrl: 'assets/images/certificates/Artificial Intelligence Fundamentals.jpeg',
    },
    {
      name: 'Introduction to Modern AI',
      issuer: 'Cisco Networking Academy',
      date: 'May 2026',
      credentialUrl: 'https://www.credly.com/badges/1f723a51-8a41-478b-b775-57b621a1918a/public_url',
      imageUrl: 'assets/images/certificates/Introduction to Modern AI.jpeg',
    },
  ],
  blogPosts: [
    {
      slug: 'how-claude-code-fits-into-my-workflow',
      title: 'How Claude Code Fits Into My Daily Workflow',
      excerpt: 'Setting up and using an AI pair programmer without losing control of your codebase.',
      date: 'Jul 2026',
      readTime: '5 min read',
      tags: ['Claude Code', 'AI Tools', 'Productivity'],
      sections: [
        {
          heading: 'Why I Started Using It',
          body: "Claude Code started as a way to speed up boring parts of the job: boilerplate, repetitive refactors, digging through unfamiliar code. It stuck around because it's genuinely useful for that, as long as I keep reviewing everything it touches instead of trusting it blindly.",
        },
        {
          heading: 'Getting Set Up',
          body: "Install it with npm: npm install -g @anthropic-ai/claude-code. Then cd into a project and run claude — it opens an interactive session right in your terminal, scoped to that repo. Sign in once with your Anthropic account and you're set. No separate IDE plugin required, though editor integrations exist if you want them.",
        },
        {
          heading: 'The One File That Changes Everything: CLAUDE.md',
          body: "Add a CLAUDE.md to your repo root with your commands (build, test, lint), folder structure, and conventions (naming, styling rules, things not to do). Claude reads it automatically at the start of every session. Without it, you re-explain the same project context every time. With it, Claude behaves like it already onboarded onto your codebase.",
        },
        {
          heading: 'How I Actually Use It',
          body: "Mostly for: understanding legacy code before I touch it, writing repetitive tests, drafting a first pass at a feature so I'm editing instead of starting from a blank file, and catching small bugs during review. I still read every diff before committing. It's a fast collaborator, not an autopilot — the judgment calls stay mine.",
        },
        {
          heading: 'Quick Tips',
          body: "Be specific in prompts — vague requests get vague results.\nUse plan mode for anything that touches multiple files, so you can review the approach before code gets written.\nNever let it run destructive git commands (force-push, reset --hard) without asking first.\nWhen you don't understand a piece of code, just ask it to explain — that's often more valuable than having it write new code.",
        },
      ],
    },
    {
      slug: 'docker-made-my-local-dev-setup-reliable',
      title: 'Docker Made My Local Dev Setup Actually Reliable',
      excerpt: "No more \"works on my machine.\" A few Docker habits that saved me hours of environment debugging.",
      date: 'Jun 2026',
      readTime: '4 min read',
      tags: ['Docker', 'DevOps'],
      sections: [
        {
          heading: 'The Problem It Solved For Me',
          body: "Before Docker, onboarding onto a project meant installing the right Node version, the right database, the right everything — and hoping it matched what everyone else had. Docker fixed that by packaging the whole environment as code. If it runs in the container, it runs the same way on every machine, including the CI server.",
        },
        {
          heading: 'Docker Compose Is the Real Win',
          body: "A single docker-compose.yml can spin up your app, database, and any supporting services together with one command: docker compose up. No more juggling five terminal tabs remembering which service needs to start first — Compose handles the dependency order for you.",
        },
        {
          heading: 'Habits That Keep It Clean',
          body: "Add a .dockerignore file so you're not copying node_modules or .git into your build context. Use multi-stage builds to keep production images small — build in one stage, copy only the compiled output into a slim final image. And run docker system prune every so often, or old images and volumes will quietly eat your disk.",
        },
        {
          heading: 'Quick Commands I Use Daily',
          body: "docker compose up -d — start everything in the background.\ndocker compose logs -f <service> — tail logs for one service.\ndocker exec -it <container> sh — jump into a running container to debug.\ndocker compose down -v — tear everything down and reset volumes when state gets weird.",
        },
      ],
    },
    {
      slug: 'git-habits-i-wish-i-started-sooner',
      title: 'Git Habits I Wish I Started Sooner',
      excerpt: "Small standards around commits and branches that make a codebase's history actually useful.",
      date: 'Jun 2026',
      readTime: '4 min read',
      tags: ['Git', 'Best Practices'],
      sections: [
        {
          heading: 'Write Commits for Future You',
          body: "A commit message should explain why a change was made, not just what changed — the diff already shows what. Use the imperative mood (\"fix null check\" not \"fixed null check\") and keep commits small and atomic: one logical change per commit. Six months later, git log becomes a story you can actually follow instead of a wall of \"wip\" and \"fix stuff.\"",
        },
        {
          heading: "A Branching Convention That Doesn't Get in the Way",
          body: "I keep it simple: feature/, fix/, and chore/ prefixes so anyone can tell what a branch is for at a glance. Branches stay short-lived — the longer one lives, the more it drifts from main and the worse the eventual merge gets. Rebasing onto main before opening a PR keeps history linear and avoids noisy merge commits.",
        },
        {
          heading: 'Before You Push',
          body: "Review your own diff first — git diff --staged catches things a second look on GitHub won't. Squash noisy WIP commits into something coherent before opening a PR; nobody needs to see your 14 attempts to fix a typo. And never force-push a shared branch without warning your team — it rewrites history for everyone pulling from it.",
        },
        {
          heading: 'The .gitignore Habit',
          body: "Set up .gitignore before your first commit, not after you've already leaked node_modules, .env, or build output into history. Once a secret is committed, deleting the file later doesn't remove it from git history — you'd need to rewrite history entirely, which is a much bigger headache than adding three lines to .gitignore up front.",
        },
      ],
    },
  ],
};
