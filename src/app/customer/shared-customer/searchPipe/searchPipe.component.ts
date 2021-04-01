import { Pipe, PipeTransform } from '@angular/core';
import { xor } from 'lodash';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class SearchPipeComponent implements PipeTransform {
    transform(items: any[], filter: string): any {
        
        if (!items || !filter) {
            return items;
        }
   
      return items.filter(item =>item.template_title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}