import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioContent } from '../../../shared/models/portfolio.model';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  popping: boolean;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnDestroy {
  @Input({ required: true }) content!: PortfolioContent;

  interactive = true;
  private prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  orbMx = '50%';
  orbMy = '35%';
  orbDx = '0px';
  orbDy = '0px';
  orbRx = '0deg';
  orbRy = '0deg';
  orbScale = '1';
  orbPopping = false;
  bubbles: Bubble[] = [];
  private bubbleIdCounter = 0;
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  readonly orbChars = (() => {
    const text = 'CLICK TO MULTIPLY • CLICK TO MULTIPLY • ';
    return text.split('').map((char, i) => ({
      char,
      angle: (360 / text.length) * i,
    }));
  })();

  readonly navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
  ];

  get socials(): Array<{ label: string; icon: string; href: string }> {
    const linkedIn = this.content?.contact?.linkedin?.trim();
    return [
      ...(linkedIn ? [{ label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: `https://${linkedIn}` }] : []),
      { label: 'Email', icon: 'fa-solid fa-envelope', href: `mailto:${this.content?.contact?.email ?? ''}` },
      { label: 'Call', icon: 'fa-solid fa-phone', href: `tel:${(this.content?.contact?.phone ?? '').replaceAll(' ', '')}` },
    ];
  }

  get year(): number {
    return new Date().getFullYear();
  }

  onOrbClick(): void {
    this.orbPopping = true;
    this.spawnBubbles(4);
    const t = setTimeout(() => {
      this.orbPopping = false;
      this.spawnBubbles(3);
    }, 400);
    this.timeouts.push(t);
  }

  onBubbleClick(bubble: Bubble): void {
    bubble.popping = true;
    const t = setTimeout(() => {
      this.bubbles = this.bubbles.filter(b => b.id !== bubble.id);
      this.spawnBubbles(2);
    }, 350);
    this.timeouts.push(t);
  }

  private spawnBubbles(count: number): void {
    for (let i = 0; i < count; i++) {
      const bubble: Bubble = {
        id: ++this.bubbleIdCounter,
        x: 30 + Math.random() * 40,
        y: 10 + Math.random() * 80,
        size: 80 + Math.random() * 40,
        popping: false,
      };
      this.bubbles.push(bubble);
      const t = setTimeout(() => {
        this.bubbles = this.bubbles.filter(b => b.id !== bubble.id);
      }, 2500 + Math.random() * 1500);
      this.timeouts.push(t);
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.interactive || this.prefersReducedMotion) return;
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(1, rect.width);
    const y = (event.clientY - rect.top) / Math.max(1, rect.height);
    const xPct = Math.round(x * 100);
    const yPct = Math.round(y * 100);
    this.orbMx = `${xPct}%`;
    this.orbMy = `${yPct}%`;
    const dx = (x - 0.5) * 18;
    const dy = (y - 0.35) * 14;
    this.orbDx = `${dx.toFixed(1)}px`;
    this.orbDy = `${dy.toFixed(1)}px`;
    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;
    this.orbRx = `${tiltX.toFixed(2)}deg`;
    this.orbRy = `${tiltY.toFixed(2)}deg`;
    this.orbScale = '1.04';
  }

  onMouseLeave(): void {
    if (this.prefersReducedMotion) return;
    this.orbMx = '50%';
    this.orbMy = '35%';
    this.orbDx = '0px';
    this.orbDy = '0px';
    this.orbRx = '0deg';
    this.orbRy = '0deg';
    this.orbScale = '1';
  }

  onTouchStart(): void {
    this.onMouseLeave();
  }

  ngOnDestroy(): void {
    this.timeouts.forEach(t => clearTimeout(t));
  }
}
