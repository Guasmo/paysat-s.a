import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Contact } from '../../components/contact/contact';
import gsap from 'gsap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proceso-implementacion',
  imports: [Contact, RouterLink],
  templateUrl: './proceso-implementacion.html',
  styleUrl: './proceso-implementacion.css',
})
export class ProcesoImplementacion implements AfterViewInit, OnDestroy {
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        '.pi-hero-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );

      gsap.fromTo(
        '.pi-hero-visual',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)', delay: 0.2 }
      );

      gsap.fromTo(
        '.pi-float',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.15, delay: 0.4 }
      );

      const steps = document.querySelectorAll('.pi-step');
      const markers = document.querySelectorAll('.pi-step-marker');
      const track = document.querySelector('.pi-track-fill') as HTMLElement;
      const totalSteps = steps.length;
      let currentStep = 0;

      const activateStep = (index: number) => {
        steps.forEach((s, i) => {
          if (i <= index) {
            s.classList.add('pi-step--active');
          } else {
            s.classList.remove('pi-step--active');
          }
        });
        const pct = (index / (totalSteps - 1)) * 100;
        if (track) track.style.width = `${pct}%`;
      };

      const runLoop = () => {
        currentStep = 0;
        activateStep(0);

        const advance = () => {
          currentStep++;
          if (currentStep < totalSteps) {
            activateStep(currentStep);
            setTimeout(advance, 1200);
          } else {
            setTimeout(() => {
              steps.forEach(s => s.classList.remove('pi-step--active'));
              if (track) track.style.width = '0%';
              setTimeout(runLoop, 800);
            }, 1500);
          }
        };

        setTimeout(advance, 1200);
      };

      runLoop();
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
