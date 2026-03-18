import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { HOME_CONTENT } from '../../data/home-content';

interface AboutTab {
  id: string;
  label: string;
  text: string;
  items: string[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  readonly content = HOME_CONTENT;
  readonly projectCategories = ['All', ...new Set(this.content.projects.map((project) => project.category))];
  readonly aboutTabs: AboutTab[] = [
    {
      id: 'what-i-do',
      label: 'What I Do',
      text: 'I deliver full-stack features from requirement analysis to deployment, with strong focus on reliability and maintainability.',
      items: [
        'Build Angular-based frontends with clear component architecture',
        'Implement backend/API features and optimize SQL-heavy flows',
        'Ship production enhancements with testing and validation',
      ],
    },
    {
      id: 'how-i-work',
      label: 'How I Work',
      text: 'I prioritize clear communication, realistic estimation, and consistent delivery quality in collaborative teams.',
      items: [
        'Break tasks into clear milestones with risk checks',
        'Coordinate closely with QA and developers before release',
        'Refactor unstable logic to reduce defects and maintenance cost',
      ],
    },
    {
      id: 'what-i-use',
      label: 'What I Use',
      text: 'I use modern frontend, backend, and cloud tooling to deliver practical enterprise-ready solutions.',
      items: [
        'Angular, TypeScript, JavaScript, Java, Python',
        'SQL, Microservices, Serverless and API-driven architecture',
        'AWS services, Git workflows, and Jira-based planning',
      ],
    },
  ];
  private readonly heroImageCandidates = [
    'assets/images/jatsen-custom-hero.svg',
    'assets/images/jatsen-profile.png',
    'assets/images/jatsen-profile.jpg',
    'assets/images/jatsen-profile.jpeg',
    '/jatsen-profile.jpg',
    '/jatsen-profile.jpeg',
    '/jatsen-profile.png',
  ];

  activeCategory = 'All';
  activeAboutTab: string = this.aboutTabs[0].id;
  showBackToTop = false;
  heroImageSrc = this.heroImageCandidates[0];
  heroImageMissing = false;

  private observer?: IntersectionObserver;

  get selectedAboutTab() {
    return this.aboutTabs.find((tab) => tab.id === this.activeAboutTab) ?? this.aboutTabs[0];
  }

  get filteredProjects() {
    if (this.activeCategory === 'All') {
      return this.content.projects;
    }

    return this.content.projects.filter((project) => project.category === this.activeCategory);
  }

  selectCategory(category: string): void {
    this.activeCategory = category;
  }

  selectAboutTab(tabId: string): void {
    this.activeAboutTab = tabId;
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onHeroImageError(): void {
    const currentIndex = this.heroImageCandidates.indexOf(this.heroImageSrc);
    const next = this.heroImageCandidates[currentIndex + 1];

    if (next) {
      this.heroImageSrc = next;
      return;
    }

    this.heroImageMissing = true;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 700;
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 },
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => this.observer?.observe(element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
