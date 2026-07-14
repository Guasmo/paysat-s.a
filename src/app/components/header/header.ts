import { Component, signal, HostListener, ElementRef, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

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
  private elementRef = inject(ElementRef);
  private router = inject(Router);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
    }
  }

  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }

  scrollToIntegration(event: Event) {
    event.preventDefault();
    if (this.router.url === '/') {
      document.getElementById('integracion')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment: 'integracion' });
    }
  }

  scrollToBenefits(event: Event) {
    event.preventDefault();
    if (this.router.url === '/') {
      document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment: 'beneficios' });
    }
  }
}
