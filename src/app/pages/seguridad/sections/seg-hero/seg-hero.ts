import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-seg-hero',
  imports: [],
  templateUrl: './seg-hero.html',
  styleUrl: './seg-hero.css',
})
export class SegHero implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = gsap.context(() => {
      const heroText   = this.el.nativeElement.querySelector('.seg-hero-text');
      const heroVisual = this.el.nativeElement.querySelector('.seg-hero-visual');
      const capBar     = this.el.nativeElement.querySelector('.seg-capabilities-bar');

      gsap.fromTo(heroText,   { opacity: 0, y: 40 },              { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', delay: 0.1 });
      gsap.fromTo(heroVisual, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)', delay: 0.2 });
      if (capBar) {
        gsap.fromTo(capBar, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.3)', delay: 0.4 });
      }
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
