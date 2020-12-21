import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorInversion'
})
export class ColorInversionPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    if (value * 100 < 51){
      return '#fff';
    }
    else{
    return '#000';

    }
  }

}
