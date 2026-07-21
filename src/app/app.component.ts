import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorComponent } from './core/layout/cursor/cursor.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { HOME_CONTENT } from './features/home/data/home-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly content = HOME_CONTENT;
}
