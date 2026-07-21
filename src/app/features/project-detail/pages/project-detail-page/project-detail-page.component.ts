import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HOME_CONTENT } from '../../../home/data/home-content';
import { ProjectItem } from '../../../../shared/models/portfolio.model';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent implements OnInit, OnDestroy {
  project: ProjectItem | undefined;
  nextProject: ProjectItem | undefined;
  notFound = false;
  animKey = 0;
  isLeaving = false;
  safeUrl: SafeResourceUrl | undefined;

  private sub!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer,
  ) {}

  goBack(): void {
    this.router.navigate(['/'], { fragment: 'work' }).then(() => {
      setTimeout(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const projects = HOME_CONTENT.projects;
      const idx = projects.findIndex((p) => p.id === id);
      this.notFound = idx === -1;
      this.nextProject = projects[(idx + 1) % projects.length];

      const setProject = (p: ProjectItem) => {
        this.project = p;
        this.safeUrl = p.liveUrl
          ? this.sanitizer.bypassSecurityTrustResourceUrl(p.liveUrl)
          : undefined;
        this.animKey++;
        this.cdr.markForCheck();
      };

      if (this.project) {
        this.isLeaving = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.isLeaving = false;
          setProject(projects[idx]);
          window.scrollTo({ top: 0 });
        }, 320);
      } else {
        setProject(projects[idx]);
        window.scrollTo({ top: 0 });
      }
    });
  }

  private readonly TAG_ICONS: Record<string, { type: 'fa'; cls: string; color: string } | { type: 'badge'; text: string; color: string; background?: string }> = {
    'Next.js':      { type: 'badge', text: 'N',  color: 'var(--color-text)' },
    'TypeScript':   { type: 'badge', text: 'TS', color: '#3178c6' },
    'Tailwind CSS': { type: 'badge', text: '~',  color: '#06b6d4' },
    'Vercel':       { type: 'badge', text: '▲',  color: 'var(--color-text)' },
    'Angular':      { type: 'fa', cls: 'fa-brands fa-angular',    color: '#dd0031' },
    'React':        { type: 'fa', cls: 'fa-brands fa-react',      color: '#61dafb' },
    'JavaScript':   { type: 'fa', cls: 'fa-brands fa-js',         color: '#f7df1e' },
    'Python':       { type: 'fa', cls: 'fa-brands fa-python',     color: '#3776ab' },
    'Django':       { type: 'badge', text: 'Dj', color: '#fff', background: '#092e20' },
    'Java':         { type: 'fa', cls: 'fa-brands fa-java',       color: '#f89820' },
    'Node.js':      { type: 'fa', cls: 'fa-brands fa-node-js',    color: '#339933' },
    'Git':          { type: 'fa', cls: 'fa-brands fa-git-alt',    color: '#f05032' },
    'GitHub':       { type: 'fa', cls: 'fa-brands fa-github',     color: 'var(--color-text)' },
    'AWS':          { type: 'fa', cls: 'fa-brands fa-aws',        color: '#ff9900' },
    'Flutter':      { type: 'fa', cls: 'fa-brands fa-flutter',    color: '#02569b' },
    'Docker':       { type: 'fa', cls: 'fa-brands fa-docker',     color: '#2496ed' },
    'HTML':         { type: 'fa', cls: 'fa-brands fa-html5',      color: '#e34f26' },
    'CSS':          { type: 'fa', cls: 'fa-brands fa-css3-alt',   color: '#1572b6' },
    'SQL':          { type: 'fa', cls: 'fa-solid fa-database',    color: '#f59e0b' },
    'REST API':     { type: 'fa', cls: 'fa-solid fa-plug',        color: '#a78bfa' },
    'Agile':        { type: 'fa', cls: 'fa-solid fa-arrows-spin', color: '#60a5fa' },
  };

  getTagIcon(tag: string) {
    return this.TAG_ICONS[tag] ?? null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
