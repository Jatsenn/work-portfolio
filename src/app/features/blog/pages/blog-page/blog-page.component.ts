import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../home/data/home-content';
import { BlogPost } from '../../../../shared/models/portfolio.model';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent {
  readonly posts: BlogPost[] = HOME_CONTENT.blogPosts;
}
