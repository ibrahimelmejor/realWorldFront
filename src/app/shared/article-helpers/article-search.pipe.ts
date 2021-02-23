import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleSearch'
})
export class ArticleSearchPipe implements PipeTransform {

  transform(value: any[], property: string, searchString: string): any {
    if (typeof value !== 'undefined') {
      return value.filter((element) => {
        return element[property].toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      });
    } else {
      return [];
    }
  }

}
