import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-seg-features',
  imports: [],
  templateUrl: './seg-features.html',
  styleUrl: './seg-features.css',
})
export class SegFeatures implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        '.seg-feature-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.4)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.seg-features-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
