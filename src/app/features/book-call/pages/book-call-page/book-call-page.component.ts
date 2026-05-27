import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../../environments/environment';

declare const Cal: any;

type Tab = 'call' | 'message';
type SendState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-book-call-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-call-page.component.html',
  styleUrl: './book-call-page.component.scss',
})
export class BookCallPageComponent implements AfterViewInit {
  tab: Tab = 'call';
  form = { name: '', email: '', message: '' };
  honeypot = '';
  state: SendState = 'idle';
  readonly maxLength = 1000;

  private readonly rateKey = 'sm_attempts';
  private readonly rateWindow = 10 * 60 * 1000;
  private readonly rateLimit = 3;

  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.initCal();
  }

  private initCal(): void {
    const win = window as any;
    const embedUrl = 'https://app.cal.com/embed/embed.js';

    const mount = () => {
      Cal('init', '30min', { origin: 'https://cal.com' });
      Cal.ns['30min']('inline', {
        elementOrSelector: '#cal-booking-placeholder',
        config: { layout: 'month_view', theme: 'light' },
        calLink: 'jatsen-gesta-vpjaoz/30min',
      });
      Cal.ns['30min']('ui', { hideEventTypeDetails: false, layout: 'month_view', theme: 'light' });
    };

    const existingScript = document.querySelector(`script[src="${embedUrl}"]`) as HTMLScriptElement | null;

    if (existingScript?.dataset['ready'] === '1') {
      mount();
      return;
    }

    if (existingScript) {
      // Script tag exists but hasn't finished loading yet
      existingScript.addEventListener('load', () => {
        existingScript.dataset['ready'] = '1';
        mount();
      }, { once: true });
      return;
    }

    // First time: manually create and append the script tag
    const script = document.createElement('script');
    script.src = embedUrl;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset['ready'] = '1';
      mount();
    }, { once: true });
    document.head.appendChild(script);

    // Bootstrap the Cal stub so it doesn't try to append its own script
    win.Cal = win.Cal || function (this: any) {
      const cal = win.Cal; const ar = arguments as any;
      if (!cal.ns) { cal.ns = {}; cal.q = cal.q || []; }
      const p = (a: any, args: any) => a.q.push(args);
      if (ar[0] === 'init') {
        const api: any = function () { p(api, arguments); };
        const ns = ar[1];
        api.q = api.q || [];
        if (typeof ns === 'string') { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, ['initNamespace', ns]); }
        return;
      }
      p(cal, ar);
    };
    win.Cal.loaded = true;
    win.Cal.q = win.Cal.q || [];
    win.Cal.ns = win.Cal.ns || {};
  }

  get charCount(): number { return this.form.message.length; }

  get isRateLimited(): boolean {
    try {
      const raw = sessionStorage.getItem(this.rateKey);
      if (!raw) return false;
      const attempts: number[] = JSON.parse(raw);
      const now = Date.now();
      return attempts.filter(t => now - t < this.rateWindow).length >= this.rateLimit;
    } catch { return false; }
  }

  private recordAttempt(): void {
    try {
      const raw = sessionStorage.getItem(this.rateKey);
      const attempts: number[] = raw ? JSON.parse(raw) : [];
      const now = Date.now();
      const recent = attempts.filter(t => now - t < this.rateWindow);
      recent.push(now);
      sessionStorage.setItem(this.rateKey, JSON.stringify(recent));
    } catch { /* ignore */ }
  }

  private sanitize(v: string): string { return v.trim().replace(/[<>]/g, ''); }

  switchTab(t: Tab): void {
    this.tab = t;
    this.state = 'idle';
  }

  async submit(formRef: NgForm): Promise<void> {
    if (formRef.invalid || this.honeypot || this.isRateLimited) return;
    this.state = 'sending';
    this.recordAttempt();
    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          name: this.sanitize(this.form.name) || 'Anonymous',
          email: this.sanitize(this.form.email),
          message: this.sanitize(this.form.message),
        },
        { publicKey: environment.emailjs.publicKey },
      );
      this.state = 'success';
      formRef.resetForm();
      this.form = { name: '', email: '', message: '' };
    } catch { this.state = 'error'; }
  }

  reset(): void { this.state = 'idle'; }
}
