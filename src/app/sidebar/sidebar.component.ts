import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    prizePool: string = '£50';

    onConvert() {
        let currencies: string[] = [
            '50 massive ones',
            '50 heavy ones',
            '50 minor ones',
            '50 bags',
            'Why you asking?',
            '1.5 JustEat orders',
            '£50',
        ];

        const randomIndex = Math.floor(Math.random() * currencies.length);
        this.prizePool = currencies[randomIndex];
    }
}
