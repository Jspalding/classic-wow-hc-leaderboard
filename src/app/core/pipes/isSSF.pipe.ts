import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'isSSF',
    standalone: true,
})
export class IsSSFPipe implements PipeTransform {
    transform(value: boolean): string {
        let isSSF: string = 'Self Found';
        if (value === false) {
            isSSF = 'Not Self Found';
        }
        return isSSF;
    }
}
