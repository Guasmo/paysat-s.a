import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from "@angular/core";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

@Component({
    selector: 'app-why-paysat-section',
    templateUrl: './why-paysat.html',
    styleUrl: './why-paysat.css'
})
export class WhyPaysatSection implements AfterViewInit, OnDestroy {

    private ctx: gsap.Context | null = null;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngAfterViewInit() {
        if (!isPlatformBrowser(this.platformId)) return;

        gsap.registerPlugin(ScrollTrigger);

        this.ctx = gsap.context(() => {
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