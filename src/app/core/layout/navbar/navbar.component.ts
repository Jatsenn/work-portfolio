import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly themeStorageKey = 'theme';
  private readonly themePromptSeenKey = 'themeGuideSeenV2';
  private readonly scrollSpyOffset = 24;

  @ViewChild('navPill') private navPillRef?: ElementRef<HTMLElement>;
  @ViewChildren('navLinkEl') private navLinkRefs?: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('cmdInput') private cmdInputRef?: ElementRef<HTMLInputElement>;

  readonly links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  isPaletteOpen = false;
  searchQuery = '';
  activeItem: any = null;
  isMenuOpen = false;
  isDarkMode = false;
  showThemePrompt = false;
  activeLinkId = 'home';
  isThemeTransitioning = false;
  transitionX = 0;
  transitionY = 0;
  private hoveredLinkId: string | null = null;

  readonly paletteGroups = [
    {
      label: 'PAGES',
      items: [
        { title: 'Home', sub: 'Go to homepage', icon: 'fa-solid fa-house', action: () => this.onNavClick(new MouseEvent('click'), 'home') },
        { title: 'About', sub: 'Learn more about me', icon: 'fa-solid fa-user', action: () => this.onNavClick(new MouseEvent('click'), 'about') },
        { title: 'Skills', sub: 'My tech stack', icon: 'fa-solid fa-briefcase', action: () => this.onNavClick(new MouseEvent('click'), 'skills') },
        { title: 'Resume', sub: 'My experience', icon: 'fa-solid fa-file-lines', action: () => this.onNavClick(new MouseEvent('click'), 'resume') },
        { title: 'Portfolio', sub: 'View my work', icon: 'fa-solid fa-layer-group', action: () => this.onNavClick(new MouseEvent('click'), 'portfolio') },
        { title: 'Book a Call', sub: 'Schedule a meeting', icon: 'fa-solid fa-phone', action: () => { this.closePalette(); this.router.navigate(['/book-call']); } },
      ],
    },
  ];

  get filteredGroups() {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.paletteGroups;
    return this.paletteGroups.map(g => ({
      ...g,
      items: g.items.filter(i => i.title.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)),
    })).filter(g => g.items.length);
  }

  openPalette(): void {
    this.isPaletteOpen = true;
    this.searchQuery = '';
    this.activeItem = this.paletteGroups[0]?.items[0] ?? null;
    setTimeout(() => this.cmdInputRef?.nativeElement.focus());
  }

  closePalette(): void {
    this.isPaletteOpen = false;
  }

  runItem(item: any): void {
    this.closePalette();
    item.action();
  }

  onPaletteKeydown(event: KeyboardEvent): void {
    const allItems = this.filteredGroups.flatMap(g => g.items);
    const idx = allItems.indexOf(this.activeItem);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeItem = allItems[(idx + 1) % allItems.length];
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeItem = allItems[(idx - 1 + allItems.length) % allItems.length];
    } else if (event.key === 'Enter' && this.activeItem) {
      this.runItem(this.activeItem);
    } else if (event.key === 'Escape') {
      this.closePalette();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.isPaletteOpen ? this.closePalette() : this.openPalette();
    }
    if (event.key === 'Escape' && this.isPaletteOpen) {
      this.closePalette();
    }
  }

  private scrollObserver: IntersectionObserver | null = null;
  isHomePage = true;
  isBookCallPage = false;
  private routerSub?: Subscription;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    this.applyTheme();
    this.showThemePrompt = !localStorage.getItem(this.themePromptSeenKey);
    this.activeLinkId = window.location.hash?.replace('#', '') || 'home';
    if (!window.location.hash) history.replaceState(null, '', '#home');

    window.addEventListener('hashchange', this.onHashChange, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      const url = e.urlAfterRedirects.split('#')[0];
      this.isHomePage = url === '/' || url === '';
      this.isBookCallPage = url === '/book-call';
      if (!this.isHomePage) {
        this.scrollObserver?.disconnect();
        this.scrollObserver = null;
      } else {
        this.activeLinkId = window.location.hash?.replace('#', '') || 'home';
        setTimeout(() => this.setupIntersectionObserver());
      }
      this.schedulePillUpdate();
    });
  }

  ngAfterViewInit(): void {
    this.navLinkRefs?.changes.subscribe(() => this.schedulePillUpdate());
    this.schedulePillUpdate();
    // Defer until router outlet has rendered the page sections
    setTimeout(() => this.setupIntersectionObserver());
  }

  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
    this.routerSub?.unsubscribe();
    window.removeEventListener('hashchange', this.onHashChange);
    window.removeEventListener('resize', this.onResize);
  }

  goHome(): void {
    this.closeMenu();
    this.onNavClick(new MouseEvent('click'), 'home');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
    this.activeLinkId = sectionId;
    this.schedulePillUpdate();

    if (!this.isHomePage) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToSection(sectionId));
      });
      return;
    }

    this.scrollToSection(sectionId);
    history.replaceState(null, '', `#${sectionId}`);
  }

  private scrollToSection(sectionId: string): void {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const header = document.querySelector('.site-header') as HTMLElement | null;
    const offset = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${sectionId}`);
  }

  onNavHover(sectionId: string): void {
    this.hoveredLinkId = sectionId;
    this.schedulePillUpdate();
  }

  onNavHoverEnd(): void {
    this.hoveredLinkId = null;
    this.schedulePillUpdate();
  }

  onPillMouseMove(event: MouseEvent): void {
    const nav = this.navPillRef?.nativeElement;
    if (!nav) return;
    const rect = nav.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    nav.style.setProperty('--glow-x', `${x}%`);
    nav.style.setProperty('--glow-y', `${y}%`);
    nav.style.setProperty('--glow-opacity', '1');
  }

  onPillMouseLeave(): void {
    const nav = this.navPillRef?.nativeElement;
    if (!nav) return;
    nav.style.setProperty('--glow-opacity', '0');
  }

  toggleTheme(event: MouseEvent): void {
    this.triggerThemeTransition(event, () => {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      localStorage.setItem(this.themeStorageKey, this.isDarkMode ? 'dark' : 'light');
      this.markThemePromptSeen();
    });
  }

  chooseTheme(theme: 'light' | 'dark'): void {
    this.triggerThemeTransition(null, () => {
      this.isDarkMode = theme === 'dark';
      this.applyTheme();
      localStorage.setItem(this.themeStorageKey, theme);
      this.markThemePromptSeen();
    });
  }

  private triggerThemeTransition(event: MouseEvent | null, applyFn: () => void): void {
    const el = event?.currentTarget as HTMLElement | null;
    const rect = el?.getBoundingClientRect();
    this.transitionX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    this.transitionY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    this.isThemeTransitioning = true;
    setTimeout(() => {
      applyFn();
      setTimeout(() => { this.isThemeTransitioning = false; }, 600);
    }, 0);
  }

  dismissThemePrompt(): void {
    this.markThemePromptSeen();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

  private markThemePromptSeen(): void {
    this.showThemePrompt = false;
    localStorage.setItem(this.themePromptSeenKey, '1');
  }

  private readonly onHashChange = (): void => {
    const hashId = window.location.hash?.replace('#', '');
    if (hashId) {
      this.activeLinkId = hashId;
      this.schedulePillUpdate();
    }
  };

  private readonly onResize = (): void => {
    this.schedulePillUpdate();
  };

  private setupIntersectionObserver(): void {
    const header = document.querySelector('.site-header') as HTMLElement | null;
    const headerHeight = header ? header.offsetHeight : 0;
    const rootMargin = `-${headerHeight + this.scrollSpyOffset}px 0px -60% 0px`;

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;
        // Pick the topmost visible section
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        this.zone.run(() => {
          this.activeLinkId = top.target.id;
          this.cdr.detectChanges();
          this.schedulePillUpdate();
        });
      },
      { threshold: 0, rootMargin }
    );

    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el) this.scrollObserver.observe(el);
    }
  }

  private pillUpdateRaf: number | null = null;
  private schedulePillUpdate(): void {
    if (this.pillUpdateRaf != null) {
      cancelAnimationFrame(this.pillUpdateRaf);
    }
    this.pillUpdateRaf = requestAnimationFrame(() => {
      this.pillUpdateRaf = null;
      this.updatePillIndicator();
    });
  }

  private updatePillIndicator(): void {
    const nav = this.navPillRef?.nativeElement;
    const links = this.navLinkRefs?.toArray() ?? [];
    if (!nav || !links.length) {
      return;
    }

    if (!this.isHomePage) {
      nav.style.setProperty('--pill-w', '0px');
      return;
    }

    const targetId = this.hoveredLinkId ?? this.activeLinkId;
    const activeEl = links.find(
      (ref) => ref.nativeElement.getAttribute('href') === `#${targetId}`
    )?.nativeElement;
    if (!activeEl) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    const paddingLeft = linkRect.left - navRect.left;
    nav.style.setProperty('--pill-tx', `${Math.max(0, Math.round(paddingLeft))}px`);
    nav.style.setProperty('--pill-w', `${Math.max(0, Math.round(linkRect.width))}px`);
  }
}
