import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-navbar></app-navbar>
  `
})
export class AppComponent {
  previousUrl: string;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.previousUrl) {
            //this.renderer.removeClass(document.body, this.previousUrl);
           this.renderer.setProperty(document.body, 'id', this.previousUrl);
          }
          let currentUrlSlug = event.url.slice(1)
          if (currentUrlSlug) {
            //this.renderer.addClass(document.body, currentUrlSlug);
            this.renderer.setProperty(document.body, 'id', currentUrlSlug);
          }
          this.previousUrl = currentUrlSlug;
        }
      });
  }
}
