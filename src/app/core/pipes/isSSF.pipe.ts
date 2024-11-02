import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'isSSF',
    standalone: true,
})
export class IsSSFPipe implements PipeTransform {
    transform(value: boolean): string {
        let isSSF: string = 'Solo Self Found';
        if (value === false) {
            isSSF = 'Not Solo Self Found';
        }
        return isSSF;
    }
}
