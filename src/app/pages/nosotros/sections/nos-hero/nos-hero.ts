import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-nos-hero',
  imports: [],
  templateUrl: './nos-hero.html',
  styleUrl: './nos-hero.css',
})
export class NosHero implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        '.nos-hero-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );

      gsap.fromTo(
        '.nos-hero-visual',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)', delay: 0.2 }
      );

      gsap.fromTo(
        '.nos-float',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.15, delay: 0.4 }
      );

      gsap.to('.nos-float--tl', {
        y: -8, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0
      });

      gsap.to('.nos-float--tr', {
        y: -8, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.7
      });

      gsap.to('.nos-float--br', {
        y: -8, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.4
      });
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
