import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../../environments/environment';

type SendState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-send-message-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './send-message-page.component.html',
  styleUrl: './send-message-page.component.scss',
})
export class SendMessagePageComponent {
  form = { name: '', email: '', message: '' };
  honeypot = ''; // bot trap field
  state: SendState = 'idle';
  readonly maxLength = 1000;

  // Rate limiting: max 3 submissions per 10 minutes
  private readonly rateKey = 'sm_attempts';
  private readonly rateWindow = 10 * 60 * 1000;
  private readonly rateLimit = 3;

  get charCount(): number { return this.form.message.length; }

  get isRateLimited(): boolean {
    try {
      const raw = sessionStorage.getItem(this.rateKey);
      if (!raw) return false;
      const attempts: number[] = JSON.parse(raw);
      const now = Date.now();
      const recent = attempts.filter(t => now - t < this.rateWindow);
      return recent.length >= this.rateLimit;
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

  private sanitize(value: string): string {
    return value.trim().replace(/[<>]/g, '');
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
    } catch {
      this.state = 'error';
    }
  }

  reset(): void { this.state = 'idle'; }
}
