import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../home/data/home-content';
import { Certification } from '../../../../shared/models/portfolio.model';

@Component({
  selector: 'app-certificates-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './certificates-page.component.html',
  styleUrl: './certificates-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificatesPageComponent {
  readonly certifications: Certification[] = HOME_CONTENT.certifications;

  constructor(private readonly router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  private readonly ISSUER_ICONS: Record<
    string,
    { type: 'fa'; cls: string; color: string } | { type: 'badge'; text: string; color: string; background: string }
  > = {
    LinkedIn: { type: 'fa', cls: 'fa-brands fa-linkedin', color: '#0a66c2' },
    'LinkedIn Learning Community': { type: 'fa', cls: 'fa-brands fa-linkedin', color: '#0a66c2' },
    IBM: { type: 'badge', text: 'IBM', color: '#ffffff', background: '#054ada' },
    'Cisco Networking Academy': { type: 'badge', text: 'CISCO', color: '#ffffff', background: '#1ba0d7' },
  };

  getIssuerIcon(issuer: string) {
    return this.ISSUER_ICONS[issuer] ?? { type: 'fa' as const, cls: 'fa-solid fa-certificate', color: 'var(--glow-violet)' };
  }
}
