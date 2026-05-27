import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  HostListener,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../data/home-content';
import * as THREE from 'three';

interface AboutTab {
  id: string;
  label: string;
  text: string;
  items: string[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  readonly content = HOME_CONTENT;
  readonly projectCategories = ['All', ...new Set(this.content.projects.map((project) => project.category))];
  readonly projectIcons = ['fa-solid fa-laptop-code', 'fa-solid fa-diagram-project', 'fa-solid fa-cloud'];
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
    'assets/images/jatsen-profile.png',
  ];

  availCardOpen = false;
  emailCopied = false;
  private emailCopyTimer: ReturnType<typeof setTimeout> | null = null;

  toggleAvailCard(): void {
    this.availCardOpen = !this.availCardOpen;
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.content.contact.email).then(() => {
      this.emailCopied = true;
      this.cdr.markForCheck();
      if (this.emailCopyTimer) clearTimeout(this.emailCopyTimer);
      this.emailCopyTimer = setTimeout(() => {
        this.emailCopied = false;
        this.availCardOpen = false;
        this.cdr.markForCheck();
      }, 2000);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (this.availCardOpen && !(e.target as HTMLElement).closest('.hero-pill-wrap')) {
      this.availCardOpen = false;
    }
  }

  activeCategory = 'All';
  activeAboutTab: string = this.aboutTabs[0].id;
  showBackToTop = false;
  heroImageSrc = this.heroImageCandidates[0];
  heroImageMissing = false;

  readonly lifestyleCards = [
    { src: 'assets/images/about/running.svg', label: 'Running' },
    { src: 'assets/images/about/boxing.svg', label: 'Boxing' },
    { src: 'assets/images/about/walking.svg', label: 'Walking' },
    { src: 'assets/images/about/reading.svg', label: 'Reading' },
    { src: 'assets/images/about/fitness.svg', label: 'Fitness' },
  ];

  activeLifestyleIndex = 0;
  private lifestyleDragStartX: number | null = null;
  private lifestyleDragDeltaX = 0;
  private lifestyleAutoTimer: ReturnType<typeof setInterval> | null = null;
  private lifestyleAutoPaused = false;

  onLifestylePointerDown(event: PointerEvent): void {
    this.pauseLifestyleAuto();
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }

    target.setPointerCapture?.(event.pointerId);
    this.lifestyleDragStartX = event.clientX;
    this.lifestyleDragDeltaX = 0;
  }

  onLifestylePointerMove(event: PointerEvent): void {
    if (this.lifestyleDragStartX === null) {
      return;
    }

    this.lifestyleDragDeltaX = event.clientX - this.lifestyleDragStartX;
  }

  onLifestylePointerUp(): void {
    if (this.lifestyleDragStartX === null) {
      return;
    }

    const swipeThreshold = 42;
    if (this.lifestyleDragDeltaX > swipeThreshold) {
      this.activeLifestyleIndex = (this.activeLifestyleIndex - 1 + this.lifestyleCards.length) % this.lifestyleCards.length;
      this.cdr.markForCheck();
    } else if (this.lifestyleDragDeltaX < -swipeThreshold) {
      this.activeLifestyleIndex = (this.activeLifestyleIndex + 1) % this.lifestyleCards.length;
      this.cdr.markForCheck();
    }

    this.lifestyleDragStartX = null;
    this.lifestyleDragDeltaX = 0;
    this.resumeLifestyleAuto();
  }

  setLifestyleActive(index: number): void {
    this.activeLifestyleIndex = index;
    this.cdr.markForCheck();
  }

  pauseLifestyleAuto(): void {
    this.lifestyleAutoPaused = true;
  }

  resumeLifestyleAuto(): void {
    this.lifestyleAutoPaused = false;
  }

  private startLifestyleAuto(): void {
    if (this.lifestyleAutoTimer) {
      return;
    }

    this.lifestyleAutoTimer = setInterval(() => {
      if (this.lifestyleAutoPaused) {
        return;
      }

      this.activeLifestyleIndex = (this.activeLifestyleIndex + 1) % this.lifestyleCards.length;
      this.cdr.markForCheck();
    }, 2600);
  }
  isDark = false;

  private observer?: IntersectionObserver;
  private globeRafId: number | null = null;
  private lastGlobeFrameMs = 0;
  private globeResizeObserver?: ResizeObserver;
  private globeThree?: {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    dispose: () => void;
  };

  private isDraggingGlobe = false;
  private globePointerId: number | null = null;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private globeRotY = 0;
  private globeRotX = -0.2;
  private globeVelY = 0;
  private globeVelX = 0;
  globeActiveLabel = '';
  globeRotationCss = '0rad';
  hoveredSkillId = '';

  private shootingStarsRafId: number | null = null;
  private stars: Array<{ x: number; y: number; len: number; speed: number; angle: number; opacity: number; trail: number }> = [];
  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private cursorRafId: number | null = null;

  @ViewChild('shootingStars', { static: false })
  shootingStarsCanvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('globeCanvas', { static: false })
  globeCanvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('cursorDot', { static: false })
  cursorDot?: ElementRef<HTMLElement>;

  @ViewChild('cursorRing', { static: false })
  cursorRing?: ElementRef<HTMLElement>;

  @ViewChild('projectCursor', { static: false })
  projectCursor?: ElementRef<HTMLElement>;

  @ViewChild('resumeTimeline', { static: false })
  resumeTimeline?: ElementRef<HTMLElement>;

  @ViewChild('timelineFill', { static: false })
  timelineFill?: ElementRef<HTMLElement>;

  timelineFillPct = 0;

  readonly globeSkills = this.buildGlobeSkills();

  globeItems: Array<{
    id: string;
    label: string;
    iconClass: string;
    isFront: boolean;
    depth: number;
    style: Record<string, string>;
    pillStyle: Record<string, string>;
  }> = [];

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

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : '');
    this.cdr.markForCheck();
    if (this.isDark) {
      this.startShootingStars();
    } else {
      this.stopShootingStars();
    }
  }

  scrollToPortfolio(event: Event): void {
    event.preventDefault();
    const section = document.getElementById('portfolio');
    if (!section) return;
    const header = document.querySelector('.site-header') as HTMLElement | null;
    const offset = header ? header.offsetHeight : 0;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    setTimeout(() => {
      section.classList.add('portfolio-highlight');
      setTimeout(() => section.classList.remove('portfolio-highlight'), 1200);
    }, 600);
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

  getSafePreviewUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const main = document.getElementById('home');
    if (!main) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    // Page scanning glow
    main.style.setProperty('--mx', `${event.clientX}px`);
    main.style.setProperty('--my', `${event.clientY + window.scrollY}px`);

    // Move dot instantly
    const dot = this.cursorDot?.nativeElement;
    if (dot) {
      dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }

    // Detect hoverable elements for ring state
    const ring = this.cursorRing?.nativeElement;
    if (ring && dot) {
      const hovered = (event.target as HTMLElement)?.closest(
        'a, button, [role="button"], .hover-lift, .globe-item, .chip, .about-tab, .resume-tag'
      );
      ring.classList.toggle('is-hovering', !!hovered);
      dot.classList.toggle('is-hovering', !!hovered);

      const isGrab = (event.target as HTMLElement)?.closest('.globe');
      ring.classList.toggle('is-grab', !!isGrab);
    }

    // Project card cursor
    const projectCursorEl = this.projectCursor?.nativeElement;
    if (projectCursorEl) {
      const onProjectCard = (event.target as HTMLElement)?.closest('.project-card');
      projectCursorEl.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      projectCursorEl.classList.toggle('visible', !!onProjectCard);
    }

    // Per-card local spotlight
    const card = (event.target as HTMLElement)?.closest('.surface-card') as HTMLElement | null;
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--cx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--cy', `${event.clientY - rect.top}px`);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 700;
    this.updateTimelineFill();
  }

  getDotThreshold(index: number): number {
    const total = this.content.experiences.length;
    return index / Math.max(total - 1, 1);
  }

  private updateTimelineFill(): void {
    const el = this.resumeTimeline?.nativeElement;
    const fill = this.timelineFill?.nativeElement;
    if (!el || !fill) return;

    // Position the track to align with the mid column dot
    const dot = el.querySelector('.resume-dot') as HTMLElement | null;
    if (dot) {
      const dotRect = dot.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const trackX = dotRect.left - elRect.left + dotRect.width / 2;
      el.style.setProperty('--track-x', `${trackX}px`);
    }

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const trackH = rect.height;

    // progress: 0 when top of timeline hits bottom of viewport, 1 when bottom hits center
    const entered = windowH - rect.top;
    const pct = Math.min(1, Math.max(0, entered / (trackH + windowH * 0.5)));

    this.timelineFillPct = pct;
    fill.style.height = `${pct * 100}%`;
    el.style.setProperty('--avatar-pct', `${pct * 100}%`);
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.startLifestyleAuto();
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

    this.updateGlobeItems();
    this.initThreeGlobe();
    this.startGlobeAutoRotate();
    this.startCursorLoop();
    setTimeout(() => {
      this.updateTimelineFill();
      if (this.resumeTimeline?.nativeElement) {
        new ResizeObserver(() => this.updateTimelineFill()).observe(this.resumeTimeline.nativeElement);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.lifestyleAutoTimer) {
      clearInterval(this.lifestyleAutoTimer);
      this.lifestyleAutoTimer = null;
    }

    this.observer?.disconnect();
    if (this.globeRafId !== null) cancelAnimationFrame(this.globeRafId);
    if (this.cursorRafId !== null) cancelAnimationFrame(this.cursorRafId);
    if (this.shootingStarsRafId !== null) cancelAnimationFrame(this.shootingStarsRafId);
    this.globeResizeObserver?.disconnect();
    this.globeThree?.dispose();
  }

  trackBySkillId(index: number, item: { id: string }): string {
    return item.id;
  }

  onGlobePointerDown(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }

    this.isDraggingGlobe = true;
    this.globePointerId = event.pointerId;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    target.setPointerCapture(event.pointerId);
    this.globeActiveLabel = '';
  }

  onGlobePointerMove(event: PointerEvent): void {
    if (!this.isDraggingGlobe || this.globePointerId !== event.pointerId) {
      return;
    }

    const nowMs = performance.now();
    const dt = Math.max(8, Math.min(64, nowMs - this.lastGlobeFrameMs));
    this.lastGlobeFrameMs = nowMs;

    const dx = event.clientX - this.lastPointerX;
    const dy = event.clientY - this.lastPointerY;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;

    const seconds = dt / 1000;
    const dragRotY = dx * 0.008;
    const dragRotX = dy * 0.006;
    this.globeRotY = this.normalizeAngle(this.globeRotY + dragRotY);
    this.globeRotX = this.normalizeAngle(this.globeRotX + dragRotX);

    this.globeVelY = dragRotY / seconds;
    this.globeVelX = dragRotX / seconds;
    this.updateGlobeItems();
  }

  onGlobePointerUp(): void {
    this.isDraggingGlobe = false;
    this.globePointerId = null;
  }

  onGlobeItemEnter(item: { isFront: boolean; label: string; depth: number; id?: string }): void {
    if (!item.isFront) {
      return;
    }

    if (item.id) {
      this.hoveredSkillId = item.id;
    }
    this.globeActiveLabel = item.label;
    this.cdr.markForCheck();
  }

  onGlobeItemLeave(item: { label: string; id?: string }): void {
    if (this.globeActiveLabel === item.label) {
      this.globeActiveLabel = '';
      this.cdr.markForCheck();
    }
    if (item.id && this.hoveredSkillId === item.id) {
      this.hoveredSkillId = '';
      this.cdr.markForCheck();
    }
  }

  onGlobeItemClick(item: { isFront: boolean; label: string }): void {
    if (!item.isFront) {
      return;
    }

    this.globeActiveLabel = item.label;
    this.hoveredSkillId = (item as { id?: string }).id ?? this.hoveredSkillId;
    this.cdr.markForCheck();
  }

  private updateGlobeItems(): void {
    const radius = 196;
    const size = 56;

    this.globeRotationCss = `${this.globeRotY.toFixed(4)}rad`;

    const items = this.globeSkills.map((skill) => {
      const rotated = this.rotateVec(skill.vec, this.globeRotX, this.globeRotY);
      const x3 = rotated.x * radius;
      const y3 = rotated.y * radius;
      const z3 = rotated.z * radius;

      const depth = (z3 + radius) / (2 * radius);
      const isFront = z3 > 0;

      const perspective = 520;
      const persp = perspective / (perspective - z3);
      const x = x3 * persp;
      const y = y3 * persp;

      const scale = (0.62 + depth * 0.62) * (0.9 + (persp - 1) * 0.6);
      const opacity = 0.18 + depth * 0.82;

      const color = isFront ? skill.color : 'color-mix(in oklab, var(--color-muted), transparent 62%)';
      const blur = isFront ? 0 : 0.25;
      const shadow = isFront
        ? `drop-shadow(0 16px 28px rgba(40, 60, 160, ${(0.10 + depth * 0.12).toFixed(3)}))`
        : `drop-shadow(0 10px 18px rgba(40, 60, 160, ${(0.03 + depth * 0.04).toFixed(3)}))`;

      const filterBase = isFront ? 'saturate(1.05) contrast(1.05)' : 'grayscale(1) saturate(0.25) contrast(0.95)';
      const pillBg = skill.id === 'figma' ? 'rgba(242, 78, 30, 0.78)' : 'rgba(134, 160, 255, 0.22)';
      const pillBorder = skill.id === 'figma' ? 'rgba(242, 78, 30, 0.40)' : 'rgba(134, 160, 255, 0.28)';

      return {
        id: skill.id,
        label: skill.label,
        iconClass: skill.iconClass,
        isFront,
        depth,
        style: {
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: `translate(-50%, -50%) scale(${scale.toFixed(3)})`,
          opacity: opacity.toFixed(3),
          width: `${size}px`,
          height: `${size}px`,
          zIndex: String(Math.round(depth * 1000)),
          color,
          filter: `${filterBase} blur(${blur}px) ${shadow}`,
        },
        pillStyle: {
          background: pillBg,
          borderColor: pillBorder,
        },
      };
    });

    this.globeItems = items;
    this.cdr.markForCheck();
  }

  private rotateVec(
    vec: { x: number; y: number; z: number },
    pitchX: number,
    yawY: number,
  ): { x: number; y: number; z: number } {
    const cy = Math.cos(yawY);
    const sy = Math.sin(yawY);
    const cx = Math.cos(pitchX);
    const sx = Math.sin(pitchX);

    const x1 = vec.x * cy + vec.z * sy;
    const z1 = -vec.x * sy + vec.z * cy;
    const y1 = vec.y;

    const y2 = y1 * cx - z1 * sx;
    const z2 = y1 * sx + z1 * cx;
    const x2 = x1;

    return { x: x2, y: y2, z: z2 };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private normalizeAngle(angle: number): number {
    const twoPi = Math.PI * 2;
    const wrapped = ((angle % twoPi) + twoPi) % twoPi;
    return wrapped > Math.PI ? wrapped - twoPi : wrapped;
  }

  private buildGlobeSkills(): Array<{
    id: string;
    label: string;
    iconClass: string;
    color: string;
    vec: { x: number; y: number; z: number };
  }> {
    const base = [
      { id: 'html', label: 'HTML', iconClass: 'fa-brands fa-html5', color: '#E34F26' },
      { id: 'css', label: 'CSS', iconClass: 'fa-brands fa-css3-alt', color: '#1572B6' },
      { id: 'js', label: 'JavaScript', iconClass: 'fa-brands fa-js', color: '#F7DF1E' },
      { id: 'ts', label: 'TypeScript', iconClass: 'fa-solid fa-code', color: '#3178C6' },
      { id: 'angular', label: 'Angular', iconClass: 'fa-brands fa-angular', color: '#DD0031' },
      { id: 'react', label: 'React', iconClass: 'fa-brands fa-react', color: '#61DAFB' },
      { id: 'node', label: 'Node.js', iconClass: 'fa-brands fa-node-js', color: '#339933' },
      { id: 'python', label: 'Python', iconClass: 'fa-brands fa-python', color: '#3776AB' },
      { id: 'java', label: 'Java', iconClass: 'fa-brands fa-java', color: '#E76F00' },
      { id: 'aws', label: 'AWS', iconClass: 'fa-brands fa-aws', color: '#FF9900' },
      { id: 'git', label: 'Git', iconClass: 'fa-brands fa-git-alt', color: '#F05032' },
      { id: 'db', label: 'Databases', iconClass: 'fa-solid fa-database', color: '#4B5563' },
      { id: 'figma', label: 'Figma', iconClass: 'fa-brands fa-figma', color: '#F24E1E' },
    ];

    const count = base.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    return base.map((skill, index) => {
      const y = 1 - (2 * (index + 0.5)) / count;
      const lat = Math.asin(y);
      const lon = index * goldenAngle;
      const jitterA = (this.hashToUnit(skill.id + 'a') - 0.5) * 0.34;
      const jitterB = (this.hashToUnit(skill.id + 'b') - 0.5) * 0.48;
      const finalLat = this.clamp(lat + jitterA, -1.35, 1.35);
      const finalLon = lon + jitterB;

      const cosLat = Math.cos(finalLat);
      const vec = {
        x: cosLat * Math.sin(finalLon),
        y: Math.sin(finalLat),
        z: cosLat * Math.cos(finalLon),
      };

      return { ...skill, vec };
    });
  }

  private starsResizeHandler?: () => void;

  private startShootingStars(): void {
    if (this.shootingStarsRafId !== null) return;

    const canvas = this.shootingStarsCanvas?.nativeElement;
    if (!canvas) return;

    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.starsResizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', this.starsResizeHandler);

    const ctx = canvas.getContext('2d')!;

    type Star = { x: number; y: number; len: number; speed: number; angle: number; opacity: number; trail: number };

    const spawnStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.7,
      len: 120 + Math.random() * 160,
      speed: 10 + Math.random() * 14,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
      opacity: 0.8 + Math.random() * 0.2,
      trail: 0,
    });

    this.stars = Array.from({ length: 6 }, spawnStar);
    let lastSpawn = 0;

    const tick = (now: number) => {
      this.shootingStarsRafId = requestAnimationFrame(tick);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (now - lastSpawn > 400 + Math.random() * 600) {
        this.stars.push(spawnStar());
        lastSpawn = now;
      }

      this.stars = this.stars.filter((s) => {
        s.trail += s.speed;
        const tx = s.x + Math.cos(s.angle) * s.trail;
        const ty = s.y + Math.sin(s.angle) * s.trail;
        const tailX = tx - Math.cos(s.angle) * s.len;
        const tailY = ty - Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(tailX, tailY, tx, ty);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.7, `rgba(180,200,255,${(s.opacity * 0.5).toFixed(2)})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity.toFixed(2)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity.toFixed(2)})`;
        ctx.fill();

        return tx < canvas.width + 300 && ty < canvas.height + 300;
      });
    };

    this.shootingStarsRafId = requestAnimationFrame(tick);
  }

  private stopShootingStars(): void {
    if (this.shootingStarsRafId !== null) {
      cancelAnimationFrame(this.shootingStarsRafId);
      this.shootingStarsRafId = null;
    }
    if (this.starsResizeHandler) {
      window.removeEventListener('resize', this.starsResizeHandler);
      this.starsResizeHandler = undefined;
    }
    const canvas = this.shootingStarsCanvas?.nativeElement;
    if (canvas) {
      canvas.style.display = 'none';
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  private hashToUnit(value: string): number {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0) / 0xffffffff;
  }

  private startCursorLoop(): void {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      this.ringX = lerp(this.ringX, this.mouseX, 0.12);
      this.ringY = lerp(this.ringY, this.mouseY, 0.12);
      const ring = this.cursorRing?.nativeElement;
      if (ring) {
        ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;
      }
      this.cursorRafId = requestAnimationFrame(tick);
    };
    this.cursorRafId = requestAnimationFrame(tick);
  }

  private startGlobeAutoRotate(): void {
    this.lastGlobeFrameMs = performance.now();

    const tick = (nowMs: number) => {
      const dt = Math.min(64, Math.max(0, nowMs - this.lastGlobeFrameMs));
      this.lastGlobeFrameMs = nowMs;

      const seconds = dt / 1000;
      const autoSpeed = 0.030; // rad/s (slower)
      const damping = Math.pow(0.52, seconds * 60); // smoother glide

      if (!this.isDraggingGlobe) {
        this.globeVelY += autoSpeed;
        this.globeVelY *= damping;
        this.globeVelX *= damping;

        this.globeRotY = this.normalizeAngle(this.globeRotY + this.globeVelY * seconds);
        this.globeRotX = this.normalizeAngle(this.globeRotX + this.globeVelX * seconds);
        this.updateGlobeItems();
      }

      this.renderThreeGlobe();
      this.globeRafId = requestAnimationFrame(tick);
    };

    this.globeRafId = requestAnimationFrame(tick);
  }

  private initThreeGlobe(): void {
    const canvas = this.globeCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const group = new THREE.Group();
    scene.add(group);

    const geoGeom = new THREE.IcosahedronGeometry(2.48, 4);
    const geoWfGeom = new THREE.WireframeGeometry(geoGeom);
    const geoWfMat = new THREE.LineBasicMaterial({
      color: 0x86a0ff,
      transparent: true,
      opacity: 0.18,
    });
    const geoWireframe = new THREE.LineSegments(geoWfGeom, geoWfMat);
    group.add(geoWireframe);

    const geoGeomCoarse = new THREE.IcosahedronGeometry(2.51, 2);
    const geoWfGeomCoarse = new THREE.WireframeGeometry(geoGeomCoarse);
    const geoWfMatCoarse = new THREE.LineBasicMaterial({
      color: 0x86a0ff,
      transparent: true,
      opacity: 0.10,
    });
    const geoWireframeCoarse = new THREE.LineSegments(geoWfGeomCoarse, geoWfMatCoarse);
    group.add(geoWireframeCoarse);

    const latLong = this.buildLatLongGrid(2.495);
    group.add(latLong);

    const pointsGeom = geoGeom.clone();
    const pointsMat = new THREE.PointsMaterial({
      color: 0x86a0ff,
      transparent: true,
      opacity: 0.16,
      size: 0.03,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeom, pointsMat);
    group.add(points);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    resize();
    this.globeResizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      this.globeResizeObserver.observe(canvas.parentElement);
    }

    const dispose = () => {
      this.globeResizeObserver?.disconnect();
      geoGeom.dispose();
      geoWfGeom.dispose();
      geoWfMat.dispose();
      geoGeomCoarse.dispose();
      geoWfGeomCoarse.dispose();
      geoWfMatCoarse.dispose();
      pointsGeom.dispose();
      pointsMat.dispose();
      latLong.traverse((obj: THREE.Object3D) => {
        const line = obj as THREE.Line;
        const geom = (line.geometry as THREE.BufferGeometry | undefined) ?? undefined;
        const mat = (line.material as THREE.Material | undefined) ?? undefined;
        geom?.dispose?.();
        mat?.dispose?.();
      });
      renderer.dispose();
    };

    this.globeThree = { renderer, scene, camera, group, dispose };
    this.renderThreeGlobe();
  }

  private buildLatLongGrid(radius: number): THREE.Group {
    const group = new THREE.Group();
    const baseMat = new THREE.LineBasicMaterial({
      color: 0x86a0ff,
      transparent: true,
      opacity: 0.075,
    });

    const segments = 160;
    const latLines = 10;
    const lonLines = 14;

    for (let i = 1; i <= latLines; i += 1) {
      const v = i / (latLines + 1);
      const lat = (v - 0.5) * Math.PI;
      const ring = new THREE.BufferGeometry();
      const pts: number[] = [];
      for (let s = 0; s <= segments; s += 1) {
        const t = (s / segments) * Math.PI * 2;
        const x = radius * Math.cos(lat) * Math.cos(t);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(t);
        pts.push(x, y, z);
      }
      ring.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      group.add(new THREE.Line(ring, baseMat.clone()));
    }

    for (let i = 0; i < lonLines; i += 1) {
      const lon = (i / lonLines) * Math.PI * 2;
      const meridian = new THREE.BufferGeometry();
      const pts: number[] = [];
      for (let s = 0; s <= segments; s += 1) {
        const v = s / segments;
        const lat = (v - 0.5) * Math.PI;
        const x = radius * Math.cos(lat) * Math.cos(lon);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(lon);
        pts.push(x, y, z);
      }
      meridian.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      group.add(new THREE.Line(meridian, baseMat.clone()));
    }

    return group;
  }

  private renderThreeGlobe(): void {
    const three = this.globeThree;
    if (!three) {
      return;
    }

    three.group.rotation.y = this.globeRotY;
    three.group.rotation.x = this.globeRotX;
    three.renderer.render(three.scene, three.camera);
  }
}
