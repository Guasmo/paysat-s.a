import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Contact } from '../../components/contact/contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-pagocel',
  imports: [RouterLink, Contact],
  templateUrl: './pagocel.html',
  styleUrl: './pagocel.css',
})
export class Pagocel implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

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
      gsap.fromTo(heroBadges, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)', stagger: 0.15, delay: 0.7 });

      // Cada sección del timeline anima su grupo con scroll trigger
      const sections = this.el.nativeElement.querySelectorAll('.pgc-tl-section');

      sections.forEach((section: Element) => {
        const phone = section.querySelector('.pgc-sec-phone-wrap');
        const badges = section.querySelectorAll('.pgc-sec-badge');
        const feats = section.querySelectorAll('.pgc-feat-item, .pgc-bento-cell, .pgc-core-item');
        const floatCards = section.querySelectorAll('.pgc-sec-float');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        });

        if (phone) {
          tl.fromTo(phone,
            { opacity: 0, scale: 0.85, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.6)' }
          );
        }

        if (feats.length) {
          tl.fromTo(feats,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.12 },
            '-=0.5'
          );
        }

        if (badges.length) {
          tl.fromTo(badges,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)', stagger: 0.15 },
            '-=0.3'
          );
        }

        if (floatCards.length) {
          tl.fromTo(floatCards,
            { opacity: 0, scale: 0.4 },
            { opacity: 1, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.55)', stagger: 0.15 },
            '-=0.2'
          );
        }
      });

    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}