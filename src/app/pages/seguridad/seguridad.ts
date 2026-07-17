import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Contact } from '../../components/contact/contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-seguridad',
  imports: [Contact],
  templateUrl: './seguridad.html',
  styleUrl: './seguridad.css',
})
export class Seguridad implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {

      // Hero text + visual
      const heroText = this.el.nativeElement.querySelector('.seg-hero-text');
      const heroVisual = this.el.nativeElement.querySelector('.seg-hero-visual');
      const capBar = this.el.nativeElement.querySelector('.seg-capabilities-bar');

      gsap.fromTo(heroText, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', delay: 0.1 });
      gsap.fromTo(heroVisual, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo(capBar, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.3)', delay: 0.4 });

      // Feature cards — scroll-triggered
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
