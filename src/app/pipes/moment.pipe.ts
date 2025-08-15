import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date | string | number, format: string): string {
    if (!value) return '';
    if(format === 'fromNow') {
      return moment(value).fromNow();
    }
    return moment(value).format("MMMM Do YYYY");
  }

}
