import {Component, ElementRef, AfterViewInit, ContentChild} from "@angular/core";
import {CalloutContent} from "./callout-content";
declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: '[callout], callout',
  templateUrl: './callout.html',
  styles: [`
    :host { text-decoration: none !important; }
  `]
})
export class Callout implements AfterViewInit {
  @ContentChild(CalloutContent) calloutContent:CalloutContent;

  constructor(public elementRef:ElementRef) {

  }

  ngAfterViewInit() {

    var attrs = {class: ''};

    Array.prototype.slice.call(this.elementRef.nativeElement.attributes)
      .forEach((attr:any) => {
        attrs[attr.name] = attr.value;
      });

    var classes = attrs.class.split(' ');
    var textClasses = classes.filter(function(_class:any) {
      return (_class.match(/text\-/));
    })[0];

    var $element = jQuery(this.elementRef.nativeElement);
    var $content = jQuery(this.calloutContent.elementRef.nativeElement);
    var $copyContent = $content.clone();
    $content.remove();

    var popoverOptions = Object.assign(attrs, {
      html: true,
      content: $copyContent.html(),
      trigger: 'hover',
      delay: {"hide": 20000000},
      container: 'body',
      template: `
        <div class="popover" role="tooltip">
            <div class="popover-close">x</div>
            <div class="arrow"></div>
            <h3 class="popover-title ${textClasses}"></h3>
            <div class="popover-content"></div>
         </div>
      `
    });

    $element.popover(popoverOptions);

    $element.on('shown.bs.popover', function () {
      jQuery('.popover').each(function (index:number) {
        if (index !== jQuery('.popover').length - 1) {
          jQuery(this).popover('hide');
        }
        jQuery(this).on('click', function (event:any) {
          event.stopPropagation();
        })
      });

      jQuery('.popover-close').on('click', function () {
        $element.popover('hide');
      });
    });

    jQuery(document).on('click', function () {
      $element.popover('hide');
    });
  }
}
