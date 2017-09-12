import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbol'
})

export class MoneySymbolPipe implements PipeTransform {
  transform(value: any): any {
    if (value === 'usd') return '$'
    else if (value === 'eur') return '€'
  }
}
