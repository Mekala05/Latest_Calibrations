import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter',
})

export class SearchfilterPipe implements PipeTransform {
  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) return [];
    if (!keyword) return items;
    var itemFound: Boolean;
    console.log("item",items,"keyword",keyword,"properties",properties);
    
    return items.filter((item) => {
      for (let i = 0; i < properties.length; i++) {
        if (
          String(item[properties[i]])
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) !== -1
        ) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }
}
