import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredString: string) {
    if(value.length === 0) {
      return value;
    }

    const users = [];
    for(const user of value) {
      if(user['lastName'].includes(filteredString)) {
        users.push(user);
      }
    }

    return users;
  }
}
