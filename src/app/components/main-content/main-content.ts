import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Contact } from '../contact/contact';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-main-content',
  imports: [Contact, NgOptimizedImage, RouterLink],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      // Text block entrance
      gsap.fromTo(
        '.features-text h2, .features-text p, .features-text div',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'back.out(1.2)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.features-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Visual mockups elastic entrance from center
      gsap.fromTo(
        '.visual',
        { opacity: 0, scale: 0.3, y: 100 },
        {
          opacity: (i, target) => {
            if (target.classList.contains('visual-comp-2')) return 0.7;
            if (target.classList.contains('visual-comp-1')) return 0.85;
            return 1;
          },
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.65)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.features-container',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            const visuals = this.el.nativeElement.querySelectorAll('.visual');
            visuals.forEach((v: HTMLElement) => v.classList.add('pgc-floating'));
          },
        }
      );

      // ¿Por qué PAYSAT? — imagen splash entrance
      gsap.fromTo(
        '.why-img',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.why-section',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ¿Por qué PAYSAT? — items stagger entrance
      gsap.fromTo(
        '.why-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.why-list',
            start: 'top 80%',
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
