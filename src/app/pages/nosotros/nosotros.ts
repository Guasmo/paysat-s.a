import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Contact } from '../../components/contact/contact';
import gsap from 'gsap';

@Component({
  selector: 'app-nosotros',
  imports: [Contact],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

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
