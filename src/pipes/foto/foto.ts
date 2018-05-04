import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '@ionic-native/contacts';

/**
 * Generated class for the FotoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'FotoPipe',
})
export class FotoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Contact) {
    
    if (value.photos != null) {
      return value.photos[0].value;
    }
    else {
      return "../assets/imgs/nofoto.png"
    }
  }
}
