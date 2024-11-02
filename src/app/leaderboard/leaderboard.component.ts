import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { CharacterService } from '../core/services/character.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    destroy$: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this.characterService
            .getCharacterByName('smootheyes', 'stitches')
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
                console.log(response);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
