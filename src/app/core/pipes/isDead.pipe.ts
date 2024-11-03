import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'isDead',
    standalone: true,
})
export class IsDeadPipe implements PipeTransform {
    transform(value: boolean): string {
        let isDead: string = 'Dead - R.I.P';

        if (value === false) {
            isDead = 'Alive';
        }

        return isDead;
    }
}
