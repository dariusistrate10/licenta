import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-scroll-reveal',
  templateUrl: './scroll-reveal.component.html',
  styleUrls: ['./scroll-reveal.component.css']
})
export class ScrollRevealComponent implements OnInit {

  revealElements: HTMLElement[] = [];


  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.revealElements = Array.from(this.el.nativeElement.querySelectorAll('.reveal'));
    this.checkScroll();
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const windowHeight = window.innerHeight;

    this.revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        this.renderer.addClass(element, 'revealed');
      }
    });
  }

}
