import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../core/services/character.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Character } from '../core/models/character/character.interface';

import { LeaderboardTileComponent } from './leaderboard-tile/leaderboard-tile.component';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [CommonModule, LeaderboardTileComponent],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    characterList: Character[] = [];

    prizePool: string = '£50';

    isLoading = true;
    destroy$: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        const james = this.characterService.getCharacterByName(
            'smootheyes',
            'stitches'
        );

        const tom = this.characterService.getCharacterByName(
            'hoofinboofer',
            'stitches'
        );

        const tom2 = this.characterService.getCharacterByName(
            'teezone',
            'nekrosh'
        );

        const raph = this.characterService.getCharacterByName(
            'smootheyes',
            'stitches'
        );

        const reiss = this.characterService.getCharacterByName(
            'pumpumpalaii',
            'stitches'
        );

        const reiss2 = this.characterService.getCharacterByName(
            'pumpumpala',
            'stitches'
        );

        const reub = this.characterService.getCharacterByName(
            'wnorhuhno',
            'stitches'
        );

        forkJoin([james, tom, tom2, raph, reiss, reiss2, reub])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responses) => {
                    this.characterList = [...responses];
                    this.isLoading = false;

                    console.log(responses, this.characterList);
                },
                (error) => {
                    console.error('Error fetching characters:', error);
                    this.isLoading = false;
                }
            );
    }

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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
