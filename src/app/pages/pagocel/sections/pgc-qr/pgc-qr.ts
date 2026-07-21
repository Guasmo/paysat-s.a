import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-pgc-qr',
  imports: [RouterLink],
  templateUrl: './pgc-qr.html',
  styleUrl: './pgc-qr.css',
})
export class PgcQr implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      const section = this.el.nativeElement.querySelector('.pgc-tl-section');
      if (!section) return;

      const phone = section.querySelector('.pgc-sec-phone-wrap');
      const badges = section.querySelectorAll('.pgc-sec-badge');
      const feats = section.querySelectorAll('.pgc-feat-item');
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
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
