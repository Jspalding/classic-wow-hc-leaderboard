import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CharacterService } from '../../core/services/character.service';

@Component({
    selector: 'countdown-timer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './countdown-timer.component.html',
    styleUrl: './countdown-timer.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    @Output() onCompFinish = new EventEmitter<boolean>();

    endDate = new Date('2024-12-25T00:00:00');

    remainingTime: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    private timerSub: Subscription | undefined;

    ngOnInit(): void {
        this.updateCountdown();

        this.timerSub = interval(0).subscribe(() => {
            this.updateCountdown();
        });
    }

    updateCountdown(): void {
        const now = new Date().getTime();
        const end = this.endDate.getTime() - now;

        if (end > 0) {
            this.remainingTime = {
                days: Math.floor(end / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (end % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor((end % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((end % (1000 * 60)) / 1000),
            };
        } else {
            this.remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            this.characterService.compFinished.next(true);
            this.onCompFinish.emit(true);

            if (this.timerSub) {
                this.timerSub.unsubscribe();
            }
        }
    }

    ngOnDestroy(): void {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
    }
}
