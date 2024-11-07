import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../core/services/character.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Character } from '../core/models/character/character.interface';

import { LeaderboardTileComponent } from './leaderboard-tile/leaderboard-tile.component';
import { CountdownBtnComponent } from '../shared/countdown-btn/countdown-btn.component';
import { PageLoaderComponent } from '../shared/page-loader/page-loader.component';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [
        CommonModule,
        LeaderboardTileComponent,
        CountdownBtnComponent,
        PageLoaderComponent,
    ],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    characterList: Character[] = [];
    graveyard: Character[] = [];

    isLoading = false;
    destroy$: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this.buildCharacterList();
    }

    buildCharacterList() {
        this.isLoading = true;

        const characters = [
            { name: 'smootheyes', server: 'stitches' },
            { name: 'hoofinboofer', server: 'stitches' },
            { name: 'teezone', server: 'nekrosh' },
            // { name: 'tentensandim', server: 'stitches' },
            { name: 'rubyreubs', server: 'stitches' },
            { name: 'pumpumpalaii', server: 'stitches' },
            { name: 'pumpumpala', server: 'stitches' },
            { name: 'wnorhuhno', server: 'stitches' },
        ];

        const characterRequests = characters.map((character) =>
            this.characterService.getCharacterByName(
                character.name,
                character.server
            )
        );

        forkJoin(characterRequests)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responses) => {
                    this.characterList = [...responses];
                    this.characterList = this.sortDescending(
                        this.getAliveCharacters(this.characterList)
                    );

                    this.graveyard = this.getDeadCharacters(
                        this.sortDescending(responses)
                    );

                    this.isLoading = false;
                },
                (error) => {
                    console.error('Error fetching characters:', error);
                    this.isLoading = false;
                }
            );
    }

    getAliveCharacters(characterList: Character[]) {
        return (characterList = characterList.filter((character) => {
            return !character.is_ghost;
        }));
    }

    getDeadCharacters(characterList: Character[]) {
        return (characterList = characterList.filter((character) => {
            return character.is_ghost;
        }));
    }

    sortDescending(characterList: Character[]) {
        return (characterList = characterList.sort(
            (a: Character, b: Character) => {
                if (b.level === a.level) {
                    return b.experience - a.experience;
                }

                return b.level - a.level;
            }
        ));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
