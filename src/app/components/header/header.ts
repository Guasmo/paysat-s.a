import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class Header {
  isScrolled = signal(false);

  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }
}
