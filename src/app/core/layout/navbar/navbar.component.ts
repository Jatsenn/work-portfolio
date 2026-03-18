import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly themeStorageKey = 'theme';
  private readonly themePromptSeenKey = 'themeGuideSeenV2';

  readonly links = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  isMenuOpen = false;
  isDarkMode = false;
  showThemePrompt = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    this.applyTheme();
    this.showThemePrompt = !localStorage.getItem(this.themePromptSeenKey);
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

    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const header = document.querySelector('.site-header') as HTMLElement | null;
    const offset = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    history.replaceState(null, '', `#${sectionId}`);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem(this.themeStorageKey, this.isDarkMode ? 'dark' : 'light');
    this.markThemePromptSeen();
  }

  chooseTheme(theme: 'light' | 'dark'): void {
    this.isDarkMode = theme === 'dark';
    this.applyTheme();
    localStorage.setItem(this.themeStorageKey, theme);
    this.markThemePromptSeen();
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
}
