import {Component} from '@angular/core';
import {Callout} from "./callout/callout";
import {CalloutContent} from "./callout/callout-content";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.html',
  directives: [Callout, CalloutContent]
})
export class AppComponent {
}
