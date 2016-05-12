"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var callout_content_1 = require("./callout-content");
var Callout = (function () {
    function Callout(elementRef) {
        this.elementRef = elementRef;
    }
    Callout.prototype.ngAfterViewInit = function () {
        var attrs = { class: '' };
        Array.prototype.slice.call(this.elementRef.nativeElement.attributes)
            .forEach(function (attr) {
            attrs[attr.name] = attr.value;
        });
        var classes = attrs.class.split(' ');
        var textClasses = classes.filter(function (_class) {
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
            delay: { "hide": 20000000 },
            container: 'body',
            template: "\n        <div class=\"popover\" role=\"tooltip\">\n            <div class=\"popover-close\">x</div>\n            <div class=\"arrow\"></div>\n            <h3 class=\"popover-title " + textClasses + "\"></h3>\n            <div class=\"popover-content\"></div>\n         </div>\n      "
        });
        $element.popover(popoverOptions);
        $element.on('shown.bs.popover', function () {
            jQuery('.popover').each(function (index) {
                if (index !== jQuery('.popover').length - 1) {
                    jQuery(this).popover('hide');
                }
                jQuery(this).on('click', function (event) {
                    event.stopPropagation();
                });
            });
            jQuery('.popover-close').on('click', function () {
                $element.popover('hide');
            });
        });
        jQuery(document).on('click', function () {
            $element.popover('hide');
        });
    };
    __decorate([
        core_1.ContentChild(callout_content_1.CalloutContent), 
        __metadata('design:type', callout_content_1.CalloutContent)
    ], Callout.prototype, "calloutContent", void 0);
    Callout = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '[callout], callout',
            templateUrl: './callout.html',
            styles: ["\n    :host { text-decoration: none !important; }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Callout);
    return Callout;
}());
exports.Callout = Callout;
//# sourceMappingURL=callout.js.map