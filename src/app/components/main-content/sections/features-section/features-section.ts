import { isPlatformBrowser, NgOptimizedImage } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from "@angular/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: 'app-features-section',
    imports: [NgOptimizedImage],
    templateUrl: 'features-section.html',
    styleUrls: ['features-section.css']
})
export class FeaturesSection implements AfterViewInit, OnDestroy {
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
        }, this.el.nativeElement)
    }

    ngOnDestroy() {
        this.ctx?.revert();
    }
}