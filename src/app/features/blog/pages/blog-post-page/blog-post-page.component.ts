import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { HOME_CONTENT } from '../../../home/data/home-content';
import { BlogPost } from '../../../../shared/models/portfolio.model';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post-page.component.html',
  styleUrl: './blog-post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostPageComponent implements OnInit, OnDestroy {
  post: BlogPost | undefined;
  nextPost: BlogPost | undefined;
  notFound = false;

  private sub!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  goBack(): void {
    this.router.navigate(['/blog']);
  }

  /** Splits a section body on backtick pairs so `inline code` renders in a monospace chip. */
  parseInline(text: string): Array<{ code: boolean; value: string }> {
    return text.split('`').map((value, i) => ({ code: i % 2 === 1, value }));
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      const posts = HOME_CONTENT.blogPosts;
      const idx = posts.findIndex((p) => p.slug === slug);
      this.notFound = idx === -1;
      this.post = posts[idx];
      this.nextPost = posts.length ? posts[(idx + 1) % posts.length] : undefined;
      window.scrollTo({ top: 0 });
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
