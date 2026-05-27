import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { BookCallPageComponent } from './features/book-call/pages/book-call-page/book-call-page.component';
import { SendMessagePageComponent } from './features/send-message/pages/send-message-page/send-message-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'book-call', component: BookCallPageComponent },
  { path: 'send-message', component: SendMessagePageComponent },
];
