import {Component, ElementRef, AfterViewInit} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: '[callout-content], callout-content',
  templateUrl: './callout-content.html',
  styles: [`
    :host { display: inline }
  `]
})
export class CalloutContent implements AfterViewInit {
  constructor(public elementRef:ElementRef) {

  }

  ngAfterViewInit() {

  }
}
