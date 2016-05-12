import {Component} from '@angular/core';
import {Callout} from "./components/callout/callout";
import {CalloutContent} from "./components/callout/callout-content";

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.html',
  directives: [Callout, CalloutContent]
})
export class AppComponent {
}
