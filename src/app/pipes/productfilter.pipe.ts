import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';

@Pipe({
  name: 'productfilter'
})
export class ProductfilterPipe implements PipeTransform {

  transform(value: any, filteredString: string) {
    if(value.length === 0) {
      return value;
    }
    const products = [];
    for(const product of value) {
      if(product['description']
          .toLowerCase()
          .includes(filteredString) || product['description']
          .toUpperCase()
          .includes(filteredString) || product['description']
          .includes(filteredString)) {
        products.push(product);
      }
    }
    return products;
  }
}
