import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Generated class for the UrlSeguroPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'urlSeguro',
})
export class UrlSeguroPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    var result: any = {};
    console.log("urlSeguro")
    console.log(JSON.stringify(value) + " ------------- " + type)

    switch (type) {
      case 'html': result = this.sanitizer.bypassSecurityTrustHtml(value); break;
      case 'style': result = this.sanitizer.bypassSecurityTrustStyle(value); break;
      case 'script': result = this.sanitizer.bypassSecurityTrustScript(value); break;
      case 'url': result = this.sanitizer.bypassSecurityTrustUrl(value); break;
      case 'resourceUrl': result = this.sanitizer.bypassSecurityTrustResourceUrl(value); break;
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }

    console.log(JSON.stringify(result));
    return result;
  }

}
