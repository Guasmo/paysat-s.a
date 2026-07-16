import { Component, signal, ElementRef, inject, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class Header {
  isScrolled = signal(false);
  activeSection = signal<string>('inicio');
  
  private router = inject(Router);
  
  currentUrl = signal<string>('/');
  isHomePage = computed(() => {
    const path = this.currentUrl().split('#')[0].split('?')[0];
    return path === '/';
  });

  constructor() {
    this.currentUrl.set(this.router.url);
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event) => {
      this.currentUrl.set(event.urlAfterRedirects || event.url);
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        setTimeout(() => {
          this.checkActiveSection();
          this.handleFragmentScroll();
        }, 100);
      }
    });
  }

  onWindowScroll() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    this.isScrolled.set(window.scrollY > 10);
    this.checkActiveSection();
  }

  checkActiveSection() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!this.isHomePage()) {
      this.activeSection.set('');
      return;
    }

    const integracionEl = document.getElementById('integracion');
    const beneficiosEl = document.getElementById('beneficios');

    if (!integracionEl || !beneficiosEl) {
      this.activeSection.set('inicio');
      return;
    }

    const integracionRect = integracionEl.getBoundingClientRect();
    const beneficiosRect = beneficiosEl.getBoundingClientRect();

    // Active based on position relative to viewport top (e.g. 30% of window height)
    const threshold = window.innerHeight * 0.3;

    if (beneficiosRect.top <= threshold) {
      this.activeSection.set('beneficios');
    } else if (integracionRect.top <= threshold) {
      this.activeSection.set('integracion');
    } else {
      this.activeSection.set('inicio');
    }
  }

  private handleFragmentScroll() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const urlTree = this.router.parseUrl(this.router.url);
    if (urlTree.fragment) {
      const element = document.getElementById(urlTree.fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToIntegration(event: Event) {
    event.preventDefault();
    if (this.isHomePage()) {
      if (typeof document !== 'undefined') {
        document.getElementById('integracion')?.scrollIntoView({ behavior: 'smooth' });
      }
      this.activeSection.set('integracion');
    } else {
      this.router.navigate(['/'], { fragment: 'integracion' });
    }
  }

  scrollToBenefits(event: Event) {
    event.preventDefault();
    if (this.isHomePage()) {
      if (typeof document !== 'undefined') {
        document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
      }
      this.activeSection.set('beneficios');
    } else {
      this.router.navigate(['/'], { fragment: 'beneficios' });
    }
  }
}
