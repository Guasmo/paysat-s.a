import { Component, AfterViewInit, OnDestroy, ElementRef, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css'
})
export class PrivacyPolicy implements AfterViewInit, OnDestroy {
  activeSection = signal<string>('privacidad');
  private observer: IntersectionObserver | null = null;
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        root: null,
        rootMargin: '-150px 0px -50% 0px',
        threshold: 0
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      }, options);

      const sections = this.elementRef.nativeElement.querySelectorAll('section[id]');
      sections.forEach((section: Element) => {
        this.observer?.observe(section);
      });
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
