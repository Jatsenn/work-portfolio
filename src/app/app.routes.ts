import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { BookCallPageComponent } from './features/book-call/pages/book-call-page/book-call-page.component';
import { SendMessagePageComponent } from './features/send-message/pages/send-message-page/send-message-page.component';
import { ProjectDetailPageComponent } from './features/project-detail/pages/project-detail-page/project-detail-page.component';
import { CertificatesPageComponent } from './features/certificates/pages/certificates-page/certificates-page.component';
import { BlogPageComponent } from './features/blog/pages/blog-page/blog-page.component';
import { BlogPostPageComponent } from './features/blog/pages/blog-post-page/blog-post-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'book-call', component: BookCallPageComponent },
  { path: 'send-message', component: SendMessagePageComponent },
  { path: 'project/:id', component: ProjectDetailPageComponent },
  { path: 'certificates', component: CertificatesPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'blog/:slug', component: BlogPostPageComponent },
];
