import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorComponent implements OnInit, OnDestroy {
  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private rafId: number | null = null;

  @ViewChild('cursorDot', { static: true })
  cursorDot!: ElementRef<HTMLElement>;

  @ViewChild('cursorRing', { static: true })
  cursorRing!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.startRingLoop();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    const dot = this.cursorDot.nativeElement;
    dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

    const ring = this.cursorRing.nativeElement;
    const hovered = (event.target as HTMLElement)?.closest(
      'a, button, [role="button"], .hover-lift, .globe-item, .chip, .about-tab, .resume-tag',
    );
    ring.classList.toggle('is-hovering', !!hovered);
    dot.classList.toggle('is-hovering', !!hovered);

    const isGrab = (event.target as HTMLElement)?.closest('.globe, .reel-track');
    ring.classList.toggle('is-grab', !!isGrab);
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  private startRingLoop(): void {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      this.ringX = lerp(this.ringX, this.mouseX, 0.12);
      this.ringY = lerp(this.ringY, this.mouseY, 0.12);
      this.cursorRing.nativeElement.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }
}
