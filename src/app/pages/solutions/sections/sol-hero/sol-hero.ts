import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-sol-hero',
  imports: [RouterLink],
  templateUrl: './sol-hero.html',
  styleUrl: './sol-hero.css',
})
export class SolHero implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        '.sol-hero-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );

      gsap.fromTo(
        '.sol-hero-visual',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)', delay: 0.2 }
      );

      gsap.fromTo(
        '.sol-float',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1, delay: 0.4 }
      );
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
