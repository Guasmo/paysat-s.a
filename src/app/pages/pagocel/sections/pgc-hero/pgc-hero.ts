import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-pgc-hero',
  imports: [RouterLink],
  templateUrl: './pgc-hero.html',
  styleUrl: './pgc-hero.css',
})
export class PgcHero implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = gsap.context(() => {
      // Cards flotantes del HERO — entrada elastic desde el centro
      const heroFloats = this.el.nativeElement.querySelectorAll('.pgc-float');
      gsap.fromTo(heroFloats,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.55)', stagger: 0.15, delay: 0.3 }
      );

      // Texto y teléfono del hero
      const heroText = this.el.nativeElement.querySelector('.pgc-hero-text');
      const heroPhone = this.el.nativeElement.querySelector('.pgc-hero-visual');
      const heroBadges = this.el.nativeElement.querySelectorAll('.pgc-phone-badge');

      gsap.fromTo(heroText, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', delay: 0.1 });
      gsap.fromTo(heroPhone, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)', delay: 0.2 });
      if (heroBadges.length) {
        gsap.fromTo(heroBadges, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)', stagger: 0.15, delay: 0.7 });
      }

    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
