import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/fr';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date | string | number, format: string): string {
    moment.locale('fr');

    if (!value) return '';
    if(format === 'fromNow') {
      return moment(value).fromNow();
    }
    if(format === 'dateHour') {
      return moment(value).format("LLLL");
    }
    return moment(value).format("MMMM Do YYYY");
  }

}
