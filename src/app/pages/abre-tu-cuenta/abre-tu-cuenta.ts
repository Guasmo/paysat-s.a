import { Component, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-abre-tu-cuenta',
  imports: [],
  templateUrl: './abre-tu-cuenta.html',
  styleUrl: './abre-tu-cuenta.css'
})
export class AbreTuCuenta implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        '.mockup',
        { opacity: 0, scale: 0.3, y: 100 },
        {
          opacity: 1,
          scale: (i, target) => {
            if (target.classList.contains('mockup-back')) return 0.9;
            if (target.classList.contains('mockup-front')) return 1.05;
            return 1;
          },
          y: (i, target) => {
            if (target.classList.contains('mockup-back')) return 20;
            return 0;
          },
          duration: 1.2,
          ease: 'elastic.out(1, 0.65)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.open-account__wrap',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            const mockups = this.el.nativeElement.querySelectorAll('.mockup');
            mockups.forEach((m: HTMLElement) => m.classList.add('pgc-floating'));
          },
        }
      );
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
