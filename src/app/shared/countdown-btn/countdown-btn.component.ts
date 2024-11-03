import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'countdown-btn',
    standalone: true,
    imports: [CommonModule],
    template: `<button
        class="btn"
        (click)="startCountdown()"
        [disabled]="isCounting">
        <span class="material-symbols-outlined">autorenew</span>
        {{ isCounting ? buttonText : buttonText }}
    </button>`,
    styleUrl: './countdown-btn.component.scss',
})
export class CountdownBtnComponent {
    @Input() buttonText: string = '';
    @Input() countingText: string = '';
    @Input() icon: string = '';

    @Output() onButtonPress = new EventEmitter<boolean>();

    countdown: number = 3;
    isCounting: boolean = false;
    interval: any;

    startCountdown() {
        this.onButtonPress.emit(true);
        this.isCounting = true;
        this.countdown = 3;

        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(this.interval);
                this.isCounting = false;
            }
        }, 1000);
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
