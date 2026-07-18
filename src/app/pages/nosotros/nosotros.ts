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
  private cleanupCarousel: (() => void) | null = null;

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

    this.setupClientsCarousel();
  }

  /**
   * Carrusel infinito de "A quien servimos" — solo activo en mobile (<=900px).
   * Un unico estado (x) maneja tanto el auto-scroll como el drag/touch, para que
   * nunca se peleen entre si. El loop infinito se logra "envolviendo" x cuando
   * pasa el ancho de un set (el track tiene 2 sets identicos de cards).
   */
  private setupClientsCarousel() {
    const carousel = this.el.nativeElement.querySelector('.nos-clients-carousel') as HTMLElement | null;
    const track = this.el.nativeElement.querySelector('.nos-clients-track') as HTMLElement | null;
    if (!carousel || !track) return;

    const MOBILE_QUERY = '(max-width: 900px)';
    const AUTO_SPEED = 0.45; // px por frame (~27px/s a 60fps)

    let isMobile = window.matchMedia(MOBILE_QUERY).matches;
    let setWidth = 0;
    let x = 0;
    let isDragging = false;
    let dragStartClientX = 0;
    let dragStartX = 0;
    let rafId = 0;

    const measure = () => {
      // El track tiene 2 sets identicos (uno real + uno aria-hidden duplicado)
      setWidth = track.scrollWidth / 2;
    };

    const applyTransform = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const wrap = () => {
      if (setWidth <= 0) return;
      while (x <= -setWidth) x += setWidth;
      while (x > 0) x -= setWidth;
    };

    const tick = () => {
      if (!isDragging && isMobile && setWidth > 0) {
        x -= AUTO_SPEED;
        wrap();
        applyTransform();
      }
      rafId = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!isMobile) return;
      isDragging = true;
      dragStartClientX = e.clientX;
      dragStartX = x;
      track.style.transition = 'none';
      carousel.classList.add('is-dragging');
      try { carousel.setPointerCapture(e.pointerId); } catch { }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartClientX;
      x = dragStartX + delta;
      wrap();
      applyTransform();
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      carousel.classList.remove('is-dragging');
    };

    const onResize = () => {
      isMobile = window.matchMedia(MOBILE_QUERY).matches;
      measure();
    };

    carousel.addEventListener('pointerdown', onPointerDown);
    carousel.addEventListener('pointermove', onPointerMove);
    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);
    carousel.addEventListener('pointerleave', endDrag);
    window.addEventListener('resize', onResize);

    // El movimiento lo controla JS; se apaga el @keyframes de CSS para que no compitan
    track.style.animation = 'none';
    track.style.touchAction = 'pan-y';

    measure();
    applyTransform();
    rafId = requestAnimationFrame(tick);

    this.cleanupCarousel = () => {
      cancelAnimationFrame(rafId);
      carousel.removeEventListener('pointerdown', onPointerDown);
      carousel.removeEventListener('pointermove', onPointerMove);
      carousel.removeEventListener('pointerup', endDrag);
      carousel.removeEventListener('pointercancel', endDrag);
      carousel.removeEventListener('pointerleave', endDrag);
      window.removeEventListener('resize', onResize);
    };
  }

  ngOnDestroy() {
    this.ctx?.revert();
    this.cleanupCarousel?.();
  }
}