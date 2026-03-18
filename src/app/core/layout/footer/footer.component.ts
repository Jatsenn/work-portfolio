import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly socials = [
    { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://linkedin.com/in/jatsengesta' },
    { label: 'Facebook', icon: 'fa-brands fa-facebook-f', href: 'https://facebook.com/' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://instagram.com/' },
  ];
}
