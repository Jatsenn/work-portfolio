import { PortfolioContent } from '../../../shared/models/portfolio.model';

export const HOME_CONTENT: PortfolioContent = {
  fullName: 'Engr. Jatsen P. Gesta',
  role: 'Software Engineer',
  contact: {
    phone: '+63 962 192 6650',
    email: 'gestajatsen@gmail.com',
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
      location: 'Muntinlupa City',
      period: 'July 2023 - Present',
      bullets: [
        'Develop and maintain production full-stack applications following company standards.',
        'Implement enhancements based on approved requirements and technical specifications.',
        'Review tasks for effort, dependencies, and risks before implementation.',
        'Optimize SQL queries and scripts for system performance and data reliability.',
        'Collaborate with developers and testers to release stable application features.',
      ],
    },
    {
      role: 'Software Engineer Intern',
      company: 'E-Science Corporation',
      location: 'Muntinlupa City',
      period: 'March 2023 - June 2023',
      bullets: [
        'Assisted in developing API features including CRUD operations.',
        'Practiced SQL query validation for file uploads and data processing.',
        'Applied version control, debugging, and real-world development workflows.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Engineering',
      school: 'Technological University of the Philippines - Dasmarinas, Cavite',
      period: '2019 - 2023',
      details: [
        'Relevant coursework: Data Structures & Algorithms, OOP, Python, Full-Stack Web Development, SQL Database',
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
      name: 'Frost and Grounds Website',
      category: 'Web App',
      stack: 'Frontend Application',
      summary: 'Working deployed web application for Frost and Grounds with modern UI and production-ready flow.',
      liveUrl: 'https://v0-frost-and-grounds-website-phi.vercel.app/',
    },
    {
      name: 'PET Bottle to Points System',
      category: 'Web App',
      stack: 'Angular + SQL',
      summary: 'Student project that converts PET bottle collection into a points-based reward workflow.',
    },
    {
      name: 'JBW File Management System',
      category: 'Full-Stack',
      stack: 'Angular + API',
      summary: 'Academic project focused on structured document management and retrieval.',
    },
    {
      name: 'Production Application Features',
      category: 'Enterprise',
      stack: 'Angular + API + SQL',
      summary: 'Enterprise enhancements and fixes shipped in a live business environment.',
    },
  ],
};
